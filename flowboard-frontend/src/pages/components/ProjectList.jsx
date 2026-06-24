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
  const shouldLoop = projectList && projectList.length > 4;

  return (
    <Carousel
      className="w-full px-12"
      opts={{ loop: true, align: "start" }}
      plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
    >
      <CarouselContent className="flex">
        {projectList && projectList.map((project) => (
          <CarouselItem key={project._id} className="sm:basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <ProjectCard 
                id={project._id}
                name={project.name || "Untitled Project"}
                lastEdited={project.updatedAt ? new Date(project.updatedAt).toLocaleDateString() : "Unknown date"}
                thumbnail={project.thumbnail || "public/dashboard-card-img.png"}
                starred={false}
                archived={false}
                setArchive={() => {}}
            />
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