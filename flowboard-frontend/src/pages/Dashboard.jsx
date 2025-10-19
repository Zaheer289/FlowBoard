import NewProjectModal from "./components/NewProjectModal";
import ProjectList from "./components/ProjectList";
import Sidebar from "./components/Sidebar";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

function Dashboard(){
    const projectList = [
    { name: "Project Mu", lastEdited: "2025-10-21", image: "public/dashboard-card-img.png", starred: false, archived: false, id: 1 },
    { name: "Project Alpha", lastEdited: "2025-10-10", image: "public/dashboard-card-img.png", starred: false, archived: false, id:2 },
    { name: "Project Pi", lastEdited: "2025-10-25", image: "public/dashboard-card-img.png", starred: false, archived: false, id: 3 },
    { name: "Project Iota", lastEdited: "2025-10-18", image: "public/dashboard-card-img.png", starred: false, archived: false, id: 4 },
    { name: "Project Nu", lastEdited: "2025-10-22", image: "public/dashboard-card-img.png", starred: false, archived: false, id: 5 },
    { name: "Project Theta", lastEdited: "2025-10-17", image: "public/dashboard-card-img.png", starred: false, archived: false, id: 6 },
    { name: "Project Tau", lastEdited: "2025-10-28", image: "public/dashboard-card-img.png", starred: false, archived: false, id: 7 },
    { name: "Project Kappa", lastEdited: "2025-10-19", image: "public/dashboard-card-img.png", starred: false, archived: false, id: 8 },
    { name: "Project Omicron", lastEdited: "2025-10-24", image: "public/dashboard-card-img.png", starred: false, archived: false, id: 9 },
    { name: "Project Zeta", lastEdited: "2025-10-15", image: "public/dashboard-card-img.png", starred: false, archived: false, id: 10 },
    { name: "Project Sigma", lastEdited: "2025-10-27", image: "public/dashboard-card-img.png", starred: false, archived: false, id: 11 },
    { name: "Project Delta", lastEdited: "2025-10-13", image: "public/dashboard-card-img.png", starred: false, archived: false, id: 12 },
    { name: "Project Rho", lastEdited: "2025-10-26", image: "public/dashboard-card-img.png", starred: false, archived: false, id: 13 },
    { name: "Project Eta", lastEdited: "2025-10-16", image: "public/dashboard-card-img.png", starred: false, archived: false, id: 14 },
    { name: "Project Nu", lastEdited: "2025-10-22", image: "public/dashboard-card-img.png", starred: false, archived: false, id: 15 },
    { name: "Project Beta", lastEdited: "2025-10-11", image: "public/dashboard-card-img.png", starred: false, archived: false, id: 16 },
    { name: "Project Xi", lastEdited: "2025-10-23", image: "public/dashboard-card-img.png", starred: false, archived: false, id: 17 },
    { name: "Project Lambda", lastEdited: "2025-10-20", image: "public/dashboard-card-img.png", starred: false, archived: false, id: 18 },
    { name: "Project Gamma", lastEdited: "2025-10-12", image: "public/dashboard-card-img.png", starred: false, archived: false, id: 19 },
    { name: "Project Upsilon", lastEdited: "2025-10-29", image: "public/dashboard-card-img.png", starred: false, archived: false, id: 20 }
    ];
    const [isModalOpen, setModalOpen] = useState(false);

    return (

    <div className="flex min-h-screen">
      <Sidebar className="w-1/4 xl:w-1/5 hidden md:block" />    
      <main className="ml-[0%] md:ml-[25%] xl:ml-[20%] flex-1 bg-zinc-900 text-white w-full md:w-3/4 xl:w-4/5">
        <div className="flex items-center justify-between mb-6 px-8 border border-0 border-b-3 border-b-cyan-500 py-4">
            <div className="w-2/3 text-md flex items-center border border-cyan-600 focus-within:border-cyan-500 rounded-xl">
                <input type="text" className="p-3 border rounded-l-xl text-white flex-1 border-none outline-none" placeholder="Type here to search..."/>
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
                        <ProjectList projectList={projectList} />
                    </div>
                </div>
            </div>
            <div className="bg-zinc-700 mt-8 mb-16 rounded-3xl">
                <div className="p-6">
                    <h1 className="text-2xl text-white mb-3">Starred Projects</h1>
                    <hr className="mx-auto w- h-[3px] border-0 bg-zinc-500 mb-3" />
                    {/*Insert recent projects container here.... */}
                </div>
            </div>
            <div className="bg-zinc-700 mt-8 mb-16 rounded-3xl">
                <div className="p-6">
                    <h1 className="text-2xl text-white mb-3">Shared Projects</h1>
                    <hr className="mx-auto w- h-[3px] border-0 bg-zinc-500 mb-3" />
                    {/*Insert recent projects container here.... */}
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
        <NewProjectModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onCreate={() =>{}}/>
    </div>
    )
}
export default Dashboard;