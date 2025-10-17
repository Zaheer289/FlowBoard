import { useState, useEffect } from "react"
import ProjectCard from "./ProjectCard";
function ProjectList({projectList}){
    const [viewIndex, setViewIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const colsMap = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" };
    const delay = 5000;
    useEffect(() => {
        const interval = setInterval(() => {
            setViewIndex(prev => (prev+1)%projectList.length);
        },delay)
        return () => clearInterval(interval);       
    },[projectList.length]);
    useEffect(() =>{
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize",handleResize);
        return () => window.removeEventListener("resize",handleResize);
    },[])
    const visibleCount =
    windowWidth < 640 ? 1 :
    windowWidth < 1024 ? 2 :
    windowWidth < 1280 ? 3 : 4;
    const visibleList = [];
    for(let i=0;i<visibleCount;i++){
        visibleList.push(projectList[(viewIndex+i)%projectList.length]);
    }
    return(
        <div className={`grid gap-4 ${colsMap[visibleCount]}`}>
            {visibleList.map((item, idx) =>{
                return (<ProjectCard key={idx} item={item}/>);
            })}
        </div>
    )
}
export default ProjectList;
