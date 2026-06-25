import { MdStar, MdOutlineStarBorder, MdArchive, MdOutlineArchive } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";

function ProjectCard({ id, name, thumbnail, lastEdited, starred, setArchive, handleLoadProject, handleDeleteProject, isSelected, handleCardClick, handleOpenSettings }) {
  const [isStarred, setIsStarred] = useState(starred || false);
  return (
    <div
      className={`relative transition-all duration-300 ease-out cursor-pointer p-4 rounded-xl border ${isSelected
        ? 'scale-100 shadow-2xl shadow-cyan-900/50 border-cyan-400 z-10 bg-zinc-800'
        : 'scale-100 hover:scale-[1.02] border-zinc-500 bg-transparent'
        }`}
      onClick={(e) => handleCardClick(e, id)}
    >
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
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteProject(e, id);
          }}
          className="p-1 text-gray-400 hover:text-red-400 transition-colors ml-auto"
          title="Delete Project"
        >
          <FiTrash2 size={24} />
        </button>
      </div>
      {isSelected && (
        <div
          className="mt-2 w-full flex justify-between gap-3 animate-in fade-in slide-in-from-top-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => handleLoadProject(id)}
            className="grow p-2 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded shadow-lg transition-colors cursor-pointer"
          >
            Load Project
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenSettings(id);
            }}
            className="p-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-bold rounded shadow-lg transition-colors cursor-pointer"
          >
            <IoSettingsOutline size={20} />
          </button>
        </div>
      )}
    </div>
  )
}
export default ProjectCard;