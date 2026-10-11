import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Submit your plan",
  description: "Upload plans, CAD or a BIM model and get a scoped quote and schedule from Structure and Sky Studios.",
};

export default function SubmitPage() {
  return (
    <section className="on-umber section !pt-[11rem]">
      <div className="wrap grid gap-20 lg:grid-cols-[1fr_1.25fr]">
        <div>
          <h1 className="t-display">Send your plan.</h1>
          <ol className="mt-16 space-y-5">
            {["Send what you have.", "We scope it.", "You approve the quote."].map((t, i) => (
              <li key={t} className="flex items-baseline gap-5">
                <span className="font-serif text-3xl text-brass-hi">{i + 1}</span>
                <span className="text-lg">{t}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <Suspense>
            <QuoteForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
