import Sidebar from "./components/Sidebar";
import { FiSearch } from "react-icons/fi";

function Dashboard(){
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
            <div className="mt-8 mb-16">
                <h1 className="text-2xl text-white">Recent Projects</h1>
                {/*Insert recent projects container here.... */}
            </div>
            <hr className=' border-0 bg-cyan-500 h-[3px] text-center mt-3 mx-auto' />
            <div className="my-16">
                <h1 className="text-2xl text-white">Shared Projects</h1>
                {/*Insert recent projects container here.... */}
            </div>
            <hr className=' border-0 bg-cyan-500 h-[3px] text-center mt-3 mx-auto' />
            <div className="my-16">
                <h1 className="text-2xl text-white">Community Projects</h1>
                {/*Insert recent projects container here.... */}
            </div>
            <hr className=' border-0 bg-cyan-500 h-[3px] text-center mt-3 mx-auto' />
            <div className="my-16">
                <h1 className="text-2xl text-white">Starred Projects</h1>
                {/*Insert recent projects container here.... */}
            </div>
        </div>
      </main>
    </div>
    )
}
export default Dashboard;