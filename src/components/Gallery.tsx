"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import type { ProjectImage } from "@/lib/projects";

export function Gallery({ images, title }: { images: ProjectImage[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.documentElement.classList.add("lenis-stopped");
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("lenis-stopped");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
        {images.map((im, i) => {
          const wide = i % 3 === 0;
          return (
            <li key={im.src} className={wide ? "md:col-span-12" : "md:col-span-6"}>
              <button onClick={() => setOpen(i)} className="group block w-full cursor-zoom-in overflow-hidden bg-umber-2" aria-label={`Open image ${i + 1} of ${images.length}`}>
                <Image
                  src={im.src}
                  alt={`${title}, render ${i + 1}`}
                  width={im.w}
                  height={im.h}
                  sizes={wide ? "95vw" : "(min-width:768px) 48vw, 95vw"}
                  placeholder={im.blur ? "blur" : "empty"}
                  blurDataURL={im.blur}
                  className="h-auto w-full transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                />
              </button>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} image viewer`}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-umber/96 p-4 sm:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          >
            <Image
              key={images[open].src}
              src={images[open].src}
              alt={`${title}, render ${open + 1}`}
              width={images[open].w}
              height={images[open].h}
              sizes="100vw"
              quality={82}
              className="max-h-full w-auto max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={close} className="absolute right-4 top-4 grid size-12 place-items-center text-2xl text-bone hover:text-brass-hi" aria-label="Close">
              ×
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center text-3xl text-bone hover:text-brass-hi sm:left-6"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center text-3xl text-bone hover:text-brass-hi sm:right-6"
              aria-label="Next image"
            >
              ›
            </button>
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-stone">
              {open + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
