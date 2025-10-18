import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

function ProjectList({ projectList }) {
  const [viewIndex, setViewIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [project, setProject] = useState(projectList);
  const colsMap = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" };
  const delay = 5000;

  const setArchive = (idx) => {
    setProject(prevList =>
      prevList.filter(p => p.id !== idx)
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setViewIndex(prev => (prev + 1) % project.length);
    }, delay);
    return () => clearInterval(interval);
  }, [project]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCount =
    windowWidth < 640 ? 1 :
      windowWidth < 1024 ? 2 :
        windowWidth < 1280 ? 3 : 4;

  const visibleList = [];
  for (let i = 0; i < visibleCount; i++) {
    visibleList.push(project[(viewIndex + i) % project.length]);
  }

  return (
    <Carousel className="w-full">
      <CarouselContent className={`grid gap-4 ${colsMap[visibleCount]}`}>
        {project.map((item, idx) => (
          <CarouselItem key={idx} className="sm:basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <ProjectCard item={item} setArchive={() => setArchive(item.id)} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default ProjectList;