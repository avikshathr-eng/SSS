import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Placeholder } from "@/components/Placeholder";
import { byN } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Studio",
  description: "Why Structure and Sky Studios exists, how we work and the tools behind our renders, walkthroughs and aerial films.",
};

const stack = [
  ["Models in", "Revit, SketchUp, Rhino, ArchiCAD, 3ds Max, DWG"],
  ["Stills", "V-Ray, Corona, D5 Render, Lumion"],
  ["Animation and tours", "Unreal Engine 5"],
  ["Finishing", "Photoshop, After Effects, DaVinci Resolve, Premiere Pro"],
  ["Review", "Frame.io, Filestage, Pastel, Ziflow"],
];

export default function AboutPage() {
  return (
    <>
      <section className="on-umber section !pt-[11rem]">
        <div className="wrap">
          <h1 className="t-display max-w-[12ch]">Studio</h1>
          <p className="t-h1 mt-20 max-w-[22ch]">Developers hire four vendors to launch one project. We became the one.</p>
        </div>
      </section>

      <section className="on-umber relative h-[70svh] min-h-[28rem]">
        <Image src={byN(28).images[0].src} alt="Render of a flex office and warehouse park" fill sizes="100vw" className="object-cover" />
      </section>

      <section className="on-bone section">
        <div className="wrap grid gap-16 lg:grid-cols-3">
          <div>
            <h2 className="t-h3">What we do</h2>
            <p className="muted mt-3 max-w-[30ch]">We turn plan sets and BIM models into renders, film and tours that move buyers, lenders and planning boards.</p>
          </div>
          <div>
            <h2 className="t-h3">What makes us different</h2>
            <p className="muted mt-3 max-w-[30ch]">We own the story and the on-site capture, and we can show what does not exist yet.</p>
          </div>
          <div>
            <h2 className="t-h3">Where</h2>
            <p className="muted mt-3 max-w-[30ch]">Projects across the United States and Canada.</p>
          </div>
        </div>
      </section>

      <section className="on-bone hair-top section">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_2fr]">
          <h2 className="t-h1">Tools</h2>
          <dl>
            {stack.map(([k, v]) => (
              <div key={k} className="hair-top grid gap-2 py-5 sm:grid-cols-[1fr_2fr]">
                <dt className="muted">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="on-umber-2 section">
        <div className="wrap grid gap-5 lg:grid-cols-2">
          <Placeholder title="Founder and team" />
          <Placeholder title="Certifications and insurance" />
        </div>
        <div className="wrap mt-20">
          <Link href="/submit-your-plan" className="btn btn-solid">
            Submit your plan
          </Link>
        </div>
      </section>
    </>
  );
}
