import { useState } from "react";
import ProjectCard from "./ProjectCard";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

function ProjectList({ projectList }) {
  const [project, setProject] = useState(projectList);

  const setArchive = (idx) => {
    setProject(prevList =>
      prevList.filter(p => p.id !== idx)
    );
  }

  // Gracefully determine if looping is needed based on item count (e.g. if more than 4, it will loop on large screens)
  const shouldLoop = project.length > 4;

  return (
    <Carousel 
      className="w-full px-12"
      opts={{ loop: true, align: "start" }}
      plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
    >
      <CarouselContent className="flex">
        {project.map((item, idx) => (
          <CarouselItem key={item.id || idx} className="sm:basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <ProjectCard item={item} setArchive={() => setArchive(item.id)} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {shouldLoop && (
        <>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </>
      )}
    </Carousel>
  )
}

export default ProjectList;