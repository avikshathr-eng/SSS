"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CompareSlider } from "./CompareSlider";
import { VideoPlayer } from "./VideoPlayer";

type Step = {
  title: string;
  line: string;
  media: "massing" | "linework" | "clay" | "options" | "render" | "film" | "interior";
};

/** One real project (a convenience-store and fuel development) shown at every stage. */
const steps: Step[] = [
  { title: "Brief", line: "Plans or a model, and the date you launch.", media: "massing" },
  { title: "Model", line: "We build it digitally and place the cameras.", media: "linework" },
  { title: "Clay", line: "You lock the views here, where changes cost least.", media: "clay" },
  { title: "Materials and light", line: "Brick or stone? You see both before you choose.", media: "options" },
  { title: "Render", line: "Two review rounds, with comments pinned to the frame.", media: "render" },
  { title: "Film", line: "Cut, graded and scored. Aerial plates match the 3D cameras.", media: "film" },
  { title: "Delivery", line: "Web, print and social files. Archived for your next phase.", media: "interior" },
];

const src = {
  massing: { src: "/story/massing.jpg", alt: "Aerial massing view of the site and buildings" },
  linework: { src: "/story/linework.jpg", alt: "Line drawing of the front elevation" },
  clay: { src: "/story/clay.jpg", alt: "Clay model of the front elevation" },
  render: { src: "/story/render.jpg", alt: "Finished render of the front elevation" },
  interior: { src: "/work/p24/07.jpg", alt: "Interior render of the store" },
};

export function Method({ film }: { film?: { src: string; poster: string } }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-24">
      <div className="hidden lg:block">
        <div className="sticky top-32">
          <h2 className="t-h2 max-w-[10ch]">How a plan becomes a launch.</h2>
          <ol className="mt-14 space-y-1">
            {steps.map((s, i) => (
              <li key={s.title}>
                <a href={`#step-${i}`} className="group flex items-center gap-5 py-2">
                  <span className={`h-px transition-all duration-500 ${i === active ? "w-14 bg-brass-ink" : "w-5 bg-ink/30 group-hover:w-9"}`} />
                  <span className={`text-lg transition-colors ${i === active ? "text-ink" : "text-ink/45"}`}>{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div>
        <h2 className="t-h2 mb-12 lg:hidden">How a plan becomes a launch.</h2>
        <ol className="space-y-20 lg:space-y-[18vh]">
          {steps.map((s, i) => (
            <li
              key={s.title}
              id={`step-${i}`}
              data-i={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="scroll-mt-32"
            >
              <motion.div
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                whileInView={{ clipPath: "inset(0 0 0% 0)" }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
              >
                {s.media === "film" && film ? (
                  <VideoPlayer src={film.src} poster={film.poster} title="Flex office and warehouse park film" className="aspect-[3/2]" />
                ) : s.media === "options" ? (
                  <CompareSlider
                    pair={{
                      a: "/story/option-a.jpg",
                      b: "/story/option-b.jpg",
                      aLabel: "Brick",
                      bLabel: "Stone",
                      alt: "Same camera, two facade material options",
                      w: 2400,
                      h: 1600,
                    }}
                  />
                ) : (
                  <div className={`relative aspect-[3/2] overflow-hidden bg-umber-2 ${s.media === "linework" ? "ring-1 ring-ink/15" : ""}`}>
                    <Image src={src[s.media as keyof typeof src].src} alt={src[s.media as keyof typeof src].alt} fill sizes="(min-width:1024px) 55vw, 95vw" className="object-cover" />
                  </div>
                )}
              </motion.div>
              <div className="mt-6 flex items-baseline gap-5">
                <span className="font-serif text-4xl leading-none text-brass-ink">{i + 1}</span>
                <div>
                  <h3 className="t-h3">{s.title}</h3>
                  <p className="muted mt-1 max-w-[38ch]">{s.line}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
