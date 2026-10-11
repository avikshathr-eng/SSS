"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/** Click-to-play. Nothing downloads until the visitor presses play. */
export function VideoPlayer({
  src,
  poster,
  title,
  className = "aspect-video",
}: {
  src: string;
  poster: string;
  title: string;
  className?: string;
}) {
  const [on, setOn] = useState(false);
  const v = useRef<HTMLVideoElement>(null);

  return (
    <div className={`relative w-full overflow-hidden bg-umber-2 ${className}`}>
      {on ? (
        <video ref={v} src={src} poster={poster} controls autoPlay playsInline preload="auto" className="size-full object-cover" aria-label={title} />
      ) : (
        <button
          onClick={() => setOn(true)}
          className="group absolute inset-0"
          aria-label={`Play film: ${title}`}
        >
          <Image src={poster} alt="" fill sizes="(min-width:1024px) 90vw, 95vw" className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]" />
          <span className="absolute inset-0 bg-umber/30 transition-colors group-hover:bg-umber/15" />
          <span className="absolute left-1/2 top-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-bone/70 text-bone backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-brass-hi group-hover:text-brass-hi">
            <svg width="22" height="26" viewBox="0 0 22 26" fill="currentColor" aria-hidden>
              <path d="M2 1.5v23l19-11.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
