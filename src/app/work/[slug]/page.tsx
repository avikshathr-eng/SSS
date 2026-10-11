import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { VideoPlayer } from "@/components/VideoPlayer";
import { bySlug, categoryLabels, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: `${p.title}${p.place ? ", " + p.place : ""}: architectural renders${p.videos.length ? " and film" : ""} by Structure and Sky Studios.`,
    openGraph: { images: [{ url: p.images[0].src, width: p.images[0].w, height: p.images[0].h }] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  const hero = p.images[0];
  const rest = p.images.slice(1);

  return (
    <>
      <section className="on-umber relative isolate flex min-h-[88svh] items-end overflow-hidden">
        <Image src={hero.src} alt={`${p.title}, hero render`} fill priority sizes="100vw" quality={75} placeholder={hero.blur ? "blur" : "empty"} blurDataURL={hero.blur} className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-umber via-umber/25 to-umber/35" />
        <div className="wrap pb-14 pt-48 md:pb-20">
          <h1 className="t-display lift max-w-[14ch]">{p.title}</h1>
          <p className="lift mt-8 text-lg text-bone/85" style={{ animationDelay: "0.25s" }}>
            {categoryLabels[p.category]}
            {p.place ? `, ${p.place}` : ""}
          </p>
        </div>
      </section>

      <section className="on-umber pb-[clamp(5rem,10vw,10rem)]">
        <div className="wrap">
          {rest.length > 0 && <Gallery images={rest} title={p.title} />}
        </div>
      </section>

      {p.videos.length > 0 && (
        <section className="on-umber-2 section">
          <div className="wrap">
            <h2 className="t-h1">Film</h2>
            <div className={`mt-14 grid gap-6 ${p.videos.length > 1 ? "md:grid-cols-2" : ""}`}>
              {p.videos.map((v, i) => (
                <VideoPlayer key={v.src} src={v.src} poster={v.poster} title={`${p.title}, film ${i + 1}`} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="on-bone section">
        <div className="wrap grid gap-16 md:grid-cols-2 md:items-end">
          <div>
            <h2 className="t-h1 max-w-[10ch]">Have a project like this?</h2>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link href="/submit-your-plan" className="btn btn-solid">
                Submit your plan
              </Link>
            </div>
          </div>
          <Link href={`/work/${next.slug}`} className="group md:text-right">
            <span className="muted text-sm">Next</span>
            <span className="t-h1 mt-2 block transition-colors group-hover:text-brass-ink">{next.title}</span>
          </Link>
        </div>
      </section>
    </>
  );
}
