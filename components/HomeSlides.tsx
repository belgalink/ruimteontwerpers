"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { imagePath, type Project } from "@/lib/projects";

/** Slide transition, noticeably calmer than the browser's native smooth scroll. */
const DURATION = 1150;
/** Ignore wheel noise and trackpad momentum tails below this delta. */
const WHEEL_THRESHOLD = 12;
/** Settle time after a slide lands, so momentum does not chain into the next. */
const COOLDOWN = 220;
const SWIPE_DISTANCE = 55;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function ArrowDown() {
  return (
    <svg viewBox="0 0 32 56" fill="none" aria-hidden="true">
      <path
        d="M16 2v50M16 54 4 40M16 54l12-14"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function HomeSlides({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const lockedUntilRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const touchStartRef = useRef<number | null>(null);

  const goToSlide = useCallback(
    (target: number) => {
      const container = containerRef.current;
      if (!container) return;

      const index = Math.max(0, Math.min(target, projects.length - 1));
      const top = index * container.clientHeight;
      const from = container.scrollTop;
      const distance = top - from;

      indexRef.current = index;
      if (Math.abs(distance) < 1) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        container.scrollTop = top;
        return;
      }

      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);

      // Snapping would fight the animation, so it is suspended while it runs.
      container.style.scrollSnapType = "none";
      lockedUntilRef.current = Infinity;
      const started = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - started) / DURATION, 1);
        container.scrollTop = from + distance * easeInOutCubic(progress);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(step);
          return;
        }

        frameRef.current = null;
        container.style.scrollSnapType = "";
        lockedUntilRef.current = performance.now() + COOLDOWN;
      };

      frameRef.current = requestAnimationFrame(step);
    },
    [projects.length],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isLocked = () => performance.now() < lockedUntilRef.current;

    // Registered manually: React attaches wheel listeners passively,
    // which would make preventDefault a no-op.
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (isLocked() || Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;
      goToSlide(indexRef.current + (event.deltaY > 0 ? 1 : -1));
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const keys = [
        "ArrowDown",
        "ArrowUp",
        "PageDown",
        "PageUp",
        "Home",
        "End",
        " ",
      ];
      if (!keys.includes(event.key)) return;
      const target = event.target as HTMLElement | null;
      if (target && target.closest("a, button")) return;

      event.preventDefault();
      if (isLocked()) return;

      if (event.key === "Home") goToSlide(0);
      else if (event.key === "End") goToSlide(projects.length - 1);
      else if (event.key === "ArrowUp" || event.key === "PageUp")
        goToSlide(indexRef.current - 1);
      else goToSlide(indexRef.current + 1);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchEnd = (event: TouchEvent) => {
      const start = touchStartRef.current;
      touchStartRef.current = null;
      if (start === null || isLocked()) return;
      const delta = start - (event.changedTouches[0]?.clientY ?? start);
      if (Math.abs(delta) < SWIPE_DISTANCE) return;
      goToSlide(indexRef.current + (delta > 0 ? 1 : -1));
    };

    // Keeps the index honest if the viewport changes or a scroll happens
    // outside the animation (native snap on touch, a find-in-page jump).
    const syncIndex = () => {
      if (frameRef.current !== null || !container.clientHeight) return;
      indexRef.current = Math.round(container.scrollTop / container.clientHeight);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    container.addEventListener("scroll", syncIndex, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", syncIndex);

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("scroll", syncIndex);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", syncIndex);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [goToSlide, projects.length]);

  return (
    <div className="home-slides" ref={containerRef}>
      {projects.map((project, index) => (
        <section className="home-slide" key={project.slug}>
          <figure>
            <Link href={`/projecten/${project.slug}`}>
              <Image
                src={imagePath(project.cover)}
                alt={`${project.title}, ${project.place}`}
                fill
                sizes="100vw"
                priority={index === 0}
                style={{ objectFit: "cover" }}
              />
            </Link>
          </figure>
          <h2>
            <Link href={`/projecten/${project.slug}`}>
              {project.title}, {project.place}
            </Link>
          </h2>
          <button
            type="button"
            className="scroll-arrow"
            onClick={() => goToSlide(index + 1)}
            aria-label="Naar het volgende project"
          >
            <ArrowDown />
          </button>
        </section>
      ))}
    </div>
  );
}
