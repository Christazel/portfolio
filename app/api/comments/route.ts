import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ data: [], message: "Comments are temporarily unavailable." });
  }

  const { data, error } = await supabase
    .from("comments")
    .select("id,name,message,created_at")
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) {
    return NextResponse.json({ data: [], message: "Comments are temporarily unavailable." });
  }
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  if (!supabase) {
    return NextResponse.json(
      { message: "Comments service is temporarily unavailable." },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => null);

  const name = String(body?.name ?? "").trim();
  const message = String(body?.message ?? "").trim();

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
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  return NextResponse.json({ data }, { status: 201 });
}
