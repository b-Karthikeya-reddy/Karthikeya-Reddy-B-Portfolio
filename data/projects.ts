export type ProjectStatus = "Live" | "Team Project" | "In Progress";

export type Project = {
  title: string;
  summary: string;
  description: string;
  tech: string[];
  status: ProjectStatus;
  repoUrl?: string;
  liveUrl?: string;
  /** Path under /public for looping demo video */
  video?: string;
  /** Optional still fallback if video is missing */
  image?: string;
};

export const projects: Project[] = [
  {
    title: "Tutorly",
    summary:
      "Peer-tutoring marketplace for college students — booking, messaging, and reviews.",
    description:
      "A peer-tutoring marketplace for college students — search tutors by subject or university, book sessions, message tutors, and leave reviews. Built end-to-end: auth, role-based dashboards for students and tutors, availability/booking system, real-time-feeling messaging, reviews.",
    tech: ["React 19", "TypeScript", "Vite", "Supabase", "Tailwind CSS"],
    status: "Live",
    repoUrl: "https://github.com/b-Karthikeya-reddy/Tutorly",
    liveUrl: "https://tutorly-puce.vercel.app",
    video: "/demos/Tutorly-demo.mp4",
  },
  {
    title: "BudgetBuddy",
    summary:
      "Student budgeting app — DevOps/architect role on a 5-person team.",
    description:
      "A budgeting and expense-tracking app for students, built by a 5-person team. My role was DevOps Engineer / Architect: built the CI/CD pipelines (GitHub Actions — ci.yml and cd.yml) and a deployment smoke-check script, handled release hardening, fixed bugs in category-selection fallback logic and invalid budget draft handling, wrote the README, reviewed and approved 6 PRs with 3 of my own merged.",
    tech: ["Next.js", "Supabase", "GitHub Actions", "Jest", "Playwright"],
    status: "Team Project",
    repoUrl: "https://github.com/b-Karthikeya-reddy/Budget-buddy",
    liveUrl: "https://budget-buddy021.vercel.app",
    video: "/demos/BudgetBuddy-demo.mp4",
  },
  {
    title: "Benchmarking Multi-Agent Reinforcement Learning in AR",
    summary:
      "MARL furniture placement in AR, simulated with PettingZoo and IKEA data.",
    description:
      "MARL-based AR furniture placement system, simulated in PettingZoo using real IKEA data. Scope: 15×15 grid with a $1,000 budget cap, achieving 50–56% space utilization across five room types. Built custom environments, data pipelines, and visualizations. Senior Design — ongoing.",
    tech: ["Python", "PettingZoo", "Custom RL environments"],
    status: "In Progress",
    repoUrl: "https://github.com/b-Karthikeya-reddy/Marl-ar-benchmark",
    video: "",
  },
  // add more projects here
  // {
  //   title: "",
  //   summary: "",
  //   description: "",
  //   tech: [],
  //   status: "In Progress",
  //   repoUrl: "",
  //   liveUrl: "",
  //   video: "",
  // },
];
