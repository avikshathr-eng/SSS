import type { Metadata } from "next";
import Link from "next/link";
import { Method } from "@/components/Method";
import { byN } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Process",
  description: "How a plan set or BIM model becomes final renders and film: brief, model, clay approval, materials and light, review, aerial and delivery.",
};

const rules = [
  { t: "Two review rounds", d: "Feedback lives in one review tool, pinned to frames." },
  { t: "Change orders, not surprises", d: "Design changes after model lock are priced before we start." },
  { t: "Your date leads", d: "We plan backwards from your sales launch or submission." },
  { t: "NDA on request", d: "Secure transfer for unreleased projects." },
];

export default function ProcessPage() {
  return (
    <>
      <section className="on-umber section !pt-[11rem]">
        <div className="wrap">
          <h1 className="t-display">Process</h1>
          <p className="t-lede muted mt-8">Seven steps, shown on real projects.</p>
        </div>
      </section>

      <section className="on-bone section">
        <div className="wrap">
          <Method film={byN(28).videos[0]} />
        </div>
      </section>

      <section className="on-umber-2 section">
        <div className="wrap">
          <h2 className="t-h1">Our rules</h2>
          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {rules.map((r) => (
              <li key={r.t} className="hair-top pt-6">
                <h3 className="t-h3">{r.t}</h3>
                <p className="muted mt-3 text-[0.95rem]">{r.d}</p>
              </li>
            ))}
          </ul>
          <div className="mt-20">
            <Link href="/submit-your-plan" className="btn btn-solid">
              Start with your plan
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
