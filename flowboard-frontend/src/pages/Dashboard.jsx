import NewProjectModal from "./components/NewProjectModal";
import ProjectList from "./components/ProjectList";
import Sidebar from "./components/Sidebar";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { deleteProject } from "../api/projects.js";

function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLoadProject = (projectId) => {
        navigate(`/projects/${projectId}`);
    };

    const handleDeleteProject = async (e, projectId) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            await deleteProject(projectId);
            setProjects(prev => prev.filter(p => p._id !== projectId));
        } catch (error) {
            console.error("Failed to delete project", error);
        }
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects');
                setProjects(response.data.data);
            } catch (err) {
                console.error("Error fetching projects:", err);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log(filteredProjects);

    return (

        <div className="flex min-h-screen">
            <Sidebar className="w-1/4 xl:w-1/5 hidden md:block" />
            <main className="ml-[0%] md:ml-[25%] xl:ml-[20%] flex-1 bg-zinc-900 text-white w-full md:w-3/4 xl:w-4/5">
                <div className="flex items-center justify-between mb-6 px-8 border border-0 border-b-3 border-b-cyan-500 py-4">
                    <div className="w-2/3 text-md flex items-center border border-cyan-600 focus-within:border-cyan-500 rounded-xl">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="p-3 border rounded-l-xl text-white flex-1 border-none outline-none"
                            placeholder="Type here to search..."
                        />
                        <button className="bg-cyan-600 hover:bg-cyan-700 rounded-r-xl p-4 border-none cursor-pointer"><FiSearch /></button>
                    </div>
                    <button className="px-4 py-2 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 cursor-pointer" onClick={() => setModalOpen(true)}>
                        + New Project
                    </button>
                </div>
                <div className="px-8">
                    <div className="bg-zinc-700 mt-8 mb-16 rounded-3xl">
                        <div className="p-6">

                            <h1 className="text-2xl text-white mb-3">Recent Projects</h1>
                            <hr className="mx-auto w- h-[3px] border-0 bg-zinc-500 mb-3" />
                            <div className="">
                                <ProjectList projectList={filteredProjects} handleLoadProject={handleLoadProject} handleDeleteProject={handleDeleteProject} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-zinc-700 mt-8 mb-16 rounded-3xl">
                        <div className="p-6">
                            <h1 className="text-2xl text-white mb-3">Starred Projects</h1>
                            <hr className="mx-auto w- h-[3px] border-0 bg-zinc-500 mb-3" />
                            <div className="">
                                <ProjectList projectList={filteredProjects} handleLoadProject={handleLoadProject} handleDeleteProject={handleDeleteProject} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-zinc-700 mt-8 mb-16 rounded-3xl">
                        <div className="p-6">
                            <h1 className="text-2xl text-white mb-3">Shared Projects</h1>
                            <hr className="mx-auto w- h-[3px] border-0 bg-zinc-500 mb-3" />
                            <div className="">
                                <ProjectList projectList={filteredProjects} handleLoadProject={handleLoadProject} handleDeleteProject={handleDeleteProject} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-zinc-700 mt-8 mb-16 rounded-3xl">
                        <div className="p-6">
                            <h1 className="text-2xl text-white mb-3">Community</h1>
                            <hr className="mx-auto w- h-[3px] border-0 bg-zinc-500 mb-3" />
                            {/*Insert recent projects container here.... */}
                        </div>
                    </div>
                </div>
            </main>
            <NewProjectModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
    )
}
export default Dashboard;