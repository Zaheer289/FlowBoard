import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { setElements } from '../features/board/boardSlice';
import api from "../api/axios.js";
import { saveProjectElements, deleteProject } from "../api/projects.js";
import ShapeSidebar from "./components/ShapeSidebar";
import CanvasBoard from "./components/CanvasBoard";
import PropertySidebar from "./components/PropertySidebar";
import { FiChevronLeft, FiChevronRight, FiShare2, FiSave } from "react-icons/fi";
import homeIcon from '../assets/images/flowboard-logo.png';

function Projects() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [showLeft, setShowLeft] = useState(true);
    const [showRight, setShowRight] = useState(true);

    // Whiteboard Global State
    const dispatch = useDispatch();
    const elements = useSelector(state => state.board.present.elements);
    const past = useSelector(state => state.board.past);
    const future = useSelector(state => state.board.future);
    const [selectedElementIds, setSelectedElementIds] = useState([]);
    const [selectionRect, setSelectionRect] = useState(null);
    const [activeTool, setActiveTool] = useState('select');
    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        if (!id) return;
        const fetchProject = async () => {
            try {
                const response = await api.get(`/projects/${id}`);
                setProject(response.data.data);
                if (response.data.data.content && Array.isArray(response.data.data.content)) {
                    const flatElements = response.data.data.content.map(dbEl => ({ ...dbEl.data, _dbId: dbEl._id }));
                    dispatch(setElements(flatElements));
                }
            } catch (err) {
                console.error("Failed to fetch project details", err);
            }
        };
        fetchProject();
    }, [id]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const activeTag = document.activeElement?.tagName.toLowerCase();
            if (activeTag === 'input' || activeTag === 'textarea') return;
            if (selectedElementIds.length === 0) return;

            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                dispatch(setElements(elements.map(el => {
                    if (!selectedElementIds.includes(el.id)) return el;
                    let newX = el.x;
                    let newY = el.y;
                    if (e.key === 'ArrowUp') newY -= 1;
                    if (e.key === 'ArrowDown') newY += 1;
                    if (e.key === 'ArrowLeft') newX -= 1;
                    if (e.key === 'ArrowRight') newX += 1;
                    return { ...el, x: newX, y: newY };
                })));
            } else if (e.key === 'Delete' || e.key === 'Backspace') {
                dispatch(setElements(elements.filter(el => !selectedElementIds.includes(el.id))));
                setSelectedElementIds([]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedElementIds, elements, dispatch]);

    const handleSave = async () => {
        try {
            const payload = elements.map(el => ({
                type: el.type,
                data: el
            }));
            await saveProjectElements(id, payload);
            alert("Project saved successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to save project.");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            await deleteProject(id);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert("Failed to delete project.");
        }
    };
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <div className="flex justify-between items-center py-3 px-6 bg-[#222] border-b border-cyan-700">
                <div className="flex justify-start gap-6 items-center">
                    <img src={homeIcon} alt="flowboard home icon" className="w-12 h-12 p-2 bg-sky-950 rounded-md" />
                    <h2 className="text-xl text-white">{project?.name || 'Loading...'}</h2>

                    {/* Avatar Stack relocated here */}
                    <div className="flex items-center -space-x-2 ml-4">
                        {activeUsers.map((user) => (
                            <div
                                key={user.userId}
                                title={user.name}
                                className="w-8 h-8 rounded-full bg-cyan-700 border-2 border-[#111] flex items-center justify-center text-white text-xs font-bold shadow-md cursor-pointer transition-transform hover:-translate-y-1 hover:z-10"
                            >
                                {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => dispatch(ActionCreators.undo())}
                        disabled={past.length === 0}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-white ${past.length === 0 ? 'bg-zinc-700 opacity-50 cursor-not-allowed' : 'bg-zinc-600 hover:bg-zinc-500'}`}
                    >
                        Undo
                    </button>
                    <button
                        onClick={() => dispatch(ActionCreators.redo())}
                        disabled={future.length === 0}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-white ${future.length === 0 ? 'bg-zinc-700 opacity-50 cursor-not-allowed' : 'bg-zinc-600 hover:bg-zinc-500'}`}
                    >
                        Redo
                    </button>
                    <button onClick={handleSave} className="flex items-center gap-2 px-3 py-1 bg-cyan-600 rounded-full hover:bg-cyan-700 text-white">
                        <FiSave /> Save
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1 bg-green-500 rounded-full hover:bg-green-600 text-white">
                        <FiShare2 /> Share
                    </button>
                    <button onClick={handleDelete} className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded-full hover:bg-red-700 text-white">
                        Delete
                    </button>
                </div>
            </div>
            <div className="flex flex-1 w-full bg-[#1a1a1a] text-white relative items-stretch overflow-hidden">
                <div
                    className={`transition-all duration-300 bg-[#222] border-r border-cyan-700 ${showLeft ? "w-1/6" : "w-10"
                        } relative h-full`}
                >
                    {showLeft && (
                        <div className="h-full overflow-y-auto">
                            <ShapeSidebar activeTool={activeTool} setActiveTool={setActiveTool} />
                        </div>
                    )}
                    <button
                        onClick={() => setShowLeft(!showLeft)}
                        className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-[#333] hover:bg-[#444] p-1 rounded-full text-3xl text-cyan-400 z-20"
                    >
                        {showLeft ? <FiChevronLeft /> : <FiChevronRight />}
                    </button>
                </div>

                <div className="flex-1 relative h-full w-full flex justify-center items-center bg-[#111]">
                    <CanvasBoard
                        activeTool={activeTool}
                        setActiveTool={setActiveTool}
                        selectedElementIds={selectedElementIds}
                        setSelectedElementIds={setSelectedElementIds}
                        selectionRect={selectionRect}
                        setSelectionRect={setSelectionRect}
                        activeUsers={activeUsers}
                        setActiveUsers={setActiveUsers}
                    />
                </div>

                <div
                    className={`transition-all duration-300 bg-[#222] border-l border-cyan-700 ${showRight ? "w-1/5" : "w-10"
                        } relative h-full`}
                >
                    {showRight && (
                        <div className="h-full overflow-y-auto">
                            <PropertySidebar selectedElementIds={selectedElementIds} setSelectedElementIds={setSelectedElementIds} />
                        </div>
                    )}
                    <button
                        onClick={() => setShowRight(!showRight)}
                        className="absolute top-1/2 -left-3 transform -translate-y-1/2 bg-[#333] hover:bg-[#444] p-1 rounded-full text-3xl text-cyan-400 z-20"
                    >
                        {showRight ? <FiChevronRight /> : <FiChevronLeft />}
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Projects;