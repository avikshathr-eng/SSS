import Link from "next/link";

export default function NotFound() {
  return (
    <section className="on-umber section !pt-[12rem]">
      <div className="wrap">
        <h1 className="t-display">Not here.</h1>
        <div className="mt-14 flex gap-4">
          <Link href="/work" className="btn btn-solid">See the work</Link>
          <Link href="/" className="btn">Home</Link>
        </div>
      </div>
    </section>
  );
}
