import HomeSlides from "@/components/HomeSlides";
import SiteHeader from "@/components/SiteHeader";
import { featuredProjects } from "@/lib/projects";

export default function HomePage() {
  return (
    <div className="page-shell is-home">
      <SiteHeader />
      <main className="main-content">
        <h1 className="visually-hidden">
          Open Ruimte Ontwerpers — ontwerp- en studiebureau uit Gent
        </h1>
        <HomeSlides projects={featuredProjects} />
      </main>
    </div>
  );
}
