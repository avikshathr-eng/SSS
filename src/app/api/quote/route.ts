import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const MAX_FILE = 25 * 1024 * 1024;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Lead intake. No email or CRM service is connected yet, so this validates the
 * submission and, in development only, writes it to .leads/ (git-ignored).
 * It reports honestly that nothing was delivered.
 * TODO(owner): connect Resend / HubSpot / Formspree here, then flip `delivered`.
 */
export async function POST(req: Request) {
  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return Response.json({ error: "The form could not be read. Try again." }, { status: 400 });
  }

  const email = String(fd.get("email") ?? "").trim();
  const kind = String(fd.get("kind") ?? "quote");
  if (!EMAIL.test(email)) {
    return Response.json({ error: "Enter a valid email address, for example name@company.com." }, { status: 422 });
  }
  if (kind === "quote" && !String(fd.get("name") ?? "").trim()) {
    return Response.json({ error: "Enter your name so we know who to reply to." }, { status: 422 });
  }

  const files = fd.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.some((f) => f.size > MAX_FILE)) {
    return Response.json(
      { error: "One file is over 25 MB. Remove it and describe it in the notes; we will send a secure transfer link." },
      { status: 413 },
    );
  }

  const record = {
    at: new Date().toISOString(),
    kind,
    email,
    name: fd.get("name"),
    company: fd.get("company"),
    role: fd.get("role"),
    location: fd.get("location"),
    date: fd.get("date"),
    deliverables: fd.getAll("deliverables"),
    notes: fd.get("notes"),
    nda: fd.get("nda") === "on",
    files: files.map((f) => ({ name: f.name, bytes: f.size })),
  };

  const delivered = false;
  if (process.env.NODE_ENV !== "production") {
    const dir = path.join(process.cwd(), ".leads");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "leads.jsonl"), JSON.stringify(record) + "\n");
  }

  const message = delivered
    ? "We will reply with a scoped quote and schedule."
    : "Preview mode: your submission was checked but not delivered, because no email or CRM service is connected to this site yet.";
  return Response.json({ ok: true, delivered, message });
}
