"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { categoryLabels, type Project } from "@/lib/projects";

export function WorkReel({ items }: { items: Project[] }) {
  const rail = useRef<HTMLUListElement>(null);
  const nudge = (d: number) => rail.current?.scrollBy({ left: d * rail.current.clientWidth * 0.6, behavior: "smooth" });

  return (
    <div>
      <ul
        ref={rail}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-6 pl-[clamp(1.25rem,4.2vw,5rem)] pr-[clamp(1.25rem,4.2vw,5rem)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Selected projects"
        data-lenis-prevent
      >
        {items.map((p, i) => (
          <li key={p.n} className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[30vw]">
            <Link href={`/work/${p.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-umber-3">
                <Image
                  src={p.images[0].src}
                  alt={`${p.title}, hero render`}
                  fill
                  sizes="(min-width:1024px) 30vw, (min-width:640px) 44vw, 78vw"
                  placeholder={p.images[0].blur ? "blur" : "empty"}
                  blurDataURL={p.images[0].blur}
                  priority={i < 2}
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-umber/80 via-transparent to-transparent" />
                {p.videos.length > 0 && (
                  <span className="absolute right-4 top-4 bg-umber/75 px-3 py-1 text-xs backdrop-blur">Film</span>
                )}
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="t-h3 transition-colors group-hover:text-brass-hi">{p.title}</h3>
                <span className="muted shrink-0 text-sm">{categoryLabels[p.category]}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="wrap mt-6 flex gap-3">
        <button onClick={() => nudge(-1)} aria-label="Previous projects" className="btn !min-h-12 !px-5">
          ←
        </button>
        <button onClick={() => nudge(1)} aria-label="Next projects" className="btn !min-h-12 !px-5">
          →
        </button>
      </div>
    </div>
  );
}
