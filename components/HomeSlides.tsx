"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { imagePath, type Project } from "@/lib/projects";

function ArrowDown() {
  return (
    <svg viewBox="0 0 32 56" fill="none" aria-hidden="true">
      <path
        d="M16 2v50M16 54 4 40M16 54l12-14"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function HomeSlides({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const slide = container.children[index] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="home-slides" ref={containerRef}>
      {projects.map((project, index) => (
        <section className="home-slide" key={project.slug}>
          <figure>
            <Link href={`/projecten/${project.slug}`}>
              <Image
                src={imagePath(project.cover)}
                alt={`${project.title}, ${project.place}`}
                fill
                sizes="100vw"
                priority={index === 0}
                style={{ objectFit: "cover" }}
              />
            </Link>
          </figure>
          <h2>
            <Link href={`/projecten/${project.slug}`}>
              {project.title}, {project.place}
            </Link>
          </h2>
          <button
            type="button"
            className="scroll-arrow"
            onClick={() => scrollToSlide(index + 1)}
            aria-label="Naar het volgende project"
          >
            <ArrowDown />
          </button>
        </section>
      ))}
    </div>
  );
}
