import Image from "next/image";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section id="home" className="relative z-10 scroll-mt-16">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-5 py-12 sm:px-8 md:py-20 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
        <div className="relative">
          {/* Desk-lamp glow behind the name */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-8 -top-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(244,200,122,0.28)_0%,transparent_70%)] blur-[60px] sm:h-72 sm:w-72"
          />

          <p className="relative text-sm tracking-[0.06em] text-lamp">
            Based in NYC, building real things
          </p>
          <h1 className="relative mt-3 font-display text-5xl font-medium tracking-tight text-primary sm:text-6xl lg:text-[5.75rem] lg:leading-[1.05]">
            {site.name}
          </h1>
          <p className="relative mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {site.title}
          </p>
          <p className="relative mt-2 max-w-lg text-base text-primary/90">
            {site.oneLiner}
          </p>

          <div className="relative mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
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
            <a
              href={site.links.email}
              className="text-starlight underline-offset-4 hover:underline"
            >
              Email
            </a>
            <a
              href={site.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lamp underline-offset-4 hover:underline"
            >
              Resume
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xs lg:mx-0 lg:justify-self-end">
          <div className="glass relative aspect-[4/5] overflow-hidden rounded-2xl shadow-glass">
            <Image
              src={site.photo}
              alt={`${site.name} — portrait`}
              fill
              priority
              sizes="(max-width: 1024px) 20rem, 18rem"
              className="object-cover object-[center_12%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
