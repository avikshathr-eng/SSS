import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { byN } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Services",
  description: "Renders, walkthroughs, aerial capture, sales films and interactive tours, in three packages or à la carte.",
};

const tiers = [
  {
    name: "Essential",
    who: "Architects, custom builders, small infill projects",
    time: "7 to 10 business days",
    items: ["2 exterior renders", "2 interior renders", "2 revision rounds"],
  },
  {
    name: "Professional",
    who: "Developer launches and brokerage campaigns",
    time: "3 to 4 weeks",
    items: ["4 exterior renders, day and dusk", "4 to 6 interiors", "45 to 60 second walkthrough", "Site shoot with massing overlay", "60 second reel and 3 social cuts"],
  },
  {
    name: "Enterprise",
    who: "Condo, master-planned and mixed-use projects",
    time: "6 to 10 weeks, phased",
    items: ["6 to 10 exteriors with aerial composites", "10 to 16 interiors", "90 to 180 second film", "Interactive tour", "Shoots across construction stages"],
  },
];

const carte = ["Exterior stills", "Interior stills", "Walkthrough animation", "Interactive tour", "Drone photo and video", "Promotional film", "Virtual staging", "3D floor plan"];

export default function ServicesPage() {
  return (
    <>
      <section className="on-umber section !pt-[11rem]">
        <div className="wrap">
          <h1 className="t-display">Services</h1>
          <p className="t-lede muted mt-8">Three packages, or build your own. Pricing is set by quote, after we see your plans.</p>
        </div>
      </section>

      <section className="on-bone pb-[clamp(5rem,10vw,10rem)] pt-4">
        <div className="wrap">
          <ul>
            {tiers.map((t) => (
              <li key={t.name} className="hair-top grid gap-8 py-14 lg:grid-cols-[1.1fr_1fr_1.2fr] lg:gap-16">
                <div>
                  <h2 className="t-h1">{t.name}</h2>
                  <p className="muted mt-4 max-w-[28ch]">{t.who}</p>
                </div>
                <ul className="space-y-2 pt-3">
                  {t.items.map((i) => (
                    <li key={i} className="flex gap-4">
                      <span aria-hidden className="mt-[0.7em] h-px w-5 shrink-0 bg-brass-ink" />
                      {i}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col items-start justify-between gap-8 pt-3">
                  <p>
                    <span className="muted">Typical schedule </span>
                    {t.time}
                  </p>
                  <Link href="/submit-your-plan" className="btn btn-solid">
                    Request a quote
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-umber relative isolate overflow-hidden">
        <div className="relative aspect-[21/9] min-h-[22rem]">
          <Image src={byN(7).images[6].src} alt="Aerial render of a courtyard hotel" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-umber/45" />
          <div className="wrap absolute inset-0 flex items-end pb-12">
            <p className="t-h1 max-w-[16ch]">Aerial plates, shot from your 3D cameras.</p>
          </div>
        </div>
      </section>

      <section className="on-bone section">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_2fr]">
          <h2 className="t-h1">À la carte</h2>
          <ul className="grid gap-x-12 sm:grid-cols-2">
            {carte.map((c) => (
              <li key={c} className="hair-top py-5 text-xl">
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="wrap mt-20">
          <p className="muted max-w-[52ch]">Developers with several projects can move to a monthly retainer after their first project: a credit bank, a priority queue and a dedicated producer.</p>
        </div>
      </section>
    </>
  );
}
