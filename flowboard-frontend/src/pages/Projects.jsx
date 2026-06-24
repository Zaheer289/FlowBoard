import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios.js";
import ShapeSidebar from "./components/ShapeSidebar";
import CanvasBoard from "./components/CanvasBoard";
import PropertySidebar from "./components/PropertySidebar";
import { FiChevronLeft, FiChevronRight, FiShare2, FiSave } from "react-icons/fi";
import homeIcon from '../assets/images/flowboard-logo.png';

function Projects(){
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [showLeft, setShowLeft] = useState(true);
    const [showRight, setShowRight] = useState(true);
    
    // Whiteboard Global State
    const [elements, setElements] = useState([]);
    const [selectedElementIds, setSelectedElementIds] = useState([]);
    const [selectionRect, setSelectionRect] = useState(null);
    const [activeTool, setActiveTool] = useState('select');

    useEffect(() => {
        if (!id) return;
        const fetchProject = async () => {
            try {
                const response = await api.get(`/projects/${id}`);
                setProject(response.data.data);
            } catch(err) {
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
                setElements(prevElements => prevElements.map(el => {
                    if (!selectedElementIds.includes(el.id)) return el;
                    let newX = el.x;
                    let newY = el.y;
                    if (e.key === 'ArrowUp') newY -= 1;
                    if (e.key === 'ArrowDown') newY += 1;
                    if (e.key === 'ArrowLeft') newX -= 1;
                    if (e.key === 'ArrowRight') newX += 1;
                    return { ...el, x: newX, y: newY };
                }));
            } else if (e.key === 'Delete' || e.key === 'Backspace') {
                setElements(prev => prev.filter(el => !selectedElementIds.includes(el.id)));
                setSelectedElementIds([]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedElementIds]);
    return (
        <div className="h-screen flex flex-col">
            <div className="flex justify-between items-center py-3 px-6 bg-[#222] border-b border-cyan-700">
                <div className="flex justify-start gap-6 items-center">
                    <img src={homeIcon} alt="flowboard home icon" className="w-12 h-12 p-2 bg-sky-950 rounded-md"/>
                    <h2 className="text-xl text-white">{project?.name || 'Loading...'}</h2>
                    
                </div>
                
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-3 py-1 bg-cyan-600 rounded-full hover:bg-cyan-700 text-white">
                        <FiSave /> Save
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1 bg-green-500 rounded-full hover:bg-green-600 text-white">
                        <FiShare2 /> Share
                    </button>
                </div>
            </div>
        <div className="flex flex-1 w-full bg-[#1a1a1a] text-white relative">
        <div
            className={`transition-all duration-300 bg-[#222] border-r border-cyan-700 ${
            showLeft ? "w-1/6" : "w-10"
            } relative`}
        >
            {showLeft && (
            <div className="h-full overflow-y-auto">
                <ShapeSidebar activeTool={activeTool} setActiveTool={setActiveTool} />
            </div>
            )}
            <button
            onClick={() => setShowLeft(!showLeft)}
            className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-[#333] hover:bg-[#444] p-1 rounded-full text-3xl text-cyan-400"
            >
            {showLeft ? <FiChevronLeft /> : <FiChevronRight />}
            </button>
        </div>

        <div className="flex-1 flex justify-center items-center bg-[#111]">
            <CanvasBoard 
                elements={elements} 
                setElements={setElements} 
                activeTool={activeTool} 
                setActiveTool={setActiveTool} 
                selectedElementIds={selectedElementIds} 
                setSelectedElementIds={setSelectedElementIds} 
                selectionRect={selectionRect}
                setSelectionRect={setSelectionRect}
            />
        </div>

        <div
            className={`transition-all duration-300 bg-[#222] border-l border-cyan-700 ${
            showRight ? "w-1/5" : "w-10"
            } relative`}
        >
            {showRight && (
            <div className="h-full overflow-y-auto">
                <PropertySidebar elements={elements} selectedElementIds={selectedElementIds} setElements={setElements} setSelectedElementIds={setSelectedElementIds} />
            </div>
            )}
            <button
            onClick={() => setShowRight(!showRight)}
            className="absolute top-1/2 -left-3 transform -translate-y-1/2 bg-[#333] hover:bg-[#444] p-1 rounded-full text-3xl text-cyan-400"
            >
            {showRight ? <FiChevronRight /> : <FiChevronLeft />}
            </button>
        </div>
        </div>
        </div>
  );
}
export default Projects;