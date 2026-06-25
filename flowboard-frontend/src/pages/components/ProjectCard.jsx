import { MdStar, MdOutlineStarBorder, MdArchive, MdOutlineArchive } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";

function ProjectCard({ id, name, thumbnail, lastEdited, starred, setArchive, handleLoadProject, handleDeleteProject }) {
  const [isStarred, setIsStarred] = useState(starred || false);
  return (
    <div className="p-4 rounded-xl border border-zinc-500 cursor-pointer" onClick={() => handleLoadProject(id)}>
      <img
        src={thumbnail ? thumbnail : "/default.png"}
        alt={name}
        className="rounded-md mb-3 w-full h-40 object-cover"
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-400">
        Last edited: {lastEdited}
      </p>
      <div className="flex mt-2 gap-4">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsStarred(!isStarred);
          }} 
          className="cursor-pointer"
        >
          {isStarred ? <MdStar color="gold" size={24} /> : <MdOutlineStarBorder color="white" size={24} />}
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setArchive();
          }} 
          className="cursor-pointer"
        >
          <MdOutlineArchive color="white" size={24} />
        </button>
        <button 
            onClick={(e) => handleDeleteProject(e, id)}
            className="p-1 text-gray-400 hover:text-red-400 transition-colors ml-auto"
            title="Delete Project"
        >
            <FiTrash2 size={24} />
        </button>
      </div>
    </div>
  )
}
export default ProjectCard;