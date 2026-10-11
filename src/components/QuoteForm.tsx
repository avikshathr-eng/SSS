"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { audiences, deliverables } from "@/lib/site";

const ACCEPT = ".pdf,.dwg,.dxf,.rvt,.skp,.3dm,.pln,.ifc,.zip,.jpg,.jpeg,.png";

export function QuoteForm() {
  const params = useSearchParams();
  const pathParam = params.get("path");
  const [role, setRole] = useState(pathParam === "owner" ? "owner" : "developer");
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const isOwner = role === "owner" || role === "builder";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setMsg("");
    const fd = new FormData(e.currentTarget);
    fd.set("kind", "quote");
    try {
      const res = await fetch("/api/quote", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Check the highlighted fields and try again.");
      setState("ok");
      setMsg(data.message);
    } catch (err) {
      setState("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  }

  if (state === "ok") {
    return (
      <div role="status" className="border border-brass p-8">
        <p className="h3">Plan received</p>
        <p className="prose-sss mt-3">{msg}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6" encType="multipart/form-data">
      <fieldset className="grid gap-6 sm:grid-cols-2">
        <legend className="sr-only">About you</legend>
        <div>
          <label className="label" htmlFor="name">Your name</label>
          <input id="name" name="name" required autoComplete="name" className="field" />
        </div>
        <div>
          <label className="label" htmlFor="email">Work email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className="field" />
        </div>
        <div>
          <label className="label" htmlFor="company">Company</label>
          <input id="company" name="company" autoComplete="organization" className="field" />
        </div>
        <div>
          <label className="label" htmlFor="role">I am a</label>
          <select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)} className="field">
            {audiences.map((a) => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset className="grid gap-6 sm:grid-cols-2">
        <legend className="sr-only">Project</legend>
        <div>
          <label className="label" htmlFor="location">Project city and state or province</label>
          <input id="location" name="location" required placeholder="Austin, TX" className="field" />
        </div>
        <div>
          <label className="label" htmlFor="date">{isOwner ? "When do you need it?" : "Sales launch or submission date"}</label>
          <input id="date" name="date" type="date" className="field" />
          <p className="hint mt-1">{isOwner ? "Optional." : "We schedule backwards from this date."}</p>
        </div>
      </fieldset>

      <fieldset>
        <legend className="label">What do you need?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {deliverables.map((d) => (
            <label key={d} className="flex min-h-11 cursor-pointer items-center gap-3 border border-[var(--line-dark)] px-4 py-2 text-sm has-[:checked]:border-brass has-[:checked]:bg-brass/10">
              <input type="checkbox" name="deliverables" value={d} defaultChecked={params.getAll("d").includes(d)} className="size-4 accent-[var(--brass)]" />
              {d}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className="label" htmlFor="files">Plans and models</label>
        <input
          id="files"
          name="files"
          type="file"
          multiple
          accept={ACCEPT}
          onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
          className="field !p-2 file:mr-4 file:border-0 file:bg-brass file:px-4 file:py-2 file:font-medium file:text-umber"
        />
        <p className="hint mt-1">
          PDF, DWG, DXF, RVT, SKP, 3DM, PLN, IFC, images or a ZIP. For files over 25 MB, describe them below and we will send a secure transfer link.
        </p>
        {files.length > 0 && <p className="hint mt-1">{files.length} file{files.length > 1 ? "s" : ""} selected</p>}
      </div>

      <div>
        <label className="label" htmlFor="notes">Anything we should know</label>
        <textarea id="notes" name="notes" rows={4} className="field" placeholder="Finish schedule, camera views you need, sun orientation, target buyer." />
      </div>

      <label className="flex items-start gap-3 text-sm text-stone">
        <input type="checkbox" name="nda" className="mt-1 size-4 accent-[var(--brass)]" />
        I need an NDA before sending files.
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button className="btn btn-solid" disabled={state === "sending"}>
          {state === "sending" ? "Sending plan" : "Send plan for a quote"}
        </button>
        <p className="hint">We reply with a scoped quote and schedule. No spam, no cold follow-up sequences.</p>
      </div>
      {state === "error" && (
        <p role="alert" className="text-sm text-red-300">{msg}</p>
      )}
    </form>
  );
}
