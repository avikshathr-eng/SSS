import type { Metadata } from "next";
import Link from "next/link";
import { BookLink } from "@/components/BookLink";
import { Placeholder } from "@/components/Placeholder";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a discovery call or send your plans to Structure and Sky Studios.",
};

export default function ContactPage() {
  return (
    <section className="on-umber section !pt-[11rem]">
      <div className="wrap">
        <h1 className="t-display">Contact</h1>
        <div className="mt-20 grid gap-px bg-[var(--line-dark)] lg:grid-cols-2">
          <div className="bg-umber p-10 lg:p-14">
            <h2 className="t-h2">Have plans?</h2>
            <Link href="/submit-your-plan" className="btn btn-solid mt-10">
              Submit your plan
            </Link>
          </div>
          <div className="bg-umber p-10 lg:p-14">
            <h2 className="t-h2">Want to talk first?</h2>
            {site.bookingUrl ? (
              <BookLink className="btn mt-10" />
            ) : (
              <Placeholder className="mt-10" title="Booking calendar">
                Add a booking link to <code>site.bookingUrl</code>.
              </Placeholder>
            )}
          </div>
        </div>
        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {site.email ? (
            <a className="link-u t-h3 w-fit" href={`mailto:${site.email}`}>{site.email}</a>
          ) : (
            <Placeholder title="Email address" />
          )}
          {site.phone ? (
            <a className="link-u t-h3 w-fit" href={`tel:${site.phone}`}>{site.phone}</a>
          ) : (
            <Placeholder title="Phone number" />
          )}
        </div>
      </div>
    </section>
  );
}
