import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 scroll-mt-16">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 md:py-24">
        <h2 className="font-display text-3xl font-medium tracking-tight text-primary sm:text-4xl">
          Projects
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted">
          Product builds, team DevOps, and ongoing research engineering.
        </p>

        <ul className="mt-10 grid gap-6 sm:gap-8">
          {projects.map((project) => (
            <li key={project.title}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
