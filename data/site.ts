export const site = {
  name: "Karthik",
  title:
    "Junior Computer Science student at The City College of New York (CCNY/CUNY), graduating May 2027",
  oneLiner: "CS student focused on AI agents and full-stack development",
  links: {
    github: "https://github.com/b-karthikeya-reddy",
    linkedin: "https://www.linkedin.com/in/karthikeya-reddy-basavanagoudgari/",
    email: "mailto:you@example.com", // placeholder — swap in your real email
    resume: "/resume.pdf",
  },
  photo: "/photo.png",
  research: {
    lab: "Professor Saptarashmi Bandyopadhyay's AI Agents Lab at CCNY",
    projects: [
      {
        title: "Protein scientific discovery",
        tools: "BindCraft / AlphaFold2",
        contribution:
          "[Placeholder — describe your role and contributions on this project.]",
      },
      {
        title: "Mathematical discovery",
        tools: null,
        contribution:
          "[Placeholder — describe your role and contributions on this project.]",
      },
    ],
  },
  skills: {
    Languages: ["Python", "JavaScript/TypeScript", "SQL"],
    Frontend: ["React", "Next.js", "Tailwind CSS"],
    "Backend / Data": ["Supabase", "Postgres", "Flask"],
    Tools: ["Git", "GitHub Actions", "Vercel"],
  },
} as const;
