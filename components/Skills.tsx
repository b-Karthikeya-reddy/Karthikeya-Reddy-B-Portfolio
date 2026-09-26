import { site } from "@/data/site";

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 scroll-mt-16">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 md:py-24">
        <h2 className="font-display text-3xl font-medium tracking-tight text-primary sm:text-4xl">
          Skills
        </h2>

        <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(site.skills).map(([group, items]) => (
            <div key={group}>
              <h3 className="inline-block border-b-2 border-lamp pb-1 text-sm text-muted">
                {group}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {items.map((skill) => (
                  <li
                    key={skill}
                    className="glass rounded-full px-3 py-1 text-xs text-muted"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}