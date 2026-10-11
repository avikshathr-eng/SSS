/* eslint-disable @next/next/no-img-element */
type Variant = "horizontal-ivory" | "horizontal-ink" | "stacked-ivory";

const files: Record<Variant, { src: string; w: number; h: number }> = {
  "horizontal-ivory": { src: "/brand/lockup-horizontal-ivory.svg", w: 800, h: 212 },
  "horizontal-ink": { src: "/brand/lockup-horizontal-ink.svg", w: 800, h: 212 },
  "stacked-ivory": { src: "/brand/lockup-stacked-ivory.svg", w: 576, h: 392 },
};

export function Logo({ variant = "horizontal-ivory", className = "h-16" }: { variant?: Variant; className?: string }) {
  const f = files[variant];
  return <img src={f.src} width={f.w} height={f.h} alt="Structure and Sky Studios" className={`${className} w-auto`} />;
}
