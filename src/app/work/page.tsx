import type { Metadata } from "next";
import { WorkExplorer } from "@/components/WorkExplorer";

export const metadata: Metadata = {
  title: "Work",
  description: "Architectural renders, aerials, interiors and film across hospitality, retail, residential and commercial projects.",
};

export default function WorkPage() {
  return (
    <section className="on-umber section !pt-[11rem]">
      <div className="wrap">
        <h1 className="t-display">Work</h1>
        <div className="mt-20">
          <WorkExplorer />
        </div>
      </div>
    </section>
  );
}
