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

function ProjectList({ projectList, handleLoadProject, handleDeleteProject, selectedCardId, handleCardClick, setSelectedCardId }) {
  const shouldLoop = projectList && projectList.length > 4;

  return (
    <Carousel
      className="w-full px-12"
      opts={{ loop: true, align: "start" }}
      plugins={selectedCardId === null ? [Autoplay({ delay: 3000, stopOnInteraction: true })] : []}
    >
      <CarouselContent className="flex py-8 px-4">
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
                handleLoadProject={handleLoadProject}
                handleDeleteProject={handleDeleteProject}
                isSelected={selectedCardId === project._id}
                handleCardClick={handleCardClick}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {shouldLoop && (
        <div onClick={() => setSelectedCardId(null)}>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </div>
      )}
    </Carousel>
  )
}

export default ProjectList;