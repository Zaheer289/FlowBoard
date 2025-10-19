import { MdStar, MdOutlineStarBorder, MdArchive, MdOutlineArchive } from "react-icons/md";
import { useState } from "react";
function ProjectCard({item, setArchive}){
    
    const [isStarred, setIsStarred] = useState(item.starred || false);
    return(

        <div className="p-4 rounded-xl border border-zinc-500">
          <img
            src={item.image}
            alt={item.name}
            className="rounded-md mb-3 w-full h-40 object-cover"
          />
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-400">
            Last edited: {new Date(item.lastEdited).toLocaleDateString()}
          </p>
            <div className="flex mt-2 gap-4">
                <button onClick={() => setIsStarred(!isStarred)} className="cursor-pointer">
                {isStarred ? <MdStar color="gold" size={24} /> : <MdOutlineStarBorder color="white" size={24} />}
                </button>
                <button onClick={setArchive} className="cursor-pointer">
                <MdOutlineArchive color="white" size={24} />
                </button>
            </div>
        </div>
    )
}
export default ProjectCard;