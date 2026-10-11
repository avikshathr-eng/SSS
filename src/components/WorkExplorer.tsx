"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { categoryLabels, projects, type Tag } from "@/lib/projects";

const order: (Tag | "all" | "film")[] = ["all", "hospitality", "retail", "residential", "commercial", "community", "interior", "aerial", "film"];
const label = (t: Tag | "all" | "film") => (t === "all" ? "All" : t === "film" ? "Film" : categoryLabels[t]);

export function WorkExplorer() {
  const [tag, setTag] = useState<Tag | "all" | "film">("all");
  const match = (t: Tag | "all" | "film", p: (typeof projects)[number]) =>
    t === "all" ? true : t === "film" ? p.videos.length > 0 : p.tags.includes(t);
  const list = useMemo(() => projects.filter((p) => match(tag, p)), [tag]);

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-x-9 gap-y-3">
        {order.map((t) => (
          <button
            key={t}
            aria-pressed={tag === t}
            onClick={() => setTag(t)}
            className={`link-u text-[0.95rem] transition-colors ${tag === t ? "text-brass-hi" : "text-bone/70"}`}
          >
            {label(t)} <span className="text-stone">{projects.filter((p) => match(t, p)).length}</span>
          </button>
        ))}
      </div>

      <motion.ul layout className="mt-16 grid gap-x-6 gap-y-20 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.li
              key={p.n}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className={i % 2 === 1 ? "md:mt-28" : ""}
            >
              <Link href={`/work/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-umber-2">
                  <Image
                    src={p.images[0].src}
                    alt={`${p.title}, hero render`}
                    fill
                    sizes="(min-width:768px) 48vw, 95vw"
                    placeholder={p.images[0].blur ? "blur" : "empty"}
                    blurDataURL={p.images[0].blur}
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                  {p.videos.length > 0 && <span className="absolute right-4 top-4 bg-umber/75 px-3 py-1 text-xs backdrop-blur">Film</span>}
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="t-h3 transition-colors group-hover:text-brass-hi">{p.title}</h3>
                  <span className="muted shrink-0 text-sm">
                    {categoryLabels[p.category]}
                    {p.place ? `, ${p.place}` : ""}
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
