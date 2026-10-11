"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  const path = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > (path === "/" ? window.innerHeight * 3.3 : 40));
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [path]);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    return () => document.documentElement.classList.remove("lenis-stopped");
  }, [open]);

  return (
    <header
      className={`hdr fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,height,color] duration-500 ${
        solid || open ? "is-solid bg-umber/88 backdrop-blur-xl" : ""
      }`}
    >
      <div
        className={`wrap flex items-center justify-between transition-[height] duration-500 ${
          solid ? "h-[4.75rem]" : "h-[6.25rem]"
        }`}
      >
        <Link href="/" aria-label="Structure and Sky Studios home" className="block">
          <Logo className={`logo-ivory transition-[height] duration-500 ${solid ? "h-12" : "h-[4.25rem]"}`} />
          <Logo variant="horizontal-ink" className={`logo-ink hidden transition-[height] duration-500 ${solid ? "h-12" : "h-[4.25rem]"}`} />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-12 lg:flex">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              aria-current={path.startsWith(i.href) ? "page" : undefined}
              className="nav-link link-u text-[0.95rem] hover:text-brass-hi aria-[current=page]:text-brass-hi"
            >
              {i.label}
            </Link>
          ))}
          <Link href="/submit-your-plan" className="nav-cta btn !min-h-12 !px-6">
            Submit your plan
          </Link>
        </nav>

        <button
          className="grid size-12 place-items-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-8">
            <span className={`absolute left-0 h-px w-8 bg-bone transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-px w-8 bg-bone transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="wrap flex h-[calc(100svh-4.75rem)] flex-col justify-between pb-10 pt-6 lg:hidden"
        >
          <div className="flex flex-col">
            {nav.map((i) => (
              <Link key={i.href} href={i.href} className="t-h2 border-b border-line-dark py-5" style={{ borderColor: "var(--line-dark)" }}>
                {i.label}
              </Link>
            ))}
          </div>
          <Link href="/submit-your-plan" className="btn btn-solid">
            Submit your plan
          </Link>
        </nav>
      )}
    </header>
  );
}
