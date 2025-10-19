import { FiClock, FiGrid, FiStar, FiArchive, FiUsers, FiShare2 } from 'react-icons/fi';
import '../styles/sidebar.css';
import logo from '../../assets/images/flowboard-logo.png';
import pfp from '../../assets/images/anonymous-pfp.jpeg'
function Sidebar(){
    const sections = [
    { name: "Recents", icon: <FiClock /> },
    { name: "All Projects", icon: <FiGrid /> },
    { name: "Starred", icon: <FiStar /> },
    { name: "Archived", icon: <FiArchive /> },
    { name: "Community", icon: <FiUsers /> },
    { name: "Shared", icon: <FiShare2 /> },
    ];
    return (
        <aside className=" fixed w-1/4 xl:w-1/5 hidden md:block min-h-screen bg-cyan-950 text-white mr-6 flex flex-col">
            <div className="flex justify-center items-center mb-2 gap-6 p-6">
                <img src={logo} alt="flowboard-logo" className='w-12 h-12'/>
                <h1 className="text-3xl font-bold text-cyan-400 sidebar-title hidden lg:block">FlowBoard</h1>
            </div>
            <hr className=' border-0 bg-cyan-500 h-[3px] text-center mt-3 mx-auto' />
            <button className='flex gap-5 items-center px-10 py-3 hover:bg-cyan-900 w-full transition cursor-pointer'>
                    <img src={pfp} alt="anonymous profile picture" className='w-12 h-12 rounded-full'/>
                    <h1 className='text-white text-xl'>Jane Doe</h1> 
            </button>
            <hr className=' border-0 bg-cyan-500 h-[3px] text-center mb-3 mx-auto' />
            <nav className="flex flex-col">
                {sections.map((section) =>{
                    return (
                        <button key={section.name} className="flex items-center text-lg gap-2 text-left py-2 hover:bg-cyan-900 transition p-6 cursor-pointer">
                        {section.icon} {section.name}
                        </button>
                    )
                })}
            </nav>
        </aside>
    )
}
export default Sidebar;