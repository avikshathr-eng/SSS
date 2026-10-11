"use client";

import { useState } from "react";

export function ChecklistCapture() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const fd = new FormData(e.currentTarget);
    fd.set("kind", "checklist");
    try {
      const res = await fetch("/api/quote", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not save your email.");
      setState("ok");
      setMsg(data.message);
    } catch (err) {
      setState("error");
      setMsg(err instanceof Error ? err.message : "Could not save your email.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <p className="t-h3">Pre-construction media checklist</p>
      <div className="mt-5 flex items-end gap-4">
        <div className="flex-1">
          <label className="sr-only" htmlFor="cl-email">
            Email address
          </label>
          <input id="cl-email" name="email" type="email" required placeholder="Your email" className="field" />
        </div>
        <button className="btn !min-h-12 !px-5" disabled={state === "sending"}>
          {state === "sending" ? "Sending" : "Send"}
        </button>
      </div>
      <p role="status" className={`mt-3 text-sm ${state === "error" ? "text-red-300" : "text-stone"}`}>
        {msg}
      </p>
    </form>
  );
}
