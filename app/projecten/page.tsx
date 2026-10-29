import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { imagePath, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projecten",
  description:
    "Parken, scholen, natuurinrichting, privétuinen, wonen en beheerplannen door Open Ruimte Ontwerpers.",
};

export default function ProjectsPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="main-content">
        <section id="overview_projects">
          <h1 className="visually-hidden">Projecten</h1>
          <ol className="grid">
            {projects.map((project) => (
              <li className="grid-item" key={project.slug}>
                <article className="card-project">
                  <h2>
                    <Link href={`/projecten/${project.slug}`}>
                      {project.title}
                      <br />
                      <span className="meta">{project.place}</span>
                      {project.year ? (
                        <>
                          <br />
                          <span className="meta">{project.year}</span>
                        </>
                      ) : null}
                    </Link>
                  </h2>
                  <figure>
                    <Link
                      href={`/projecten/${project.slug}`}
                      aria-label={project.title}
                      tabIndex={-1}
                    >
                      <Image
                        src={imagePath(project.cover)}
                        alt=""
                        fill
                        sizes="(min-width: 1448px) 20vw, (min-width: 1024px) 25vw, (min-width: 748px) 33vw, 50vw"
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                  </figure>
                </article>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
