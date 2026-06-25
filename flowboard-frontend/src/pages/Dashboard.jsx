import NewProjectModal from "./components/NewProjectModal";
import ProjectRow from "./components/ProjectRow";
import Sidebar from "./components/Sidebar";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { deleteProject } from "../api/projects.js";
import Modal from "../components/Modal";

function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [tagInput, setTagInput] = useState("");
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

    const handleOpenSettings = (projectId) => {
        const project = projects.find(p => p._id === projectId);
        if (project) {
            setEditingProject(project);
            setIsSettingsOpen(true);
        }
    };

    const handleUpdateProject = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: editingProject.name,
                visibility: editingProject.visibility,
                description: editingProject.description,
                tags: editingProject.tags,
            };
            const response = await api.put(`/projects/${editingProject._id}`, payload);
            if (response.status === 200) {
                setProjects(projects.map(p => p._id === editingProject._id ? { ...p, ...payload } : p));
                setIsSettingsOpen(false);
            }
        } catch (error) {
            console.error("Failed to update project", error);
        }
    };

    const handleTagAdd = (e) => {
        if (e.key === "Enter" && tagInput.trim() !== "") {
            e.preventDefault();
            const currentTags = editingProject.tags || [];
            setEditingProject({ ...editingProject, tags: [...currentTags, tagInput.trim()] });
            setTagInput("");
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
                    <ProjectRow 
                        title="Recent Projects" 
                        projects={filteredProjects} 
                        handleLoadProject={handleLoadProject} 
                        handleDeleteProject={handleDeleteProject} 
                        handleOpenSettings={handleOpenSettings}
                    />
                    <ProjectRow 
                        title="Starred Projects" 
                        projects={filteredProjects} 
                        handleLoadProject={handleLoadProject} 
                        handleDeleteProject={handleDeleteProject} 
                        handleOpenSettings={handleOpenSettings}
                    />
                    <ProjectRow 
                        title="Shared Projects" 
                        projects={filteredProjects} 
                        handleLoadProject={handleLoadProject} 
                        handleDeleteProject={handleDeleteProject} 
                        handleOpenSettings={handleOpenSettings}
                    />
                    <ProjectRow 
                        title="Community" 
                        projects={[]} 
                        handleLoadProject={handleLoadProject} 
                        handleDeleteProject={handleDeleteProject} 
                        handleOpenSettings={handleOpenSettings}
                    />
                </div>
            </main>
            <NewProjectModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
            
            <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title="Project Settings">
                {editingProject && (
                    <form onSubmit={handleUpdateProject} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-white">Project Name</label>
                            <input
                                type="text"
                                value={editingProject.name || ''}
                                onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                                required
                                className="w-full p-2 border border-cyan-800 rounded-md bg-transparent text-white focus:border-cyan-400 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-white">Visibility</label>
                            <select
                                value={editingProject.visibility || 'Private'}
                                onChange={(e) => setEditingProject({ ...editingProject, visibility: e.target.value })}
                                className="w-full p-2 border border-cyan-800 rounded-md bg-zinc-800 text-white focus:border-cyan-400 outline-none"
                            >
                                <option value="Private">Private</option>
                                <option value="Public">Public</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-white">Tags</label>
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagAdd}
                                placeholder="Press Enter to add tag"
                                className="w-full p-2 border border-cyan-800 rounded-md bg-transparent text-white focus:border-cyan-400 outline-none"
                            />
                            <div className="flex flex-wrap mt-2 gap-2">
                                {(editingProject.tags || []).map((tag, i) => (
                                    <span
                                        key={i}
                                        className="bg-cyan-600 hover:bg-cyan-700 px-2 py-1 rounded-md text-sm text-white cursor-pointer"
                                        onClick={() => setEditingProject({ 
                                            ...editingProject, 
                                            tags: editingProject.tags.filter((_, idx) => idx !== i) 
                                        })}
                                    >
                                        {tag} &times;
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-white">Description</label>
                            <textarea
                                value={editingProject.description || ''}
                                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                                rows="3"
                                className="w-full p-2 border border-cyan-800 rounded-md bg-transparent text-white resize-none focus:border-cyan-400 outline-none"
                            />
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                type="button"
                                onClick={() => setIsSettingsOpen(false)}
                                className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-700 text-white"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    )
}
export default Dashboard;