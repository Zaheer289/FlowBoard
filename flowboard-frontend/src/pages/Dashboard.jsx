import ProjectList from "./components/ProjectList";
import Sidebar from "./components/Sidebar";
import { FiSearch } from "react-icons/fi";

function Dashboard(){
    const projectList = [
  { name: "Project Mu", lastEdited: "2025-10-21", image: "public/signup.jpg", starred: false, archived: false },
  { name: "Project Alpha", lastEdited: "2025-10-10", image: "public/login.jpg", starred: false, archived: false },
  { name: "Project Pi", lastEdited: "2025-10-25", image: "public/signup.jpg", starred: false, archived: false },
  { name: "Project Iota", lastEdited: "2025-10-18", image: "public/login.jpg", starred: false, archived: false },
  { name: "Project Nu", lastEdited: "2025-10-22", image: "public/signup.jpg", starred: false, archived: false },
  { name: "Project Theta", lastEdited: "2025-10-17", image: "public/login.jpg", starred: false, archived: false },
  { name: "Project Tau", lastEdited: "2025-10-28", image: "public/signup.jpg", starred: false, archived: false },
  { name: "Project Kappa", lastEdited: "2025-10-19", image: "public/login.jpg", starred: false, archived: false },
  { name: "Project Omicron", lastEdited: "2025-10-24", image: "public/signup.jpg", starred: false, archived: false },
  { name: "Project Zeta", lastEdited: "2025-10-15", image: "public/login.jpg", starred: false, archived: false },
  { name: "Project Sigma", lastEdited: "2025-10-27", image: "public/signup.jpg", starred: false, archived: false },
  { name: "Project Delta", lastEdited: "2025-10-13", image: "public/login.jpg", starred: false, archived: false },
  { name: "Project Rho", lastEdited: "2025-10-26", image: "public/signup.jpg", starred: false, archived: false },
  { name: "Project Eta", lastEdited: "2025-10-16", image: "public/login.jpg", starred: false, archived: false },
  { name: "Project Nu", lastEdited: "2025-10-22", image: "public/signup.jpg", starred: false, archived: false },
  { name: "Project Beta", lastEdited: "2025-10-11", image: "public/login.jpg", starred: false, archived: false },
  { name: "Project Xi", lastEdited: "2025-10-23", image: "public/signup.jpg", starred: false, archived: false },
  { name: "Project Lambda", lastEdited: "2025-10-20", image: "public/signup.jpg", starred: false, archived: false },
  { name: "Project Gamma", lastEdited: "2025-10-12", image: "public/login.jpg", starred: false, archived: false },
  { name: "Project Upsilon", lastEdited: "2025-10-29", image: "public/signup.jpg", starred: false, archived: false }
];


    return (

    <div className="flex min-h-screen">
      <Sidebar />    
      <main className="ml-[0%] md:ml-[25%] xl:ml-[20%] flex-1 bg-zinc-900 text-white">
        <div className="flex items-center justify-between mb-6 px-8 border border-0 border-b-3 border-b-cyan-500 py-4">
            <div className="w-2/3 text-md flex items-center border border-cyan-600 focus-within:border-cyan-500 rounded-xl">
                <input type="text" className="p-3 border rounded-l-xl text-white flex-1 border-none outline-none" placeholder="Type here to search..."/>
                <button className="bg-cyan-600 hover:bg-cyan-700 rounded-r-xl p-4 border-none"><FiSearch /></button>
            </div>
            <button className="px-4 py-2 bg-cyan-600 text-white rounded-full hover:bg-cyan-700">
                + New Project
            </button>
        </div>
        <div className="px-8">
            <div className="bg-zinc-700 mt-8 mb-16 rounded-3xl">
                <div className="p-6">
                    
                    <h1 className="text-2xl text-white mb-3">Recent Projects</h1>
                    <hr className="mx-auto w- h-[3px] border-0 bg-zinc-500 mb-3" />
                    <ProjectList projectList={projectList} />
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
    </div>
    )
}
export default Dashboard;