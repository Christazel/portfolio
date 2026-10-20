import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export const dynamic = "force-dynamic";

// In-memory rate limiting map
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(key: string, maxRequests: number, windowMs = 60_000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.expiresAt) {
    rateLimitMap.set(key, { count: 1, expiresAt: now + windowMs });
    if (rateLimitMap.size > 1000) {
      for (const [k, val] of rateLimitMap.entries()) {
        if (now > val.expiresAt) rateLimitMap.delete(k);
      }
    }
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count += 1;
  return false;
}

function getClientIp(req: Request): string {
  return (
    req.headers.get("x-real-ip")?.trim() ||
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "127.0.0.1"
  );
}

function sanitizeInput(text: string): string {
  return (
    text
      // Remove non-printable / control ASCII characters
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
      // Strip raw HTML tags to prevent storing script or HTML injection
      .replace(/<[^>]*>?/gm, "")
      // Collapse excessive consecutive newlines to prevent UI visual DoS
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

const ALLOWED_ORIGINS = [
  "https://christazel.vercel.app",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

export async function GET(req: Request) {
  if (!supabase) {
    return NextResponse.json({ data: [], message: "Comments are temporarily unavailable." });
  }

  // Rate limiting on GET: max 60 requests per minute per IP
  const clientIp = getClientIp(req);
  if (isRateLimited(`GET:${clientIp}`, 60, 60_000)) {
    return NextResponse.json(
      { message: "Terlalu banyak permintaan. Silakan coba lagi beberapa saat." },
      { status: 429 }
    );
  }

  try {
    const { data, error } = await supabase
      .from("comments")
      .select("id,name,message,created_at")
      .order("created_at", { ascending: false })
      .limit(30);

    if (error) {
      return NextResponse.json({ data: [], message: "Comments are temporarily unavailable." });
    }

    return NextResponse.json(
      { data: data ?? [] },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (err) {
    console.error("Error fetching comments:", err);
    return NextResponse.json(
      { data: [], message: "Comments are temporarily unavailable." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  if (!supabase) {
    return NextResponse.json(
      { message: "Comments service is temporarily unavailable." },
      { status: 503 }
    );
  }

  // Cross-origin request validation (CSRF / Cross-Site POST protection)
  const secFetchSite = req.headers.get("sec-fetch-site");
  if (secFetchSite === "cross-site") {
    return NextResponse.json({ message: "Cross-site requests are not allowed." }, { status: 403 });
  }

  const origin = req.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed))) {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  }

  // Strict Content-Type enforcement
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { message: "Content-Type must be application/json." },
      { status: 415 }
    );
  }

  // Anti-DoS payload size guard: maximum 15 KB
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 15_000) {
    return NextResponse.json({ message: "Ukuran permintaan terlalu besar." }, { status: 413 });
  }

  try {
    const body = await req.json().catch(() => null);

    // Honeypot check: if bot filled hidden website field, reject silently
    if (body?.website) {
      return NextResponse.json({ message: "Komentar berhasil dikirim." }, { status: 200 });
    }

    const clientIp = getClientIp(req);

    // Rate limiting on POST: max 5 requests per 60 seconds per IP
    if (isRateLimited(`POST:${clientIp}`, 5, 60_000)) {
      return NextResponse.json(
        { message: "Terlalu banyak permintaan. Silakan coba lagi beberapa saat." },
        { status: 429 }
      );
    }

    const name = sanitizeInput(String(body?.name ?? ""));
    const message = sanitizeInput(String(body?.message ?? ""));

    if (name.length < 2 || name.length > 40) {
      return NextResponse.json({ message: "Nama 2–40 karakter." }, { status: 400 });
    }
    if (message.length < 3 || message.length > 400) {
      return NextResponse.json({ message: "Komentar 3–400 karakter." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("comments")
      .insert([{ name, message }])
      .select("id,name,message,created_at")
      .single();

    if (error) {
      console.error("Supabase insert comment error:", error);
      return NextResponse.json(
        { message: "Failed to submit comment. Please try again later." },
        { status: 500 }
      );
    }
    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    console.error("Error submitting comment:", err);
    return NextResponse.json(
      { message: "Failed to submit comment. Please try again later." },
      { status: 500 }
    );
  }
}
