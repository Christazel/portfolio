import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export const dynamic = "force-dynamic";

// In-memory rate limiting: max 5 requests per 60 seconds per IP
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    if (rateLimitMap.size > 1000) {
      for (const [key, val] of rateLimitMap.entries()) {
        if (now > val.expiresAt) rateLimitMap.delete(key);
      }
    }
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

function sanitizeInput(text: string): string {
  return text
    // Remove non-printable / control ASCII characters
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    // Strip raw HTML tags to prevent storing script or HTML injection
    .replace(/<[^>]*>?/gm, "")
    .trim();
}

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ data: [], message: "Comments are temporarily unavailable." });
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
    return NextResponse.json({ data: data ?? [] });
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

  try {
    const body = await req.json().catch(() => null);

    // Honeypot check: if bot filled hidden website field, reject silently
    if (body?.website) {
      return NextResponse.json({ message: "Komentar berhasil dikirim." }, { status: 200 });
    }

    const forwarded = req.headers.get("x-forwarded-for");
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(clientIp)) {
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
