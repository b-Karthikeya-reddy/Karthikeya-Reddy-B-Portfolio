import { site } from "@/data/site";

export default function Contact() {
  const emailDisplay = site.links.email.replace(/^mailto:/, "");

  return (
    <section id="contact" className="relative z-10 scroll-mt-16">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 md:py-24">
        <div className="glass rounded-2xl p-8 shadow-glass sm:p-10">
          <h2 className="font-display text-3xl font-medium tracking-tight text-primary sm:text-4xl">
            Contact
          </h2>
          <p className="mt-3 max-w-md text-base text-muted">
            Open to research collabs, internships, and interesting full-stack or
            AI agent work.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a
              href={site.links.email}
              className="text-lamp underline-offset-4 hover:underline"
            >
              {emailDisplay}
            </a>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-starlight underline-offset-4 hover:underline"
            >
              GitHub
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-starlight underline-offset-4 hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <p className="mt-10 text-xs text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </section>
  );
}
