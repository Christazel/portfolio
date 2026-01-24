"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type CommentItem = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

const MAX_LEN = 400;

function timeAgo(iso: string) {
  const ts = new Date(iso).getTime();
  const diff = Date.now() - ts;

  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;

  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;

  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;

  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

type ToastType = "success" | "error" | "info";

export default function CommentBox() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // honeypot (disembunyikan dari UI)
  const [website, setWebsite] = useState("");

  const [items, setItems] = useState<CommentItem[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [sending, setSending] = useState(false);

  const [toast, setToast] = useState<{ type: ToastType; text: string } | null>(null);
  const toastTimer = useRef<number | null>(null);

  const remaining = useMemo(() => MAX_LEN - message.length, [message.length]);

  const showToast = (type: ToastType, text: string) => {
    setToast({ type, text });
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2800);
  };

  const loadComments = useCallback(async () => {
    setLoadingList(true);
    try {
      const res = await fetch("/api/comments", { cache: "no-store" });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.message || "Gagal memuat komentar.");
      setItems(json.data || []);
    } catch (e: unknown) {
      const error = e instanceof Error ? e.message : "Gagal memuat komentar.";
      showToast("error", error);
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    loadComments();
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, [loadComments]);

  const submit = async () => {
    const n = name.trim();
    const m = message.trim();

    if (n.length < 2) return showToast("error", "Nama minimal 2 karakter.");
    if (n.length > 40) return showToast("error", "Nama maksimal 40 karakter.");
    if (m.length < 3) return showToast("error", "Komentar minimal 3 karakter.");
    if (m.length > MAX_LEN) return showToast("error", "Komentar terlalu panjang.");

    setSending(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // website = honeypot
        body: JSON.stringify({ name: n, message: m, website }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.message || "Gagal mengirim komentar.");

      setItems((prev) => [json.data, ...prev].slice(0, 30));
      setMessage("");
      showToast("success", "Komentar berhasil dikirim!");
    } catch (e: unknown) {
      const error = e instanceof Error ? e.message : "Gagal mengirim komentar.";
      showToast("error", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="neon-border">
      <div className="neon-card p-6 md:p-8 relative overflow-hidden">
        {/* Toast */}
        {toast && (
          <div
            className={[
              "absolute right-4 top-4 z-20 rounded-2xl border px-4 py-3 text-sm shadow-lg backdrop-blur",
              toast.type === "success" ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100" : "",
              toast.type === "error" ? "border-red-400/30 bg-red-500/10 text-red-100" : "",
              toast.type === "info" ? "border-white/15 bg-zinc-950/35 text-zinc-100" : "",
            ].join(" ")}
          >
            {toast.text}
          </div>
        )}

        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-zinc-100">Leave a comment</h3>
            <p className="mt-1 text-sm text-zinc-500">Feedback, pertanyaan, atau sekadar say hi.</p>
          </div>

          <button
            type="button"
            onClick={loadComments}
            className="btn-neon-ghost text-xs"
            disabled={loadingList}
            title="Refresh comments"
          >
            {loadingList ? "Loading..." : "Refresh"}
          </button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div>
            <label className="block text-xs text-zinc-500">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama kamu"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/35 px-4 py-3 text-sm text-zinc-100 outline-none
                         focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-400/10"
              autoComplete="name"
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-500">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, MAX_LEN))}
              placeholder="Tulis komentar..."
              rows={3}
              className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-zinc-950/35 px-4 py-3 text-sm text-zinc-100 outline-none
                         focus:border-purple-300/40 focus:ring-2 focus:ring-purple-400/10"
            />
            <div className="mt-1 flex items-center justify-between text-xs text-zinc-500">
              <span>{remaining} chars left</span>
              <span>Max {MAX_LEN}</span>
            </div>
          </div>
        </div>

        {/* Honeypot field (hidden) */}
        <input
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={submit}
            disabled={sending}
            className={`btn-neon ${sending ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {sending ? "Sending..." : "Send"}
          </button>

          <button
            type="button"
            onClick={() => {
              setName("");
              setMessage("");
              setWebsite("");
              showToast("info", "Form direset.");
            }}
            className="btn-neon-ghost"
          >
            Reset
          </button>
        </div>

        <div className="mt-6 border-t border-white/8 pt-5">
          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-500">Recent</p>
            <p className="text-xs text-zinc-500">{items.length}/30</p>
          </div>

          {loadingList ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-zinc-950/25 px-4 py-4 text-sm text-zinc-400">
              Loading comments...
            </div>
          ) : items.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-zinc-950/25 px-4 py-4 text-sm text-zinc-400">
              Belum ada komentar.
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {items.map((c) => (
                <div key={c.id} className="rounded-2xl border border-white/10 bg-zinc-950/25 px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-zinc-100">{c.name}</p>
                      <p className="text-xs text-zinc-500">{timeAgo(c.created_at)}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">{c.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
