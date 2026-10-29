import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import {
  getNeighbours,
  getProject,
  imagePath,
  imageSize,
  projects,
  type Project,
} from "@/lib/projects";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: `${project.title}, ${project.place}`,
    description: project.description,
  };
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <dl className="meta-list">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </dl>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <aside className="project-meta">
      {project.client ? <MetaRow label="opdrachtgever">{project.client}</MetaRow> : null}
      {project.partners.length > 0 ? (
        <MetaRow label="samenwerking">
          {project.partners.map((partner) => (
            <span key={partner} style={{ display: "block" }}>
              {partner}
            </span>
          ))}
        </MetaRow>
      ) : null}
      {project.location ? <MetaRow label="locatie">{project.location}</MetaRow> : null}
      {project.size ? <MetaRow label="oppervlakte">{project.size}</MetaRow> : null}
      {project.status ? <MetaRow label="status">{project.status}</MetaRow> : null}
      {project.category ? <MetaRow label="type">{project.category}</MetaRow> : null}
      {project.credits ? <MetaRow label="beeld">{project.credits}</MetaRow> : null}
    </aside>
  );
}

export default function ProjectPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const { prev, next } = getNeighbours(project.slug);
  const gallery = project.images.filter((image) => image !== project.cover);

  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="main-content">
        <article className="project">
          <figure className="project-lead">
            <Image
              src={imagePath(project.cover)}
              alt={`${project.title}, ${project.place}`}
              fill
              sizes="100vw"
              priority
              style={{ objectFit: "cover" }}
            />
          </figure>

          <header className="project-header">
            <hgroup>
              <h1>{project.title}</h1>
              <h2>{project.place}</h2>
            </hgroup>
          </header>

          <div className="article-main-content">
            <section className="project-introduction">
              <p>{project.description}</p>
              {project.client && project.client !== "Particulier" ? (
                <p className="project-quote">In opdracht van {project.client}.</p>
              ) : null}
            </section>

            <ProjectMeta project={project} />

            {gallery.length > 0 ? (
              <section className="project-gallery">
                {gallery.map((image) => (
                  <figure key={image}>
                    <Image
                      src={imagePath(image)}
                      alt={`${project.title} — ${project.place}`}
                      {...imageSize(image)}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </figure>
                ))}
                {project.credits ? <figcaption>{project.credits}</figcaption> : null}
              </section>
            ) : null}

            <nav className="project-nav">
              {prev ? (
                <Link href={`/projecten/${prev.slug}`}>← {prev.title}</Link>
              ) : (
                <span />
              )}
              <Link href="/projecten">Alle projecten</Link>
              {next ? (
                <Link href={`/projecten/${next.slug}`}>{next.title} →</Link>
              ) : (
                <span />
              )}
            </nav>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
