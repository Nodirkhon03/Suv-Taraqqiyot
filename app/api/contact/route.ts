import { NextResponse } from "next/server";

// nodemailer requires the Node.js runtime (not edge).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

const FALLBACK_EMAIL = "info@suv-taraqqiyot.com";

function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const name = sanitize(String(body.name || "")).slice(0, 100);
    const email = sanitize(String(body.email || "")).slice(0, 150);
    const phone = sanitize(String(body.phone || "")).slice(0, 50);
    const company = sanitize(String(body.company || "")).slice(0, 150);
    const message = sanitize(String(body.message || "")).slice(0, 4000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Verify SMTP is configured before attempting to send. Without this, a
    // missing password produces a confusing 500. Configure these in Vercel →
    // Project → Settings → Environment Variables (see .env.example).
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!host || !user || !pass) {
      console.error(
        "[contact] SMTP not configured. Missing:",
        [
          !host && "SMTP_HOST",
          !user && "SMTP_USER",
          !pass && "SMTP_PASS",
        ]
          .filter(Boolean)
          .join(", ")
      );
      return NextResponse.json(
        {
          error:
            "Email service is temporarily unavailable. Please email us directly at " +
            (process.env.SMTP_TO || user || FALLBACK_EMAIL) +
            ".",
        },
        { status: 503 }
      );
    }

    const port = Number(process.env.SMTP_PORT || 465);
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // 465 = implicit TLS, 587 = STARTTLS
      auth: { user, pass },
    });

    const to = process.env.SMTP_TO || user || FALLBACK_EMAIL;
    const subject = company
      ? `Website inquiry — ${name} (${company})`
      : `Website inquiry — ${name}`;

    const textLines = [
      `Name:    ${name}`,
      `Email:   ${email}`,
      phone && `Phone:   ${phone}`,
      company && `Company: ${company}`,
      "",
      "Message:",
      message,
    ].filter(Boolean);

    const rows = [
      ["Name", name],
      ["Email", email],
      ...(phone ? [["Phone", phone]] : []),
      ...(company ? [["Company", company]] : []),
    ]
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 16px 6px 0;color:#64748b;font-size:13px">${k}</td><td style="padding:6px 0;color:#0F172A;font-size:14px;font-weight:500">${escapeHtml(
            v
          )}</td></tr>`
      )
      .join("");

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto">
        <div style="background:#0B2B43;padding:20px 24px;border-radius:12px 12px 0 0">
          <p style="margin:0;color:#fff;font-size:16px;font-weight:600">New website inquiry</p>
          <p style="margin:4px 0 0;color:#94a3b8;font-size:12px">SUV-TARAQQIYOT LLC — suv-taraqqiyot.com</p>
        </div>
        <div style="border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;padding:24px">
          <table style="border-collapse:collapse;width:100%">${rows}</table>
          <div style="margin-top:16px;padding-top:16px;border-top:1px solid #e2e8f0">
            <p style="margin:0 0 6px;color:#64748b;font-size:13px">Message</p>
            <p style="margin:0;color:#0F172A;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(
              message
            )}</p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"SUV-TARAQQIYOT Website" <${user}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject,
      text: textLines.join("\n"),
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact] Failed to send message:", error);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again later." },
      { status: 500 }
    );
  }
}
