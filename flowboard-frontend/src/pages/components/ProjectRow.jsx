import { useState } from "react";
import ProjectList from "./ProjectList";

function ProjectRow({ title, projects, handleLoadProject, handleDeleteProject, handleOpenSettings }) {
    const [selectedCardId, setSelectedCardId] = useState(null);

    const handleCardClick = (projectId) => {
        setSelectedCardId(prev => prev === projectId ? null : projectId);
    };

    return (
        <div className="bg-zinc-700 mt-8 mb-16 rounded-3xl">
            <div className="p-6">
                <h1 className="text-2xl text-white mb-3">{title}</h1>
                <hr className="mx-auto h-[3px] border-0 bg-zinc-500 mb-3" />
                <div className="">
                    <ProjectList 
                        projectList={projects} 
                        handleLoadProject={handleLoadProject} 
                        handleDeleteProject={handleDeleteProject} 
                        selectedCardId={selectedCardId} 
                        handleCardClick={handleCardClick} 
                        setSelectedCardId={setSelectedCardId} 
                        handleOpenSettings={handleOpenSettings}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProjectRow;
