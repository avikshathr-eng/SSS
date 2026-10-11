"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * The opening: one real camera, three stages of the same project.
 * Plan (drawing) -> Model (clay) -> Render. A brass scan line carries the wipe,
 * and the headline changes colour exactly where the line passes, because each
 * stage owns its own copy of the text.
 */

type Stage = {
  key: string;
  label: string;
  src: string;
  tone: "ink" | "clay" | "ivory";
};

const stages: Stage[] = [
  { key: "plan", label: "Plan", src: "/story/linework.jpg", tone: "ink" },
  { key: "model", label: "Model", src: "/story/clay.jpg", tone: "clay" },
  { key: "render", label: "Render", src: "/story/render.jpg", tone: "ivory" },
];

const tone = {
  ink: "text-ink",
  clay: "text-umber",
  ivory: "text-bone",
} as const;

function Copy({ s, index, interactive }: { s: Stage; index: number; interactive: boolean }) {
  const ring = s.tone === "ivory" ? "text-bone" : "text-ink";
  return (
    <div className={`absolute inset-0 flex flex-col justify-between ${tone[s.tone]}`}>
      <div className="wrap pt-[9.5rem] md:pt-[11rem]">
        <h1 className="t-display max-w-[11ch] md:max-w-[13ch]">We build what doesn’t exist yet.</h1>
      </div>
      <div className="wrap flex flex-wrap items-end justify-between gap-8 pb-10 md:pb-14">
        <div className="flex flex-wrap gap-4">
          <Link href="/submit-your-plan" className={`btn ${ring} ${s.tone === "ivory" ? "btn-solid" : s.tone === "ink" ? "bg-bone" : "bg-bone/70"}`} tabIndex={interactive ? 0 : -1}>
            Submit your plan
          </Link>
          <Link href="/work" className={`btn ${ring} ${s.tone === "ink" ? "bg-bone" : s.tone === "clay" ? "bg-bone/70" : ""}`} tabIndex={interactive ? 0 : -1}>
            See the work
          </Link>
        </div>
        <p className="flex items-baseline gap-3 text-sm">
          <span className="font-serif text-3xl leading-none">{index + 1}</span>
          <span>{s.label}</span>
          <span className="opacity-60">/ 3</span>
        </p>
      </div>
    </div>
  );
}

function PlanMarks() {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 100 100">
      {/* registration marks */}
      {[
        [2.2, 14],
        [97.8, 14],
        [2.2, 97],
        [97.8, 97],
      ].map(([x, y], i) => (
        <g key={i} stroke="#1c1814" strokeWidth="0.12" vectorEffect="non-scaling-stroke" opacity="0.45">
          <path d={`M ${x - 0.9} ${y} H ${x + 0.9} M ${x} ${y - 1.6} V ${y + 1.6}`} vectorEffect="non-scaling-stroke" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}

export function PinnedHero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const w1 = useTransform(p, [0.08, 0.4], [0, 100], { clamp: true });
  const w2 = useTransform(p, [0.52, 0.86], [0, 100], { clamp: true });
  const clip1 = useMotionTemplate`inset(0 0 0 ${w1}%)`;
  const clip2 = useMotionTemplate`inset(0 0 0 ${w2}%)`;
  const left1 = useMotionTemplate`${w1}%`;
  const left2 = useMotionTemplate`${w2}%`;
  const line1 = useTransform(p, [0.08, 0.1, 0.38, 0.4], [0, 1, 1, 0]);
  const line2 = useTransform(p, [0.52, 0.54, 0.84, 0.86], [0, 1, 1, 0]);
  const hint = useTransform(p, [0, 0.06], [1, 0]);

  // The header sits over the cream drawing first, then over the render: tell it which ink to use.
  useMotionValueEvent(p, "change", (v) => {
    document.documentElement.dataset.hdr = v < 0.58 ? "ink" : "ivory";
    document.documentElement.dataset.nav = v < 0.84 ? "ink" : "ivory";
  });
  useEffect(() => {
    document.documentElement.dataset.hdr = "ink";
    document.documentElement.dataset.nav = "ink";
    return () => {
      delete document.documentElement.dataset.hdr;
      delete document.documentElement.dataset.nav;
    };
  }, []);

  if (reduce) {
    return (
      <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <Image src={stages[2].src} alt="Exterior render of a retail building, the final stage of the plan-to-render sequence" fill priority sizes="100vw" quality={75} className="object-cover object-[50%_72%]" />
        <Copy s={stages[2]} index={2} interactive />
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[430svh]" aria-label="From plan to render">
      <div className="sticky top-0 h-[100svh] min-h-[640px] overflow-hidden bg-umber">
        {/* Stage 3: render (bottom layer, always painted) */}
        <div className="absolute inset-0">
          <Image src={stages[2].src} alt="Exterior render of a retail building: the finished stage of the plan-to-render sequence" fill priority sizes="100vw" quality={75} className="object-cover object-[50%_72%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-umber/70 via-transparent to-umber/70" />
          <Copy s={stages[2]} index={2} interactive />
        </div>

        {/* Stage 2: clay */}
        <motion.div className="absolute inset-0" style={{ clipPath: clip2 }} inert>
          <Image src={stages[1].src} alt="" fill sizes="100vw" quality={75} className="object-cover object-[50%_72%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-bone/40 via-transparent to-transparent" />
          <Copy s={stages[1]} index={1} interactive={false} />
        </motion.div>

        {/* Stage 1: plan */}
        <motion.div className="absolute inset-0 bg-bone" style={{ clipPath: clip1 }} inert>
          <div className="drafting-grid absolute inset-0" />
          <Image src={stages[0].src} alt="" fill priority sizes="100vw" quality={75} className="object-cover object-[50%_72%] mix-blend-multiply" />
          <PlanMarks />
          <Copy s={stages[0]} index={0} interactive={false} />
        </motion.div>

        {/* scan lines */}
        <motion.span aria-hidden className="pointer-events-none absolute inset-y-0 z-10 w-px bg-brass" style={{ left: left1, opacity: line1 }}>
          <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brass bg-bone" />
        </motion.span>
        <motion.span aria-hidden className="pointer-events-none absolute inset-y-0 z-10 w-px bg-brass-hi" style={{ left: left2, opacity: line2 }}>
          <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brass-hi bg-umber" />
        </motion.span>

        <motion.p aria-hidden style={{ opacity: hint }} className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-xs text-ink md:block">
          Scroll
        </motion.p>
      </div>
    </section>
  );
}
