"use client";

import { useEffect, useRef, useState } from "react";

export default function AmbientToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.25;
    audio.loop = true;
  }, []);

  // Browsers block audio with sound until the visitor interacts with the
  // page at least once. Instead of requiring them to find/click this
  // button specifically, start playback on their very first interaction
  // anywhere on the page (click, scroll, or keypress) — whichever fires
  // first. If they'd rather not have it on, the button still lets them
  // pause it immediately after.
  useEffect(() => {
    const startOnFirstInteraction = async () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const audio = audioRef.current;
      if (!audio) return;
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        // Autoplay still blocked for some reason — leave it for the
        // manual toggle button instead.
        startedRef.current = false;
      }
    };

    const events: (keyof WindowEventMap)[] = ["click", "scroll", "keydown", "touchstart"];
    events.forEach((e) => window.addEventListener(e, startOnFirstInteraction, { once: true }));

    return () => {
      events.forEach((e) => window.removeEventListener(e, startOnFirstInteraction));
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    startedRef.current = true;
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/ambient.mp3" preload="metadata" loop />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause ambient music" : "Play ambient music"}
        aria-pressed={playing}
        className={`glass fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full text-lamp shadow-glass ${
          playing ? "animate-pulseSoft" : "opacity-80"
        }`}
      >
        {playing ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        )}
      </button>
    </>
  );
}