import Link from "next/link";
import { site, nav } from "@/lib/site";
import { Logo } from "./Logo";
import { ChecklistCapture } from "./ChecklistCapture";

const ph = "border border-dashed border-brass/70 px-2 text-xs";

export function Footer() {
  return (
    <footer className="on-umber-2">
      <div className="wrap grid gap-16 pb-12 pt-24 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Logo variant="stacked-ivory" className="h-44 lg:h-56" />
          <div className="mt-14 max-w-md">
            <ChecklistCapture />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 self-end text-[0.95rem]">
          <ul className="space-y-3">
            {[...nav, { href: "/contact", label: "Contact" }].map((i) => (
              <li key={i.href}>
                <Link className="link-u" href={i.href}>
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-3">
            <li>
              <Link className="link-u" href="/submit-your-plan">
                Submit your plan
              </Link>
            </li>
            <li>
              <Link className="link-u" href="/submit-your-plan?path=owner">
                Homeowners
              </Link>
            </li>
            <li>
              {site.email ? (
                <a className="link-u" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              ) : (
                <span className={ph}>email: placeholder</span>
              )}
            </li>
            <li>
              {site.phone ? (
                <a className="link-u" href={`tel:${site.phone}`}>
                  {site.phone}
                </a>
              ) : (
                <span className={ph}>phone: placeholder</span>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap hair-top flex flex-wrap justify-between gap-3 py-6 text-xs text-stone">
        <p>© {new Date().getFullYear()} Structure and Sky Studios</p>
        <p>United States and Canada</p>
      </div>
    </footer>
  );
}
