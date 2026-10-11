import Image from "next/image";
import Link from "next/link";
import { BookLink } from "@/components/BookLink";
import { Method } from "@/components/Method";
import { PanoTour } from "@/components/PanoTour";
import { PinnedHero } from "@/components/PinnedHero";
import { Placeholder } from "@/components/Placeholder";
import { VideoPlayer } from "@/components/VideoPlayer";
import { WorkReel } from "@/components/WorkReel";
import { byN, featured, totalProjects } from "@/lib/projects";

const promises = [
  { t: "One producer", d: "One person, one thread, start to finish." },
  { t: "Your date leads", d: "We schedule backwards from your launch." },
  { t: "Views locked early", d: "You approve the cameras before polish." },
  { t: "NDA on request", d: "Unreleased projects stay private." },
];

const services = [
  { t: "Renders", d: "Exterior and interior stills.", img: byN(27).images[2] },
  { t: "Walkthroughs", d: "Camera paths through the unbuilt.", img: byN(28).images[4] },
  { t: "Aerial", d: "The building, placed in its real site.", img: byN(7).images[6] },
  { t: "Interactive", d: "360° and real-time tours.", img: byN(8).images[1] },
];

export default function Home() {
  const reel = byN(28).videos[0];
  return (
    <>
      <PinnedHero />

      {/* Statement and promises */}
      <section className="on-bone section">
        <div className="wrap">
          <p className="t-h1 max-w-[20ch]">One studio, from the first line to the final frame.</p>
          <ul className="hair-top mt-24 grid gap-x-10 gap-y-10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((p) => (
              <li key={p.t}>
                <h3 className="t-h3">{p.t}</h3>
                <p className="muted mt-2 max-w-[26ch] text-[0.95rem]">{p.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How we work */}
      <section className="on-bone hair-top pb-[clamp(5rem,11vw,11rem)] pt-[clamp(4rem,8vw,8rem)]">
        <div className="wrap">
          <Method film={reel} />
        </div>
      </section>

      {/* Work */}
      <section className="on-umber section !pr-0">
        <div className="wrap flex flex-wrap items-end justify-between gap-6 !pr-[clamp(1.25rem,4.2vw,5rem)]">
          <h2 className="t-h1">Work</h2>
          <Link href="/work" className="link-u pb-2 text-lg">
            All {totalProjects} projects
          </Link>
        </div>
        <div className="mt-16">
          <WorkReel items={featured} />
        </div>
      </section>

      {/* Film */}
      {reel && (
        <section className="on-umber-2 section">
          <div className="wrap">
            <h2 className="t-h1">Film</h2>
            <div className="mt-14">
              <VideoPlayer src={reel.src} poster={reel.poster} title="Flex office and warehouse park film" />
            </div>
          </div>
        </section>
      )}

      {/* Services */}
      <section className="on-bone section">
        <div className="wrap">
          <h2 className="t-h1">Services</h2>
          <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <li key={s.t}>
                <Link href="/services" className="group relative block aspect-[3/4] overflow-hidden bg-umber-3 text-bone">
                  <Image src={s.img.src} alt="" fill sizes="(min-width:1024px) 23vw, (min-width:640px) 46vw, 95vw" className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]" />
                  <span className="absolute inset-0 bg-gradient-to-t from-umber/85 via-umber/10 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-7">
                    <span className="t-h3 block">{s.t}</span>
                    <span className="mt-1 block translate-y-2 text-[0.95rem] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-90 max-lg:translate-y-0 max-lg:opacity-90">{s.d}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 360 */}
      <section className="on-umber section">
        <div className="wrap">
          <h2 className="t-h1">Step inside</h2>
          <div className="mt-14">
            <PanoTour />
          </div>
        </div>
      </section>

      {/* Trust (placeholders until real proof is supplied) */}
      <section className="on-bone section">
        <div className="wrap">
          <h2 className="t-h1">Trusted by</h2>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            <Placeholder title="Client logos" />
            <Placeholder title="One testimonial" />
            <Placeholder title="One case study, with numbers" />
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="on-umber relative isolate overflow-hidden section">
        <Image src={byN(27).images[0].src} alt="" fill sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-umber/70" />
        <div className="wrap">
          <p className="t-display max-w-[10ch]">Send us your plan.</p>
          <div className="mt-14 flex flex-wrap gap-4">
            <Link href="/submit-your-plan" className="btn btn-solid">
              Submit your plan
            </Link>
            <BookLink className="btn text-bone" />
          </div>
        </div>
      </section>
    </>
  );
}
