"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { Project, ProjectStatus } from "@/data/projects";

const statusStyles: Record<ProjectStatus, string> = {
  Live: "text-lamp border-[rgba(244,200,122,0.35)] bg-[rgba(244,200,122,0.12)]",
  "Team Project":
    "text-starlight border-[rgba(139,157,255,0.35)] bg-[rgba(139,157,255,0.12)]",
  "In Progress":
    "text-muted border-[rgba(136,145,163,0.35)] bg-[rgba(136,145,163,0.1)]",
};

function DemoVideo({ src }: { src?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [failed, setFailed] = useState(false);

  const toggle = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const video = videoRef.current;
    if (!video || failed) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-[rgba(11,14,23,0.4)]">
      {src && !failed ? (
        <video
          ref={videoRef}
          src={src}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full min-h-[160px] w-full flex-col items-center justify-center gap-2 text-center sm:min-h-[200px]">
          <p className="text-sm text-muted">Demo video</p>
          <p className="px-4 text-xs text-muted/70">
            Drop a screen recording at{" "}
            <span className="text-starlight">{src ?? "/demos/…"}</span>
          </p>
        </div>
      )}

      {src && !failed && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause demo video" : "Play demo video"}
          className="glass absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full text-primary"
        >
          {playing ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [canTilt, setCanTilt] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanTilt(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!canTilt) return;

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      setTilt({ x: current.current.x, y: current.current.y });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [canTilt]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!canTilt) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    target.current = { x: -(py * 6), y: px * 6 };
  };

  const onLeave = () => {
    target.current = { x: 0, y: 0 };
  };

  return (
    // Outer shell: NO transform — keeps backdrop-filter sampling the starfield
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative"
    >
      <div
        aria-hidden
        className="glass pointer-events-none absolute inset-0 rounded-2xl shadow-glass"
      />

      <article
        style={
          canTilt
            ? {
                transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: "preserve-3d",
              }
            : undefined
        }
        className="relative rounded-2xl p-5 sm:p-6"
      >
        <span
          className={`absolute right-4 top-4 z-10 rounded-full border px-2.5 py-0.5 text-xs ${statusStyles[project.status]}`}
        >
          {project.status}
        </span>

        <DemoVideo src={project.video} />

        <div className="mt-5 max-w-[calc(100%-6rem)]">
          <h3 className="font-display text-2xl font-medium text-primary">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">
            {project.description}
          </p>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <li
              key={tag}
              className="glass rounded-full px-3 py-1 text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-starlight underline-offset-4 hover:underline"
            >
              Repository
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-starlight underline-offset-4 hover:underline"
            >
              Live demo
            </a>
          )}
        </div>
      </article>
    </div>
  );
}
