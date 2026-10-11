import Link from "next/link";
import { site } from "@/lib/site";

/** Discovery-call CTA. Falls back to the contact page until a booking URL exists. */
export function BookLink({
  className = "btn btn-ghost",
  children = "Book a discovery call",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  if (site.bookingUrl) {
    return (
      <a href={site.bookingUrl} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href="/contact" className={className}>
      {children}
    </Link>
  );
}
