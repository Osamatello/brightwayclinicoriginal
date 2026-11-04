import { NextResponse } from "next/server";

// Form enquiries go to a Telegram chat until there is a proper CRM (plan D4, Osama 2026-11-04).
// Needs TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID (.env.local locally, Vercel env vars online). Enquiries are never logged or stored here.

const FIELDS: { name: string; label: string; max: number }[] = [
  { name: "name", label: "Name", max: 120 },
  { name: "fname", label: "First name", max: 80 },
  { name: "lname", label: "Last name", max: 80 },
  { name: "phone", label: "Phone", max: 40 },
  { name: "email", label: "Email", max: 160 },
  { name: "position", label: "Position", max: 160 },
  { name: "missing", label: "Teeth to replace", max: 80 },
  { name: "message", label: "Message", max: 2000 },
];

const reply = (status: number) => NextResponse.json({ ok: status === 200 }, { status });

function fromAnotherSite(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}

export async function POST(req: Request) {
  if (fromAnotherSite(req)) return reply(403);

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return reply(400);
  }
  if (!data || typeof data !== "object") return reply(400);

  // Hidden field only bots fill in: pretend it worked and send nothing
  if (data.website) return reply(200);

  const text = (name: string, max: number) => (typeof data[name] === "string" ? data[name].trim().slice(0, max) : "");
  if (!text("phone", 40) || !(text("name", 120) || text("fname", 80))) return reply(400);

  const lines = FIELDS.flatMap((f) => {
    const value = text(f.name, f.max);
    return value ? [`${f.label}: ${value}`] : [];
  });
  const message = [`New enquiry from ${text("page", 200) || "the website"}`, "", ...lines].join("\n");

  // trim: a space pasted into the Vercel value makes Telegram refuse the request
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) {
    console.error("Lead form: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
    return reply(503);
  }

  try {
    // Plain text on purpose (no parse_mode), so nothing a visitor types is treated as formatting
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      // Telegram's reason only (e.g. "chat not found"), never the enquiry itself
      const reason = await res.json().then((r) => r.description, () => "");
      console.error(`Lead form: Telegram answered ${res.status} ${reason}`);
      return reply(502);
    }
  } catch {
    console.error("Lead form: could not reach Telegram");
    return reply(502);
  }
  return reply(200);
}
