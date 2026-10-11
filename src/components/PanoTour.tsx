"use client";

import { useEffect, useRef, useState } from "react";
import type { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";

const scenes = [
  { src: "/vr/pool-1.jpg", label: "Interior" },
  { src: "/vr/pool-2.jpg", label: "Pool deck" },
  { src: "/vr/pool-3.jpg", label: "Garden" },
];

/** Real 360° panoramas from the modern residence. The viewer loads only when started. */
export function PanoTour({ poster = "/work/p8/01.jpg" }: { poster?: string }) {
  const [started, setStarted] = useState(false);
  const [scene, setScene] = useState(1);
  const [loading, setLoading] = useState(true);
  const host = useRef<HTMLDivElement>(null);
  const viewer = useRef<Viewer | null>(null);

  useEffect(() => {
    if (!started) return;
    let dead = false;
    import("@photo-sphere-viewer/core").then(({ Viewer }) => {
      if (dead || !host.current) return;
      viewer.current = new Viewer({
        container: host.current,
        panorama: scenes[scene].src,
        defaultZoomLvl: 0,
        navbar: ["zoom", "fullscreen"],
        loadingTxt: "",
      });
      viewer.current.addEventListener("ready", () => setLoading(false));
    });
    return () => {
      dead = true;
      viewer.current?.destroy();
      viewer.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  function pick(i: number) {
    setScene(i);
    if (!started) return setStarted(true);
    if (!viewer.current) return;
    setLoading(true);
    viewer.current.setPanorama(scenes[i].src).then(() => setLoading(false));
  }

  return (
    <div>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-umber-2 sm:aspect-[16/9]" data-lenis-prevent>
        {started ? (
          <>
            <div ref={host} className="size-full" />
            {loading && <div className="pointer-events-none absolute inset-0 grid place-items-center bg-umber/80 text-sm text-stone">Loading</div>}
          </>
        ) : (
          <button onClick={() => setStarted(true)} className="group absolute inset-0 grid place-items-center" style={{ background: `url(${poster}) center/cover` }} aria-label="Start the 360 degree view">
            <span className="absolute inset-0 bg-umber/45 transition-colors duration-500 group-hover:bg-umber/25" />
            <span className="relative grid size-28 place-items-center rounded-full border border-bone/70 text-center text-sm leading-tight text-bone backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-brass-hi group-hover:text-brass-hi">
              360°
              <br />
              Enter
            </span>
          </button>
        )}
      </div>
      <div className="mt-6 flex flex-wrap gap-6">
        {scenes.map((s, i) => (
          <button
            key={s.src}
            onClick={() => pick(i)}
            aria-pressed={started && scene === i}
            className={`link-u text-[0.95rem] ${started && scene === i ? "text-brass-hi" : "text-bone/80"}`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
