"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export interface ComparePair {
  a: string;
  b: string;
  aLabel: string;
  bLabel: string;
  alt: string;
  w: number;
  h: number;
}

export function CompareSlider({ pair, className = "aspect-[3/2]" }: { pair: ComparePair; className?: string }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  function move(clientX: number) {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }

  return (
    <div
      ref={box}
      className={`relative w-full cursor-ew-resize touch-pan-y select-none overflow-hidden bg-umber-2 ${className}`}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && move(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
    >
      <Image src={pair.b} alt={`${pair.alt}, ${pair.bLabel}`} width={pair.w} height={pair.h} sizes="(min-width:1024px) 55vw, 95vw" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={pair.a} alt={`${pair.alt}, ${pair.aLabel}`} width={pair.w} height={pair.h} sizes="(min-width:1024px) 55vw, 95vw" className="size-full object-cover" />
      </div>

      <span className="absolute left-4 top-4 bg-umber/80 px-3 py-1 text-xs text-bone backdrop-blur">{pair.aLabel}</span>
      <span className="absolute right-4 top-4 bg-umber/80 px-3 py-1 text-xs text-bone backdrop-blur">{pair.bLabel}</span>

      <div className="pointer-events-none absolute inset-y-0 w-px bg-brass-hi" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-brass-hi bg-umber text-brass-hi">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />
          </svg>
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Compare ${pair.aLabel} and ${pair.bLabel}`}
        className="absolute inset-x-0 bottom-0 h-10 w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
