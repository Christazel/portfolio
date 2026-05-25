"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type CommentItem = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

type ToastType = "success" | "error" | "info";

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

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function SkeletonComment({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const pulseClass = variant === "light" ? "bg-zinc-950/10" : "bg-white/10";

  return (
    <div
      className={`rounded-3xl border p-4 ${
        variant === "light" ? "border-zinc-950/10 bg-zinc-950/[0.035]" : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 animate-pulse rounded-full ${pulseClass}`} />
        <div className="space-y-2">
          <div className={`h-3 w-28 animate-pulse rounded-full ${pulseClass}`} />
          <div className={`h-2 w-16 animate-pulse rounded-full ${pulseClass}`} />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className={`h-3 w-full animate-pulse rounded-full ${pulseClass}`} />
        <div className={`h-3 w-4/5 animate-pulse rounded-full ${pulseClass}`} />
      </div>
    </div>
  );
}

function RecentNoteCard({ comment }: { comment: CommentItem }) {
  return (
    <article className="recent-note-card group">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-gradient-to-br from-cyan-300/20 via-white/5 to-purple-400/20 text-xs font-semibold text-cyan-100 shadow-inner">
          {getInitials(comment.name) || "?"}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[11px] text-zinc-500">
            <p className="truncate font-semibold uppercase tracking-[0.12em] text-zinc-400">{comment.name}</p>
            <span className="h-1 w-1 shrink-0 rounded-full bg-zinc-700" />
            <span className="shrink-0">{timeAgo(comment.created_at)}</span>
          </div>

          <p className="mt-1 line-clamp-2 text-base font-semibold leading-relaxed text-zinc-100">{comment.message}</p>
        </div>
      </div>
    </article>
  );
}

function RecentNotesMarquee({ items }: { items: CommentItem[] }) {
  const rowCount = Math.min(3, Math.max(1, items.length));
  const rows = Array.from({ length: rowCount }, (_, rowIndex) =>
    items.filter((_, index) => index % rowCount === rowIndex),
  );

  return (
    <div className="notes-marquee" aria-label="Recent visitor notes">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`notes-marquee-row ${rowIndex % 2 === 1 ? "notes-marquee-row-reverse" : ""}`}
        >
          <div className="notes-marquee-track">
            {[0, 1, 2].map((loop) => (
              <div key={loop} className="notes-marquee-sequence" aria-hidden={loop > 0 ? true : undefined}>
                {row.map((comment) => (
                  <RecentNoteCard key={`${rowIndex}-${loop}-${comment.id}`} comment={comment} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CommentBox({
  maxVisible = 30,
  variant = "dark",
  compact = false,
  showComposer = true,
  showRecentNotes = true,
}: {
  maxVisible?: number;
  variant?: "dark" | "light";
  compact?: boolean;
  showComposer?: boolean;
  showRecentNotes?: boolean;
}) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const [items, setItems] = useState<CommentItem[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [sending, setSending] = useState(false);

  const [toast, setToast] = useState<{ type: ToastType; text: string } | null>(null);
  const toastTimer = useRef<number | null>(null);

  const remaining = useMemo(() => MAX_LEN - message.length, [message.length]);
  const visibleItems = useMemo(() => items.slice(0, maxVisible), [items, maxVisible]);

  const showToast = useCallback((type: ToastType, text: string) => {
    setToast({ type, text });

    if (toastTimer.current) window.clearTimeout(toastTimer.current);

    toastTimer.current = window.setTimeout(() => {
      setToast(null);
    }, 2800);
  }, []);

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
  }, [showToast]);

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
        body: JSON.stringify({ name: n, message: m, website }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(json?.message || "Gagal mengirim komentar.");

      setItems((prev) => {
        const nextItems = [json.data, ...prev];
        return compact ? nextItems : nextItems.slice(0, maxVisible);
      });
      setMessage("");
      setWebsite("");
      showToast("success", "Komentar berhasil dikirim!");
    } catch (e: unknown) {
      const error = e instanceof Error ? e.message : "Gagal mengirim komentar.";
      showToast("error", error);
    } finally {
      setSending(false);
    }
  };

  const resetForm = () => {
    setName("");
    setMessage("");
    setWebsite("");
    showToast("info", "Form direset.");
  };

  const isLight = variant === "light";
  const shellClass = compact
    ? "relative"
    : `relative overflow-hidden rounded-[2rem] border p-[1px] shadow-xl ${
        isLight
          ? "border-zinc-950/10 bg-white/80 shadow-zinc-950/10"
          : "border-white/10 bg-zinc-950/60 shadow-cyan-950/20"
      }`;
  const contentClass = compact
    ? "relative"
    : `relative rounded-[2rem] p-5 md:p-8 ${isLight ? "bg-zinc-100/90" : "bg-zinc-950/75 backdrop-blur-xl"}`;
  const formShellClass = compact
    ? "mt-7"
    : `mt-7 rounded-3xl border p-4 md:p-5 ${isLight ? "border-zinc-950/10 bg-white/65" : "border-white/10 bg-white/[0.03]"}`;

  if (compact) {
    return (
      <section className={`contact-notes-stage relative flex min-h-full flex-col ${!showComposer ? "contact-notes-only" : ""}`}>
        {toast && (
          <div
            className={[
              "fixed inset-x-4 top-4 z-50 rounded-2xl border px-4 py-3 text-sm shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:right-4",
              toast.type === "success" ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-100" : "",
              toast.type === "error" ? "border-red-400/30 bg-red-500/15 text-red-100" : "",
              toast.type === "info" ? "border-white/15 bg-zinc-900/80 text-zinc-100" : "",
            ].join(" ")}
          >
            {toast.text}
          </div>
        )}

        {showComposer && (
        <div className="contact-compose mx-auto w-full max-w-5xl">
          <div className="flex flex-col gap-3 text-center">
            <div>
              <p className="section-kicker">Quick Message</p>
              <h3 className="mt-3 text-3xl font-semibold leading-tight text-zinc-50 sm:text-4xl md:text-5xl">Send a simple note</h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                Use this form for project inquiries, feedback, or a quick hello. I read every message.
              </p>
            </div>

            <button
              type="button"
              onClick={loadComments}
              disabled={loadingList}
              className="mx-auto w-full rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-400 transition hover:border-white/20 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
            >
              {loadingList ? "Loading" : `${items.length} notes`}
            </button>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-[0.62fr_1.38fr]">
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama kamu"
                className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-cyan-300/50 focus:ring-4 focus:ring-cyan-400/10"
                autoComplete="name"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, MAX_LEN))}
                placeholder="Tulis komentar atau kebutuhan project..."
                rows={4}
                className="w-full resize-none rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm leading-relaxed text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-purple-300/50 focus:ring-4 focus:ring-purple-400/10"
              />

              <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                <span className={remaining < 40 ? "text-amber-300" : ""}>{remaining} chars left</span>
                <span>Max {MAX_LEN}</span>
              </div>
            </div>
          </div>

          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <button
              type="button"
              onClick={submit}
              disabled={sending}
              className="rounded-2xl bg-zinc-100 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-zinc-400 transition hover:border-white/20 hover:text-white"
            >
              Reset
            </button>
          </div>
        </div>
        )}

        {showRecentNotes && (
        <div className={`contact-notes-full flex-1 ${showComposer ? "mt-8 border-t border-white/10 pt-6" : ""}`}>
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-1">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Recent notes</p>
              <p className="text-xs text-zinc-600">{items.length}/{items.length || 0}</p>
            </div>

            {loadingList ? (
            <p className="mx-auto mt-4 max-w-7xl px-1 text-sm text-zinc-500">Loading notes...</p>
            ) : items.length === 0 ? (
            <p className="mx-auto mt-4 max-w-7xl px-1 text-sm leading-relaxed text-zinc-500">
                No notes yet. This area will show recent visitor messages.
              </p>
            ) : (
              <RecentNotesMarquee items={items} />
            )}
        </div>
        )}
      </section>
    );
  }

  return (
    <section className={shellClass}>
      {toast && (
        <div
          className={[
            "fixed inset-x-4 top-4 z-50 rounded-2xl border px-4 py-3 text-sm shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:right-4",
            toast.type === "success"
              ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-100"
              : "",
            toast.type === "error"
              ? "border-red-400/30 bg-red-500/15 text-red-100"
              : "",
            toast.type === "info"
              ? "border-white/15 bg-zinc-900/80 text-zinc-100"
              : "",
          ].join(" ")}
        >
          {toast.text}
        </div>
      )}

      {!compact && (
        <div
          className={`pointer-events-none absolute inset-0 ${
            isLight
              ? "bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.11),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.10),transparent_35%)]"
              : "bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_35%)]"
          }`}
        />
      )}

      <div className={contentClass}>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div
              className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
                isLight
                  ? "border-sky-500/20 bg-sky-500/10 text-sky-700"
                  : "border-cyan-400/20 bg-cyan-400/10 text-cyan-100"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
              Guestbook
            </div>

            <h3 className={`text-2xl font-semibold tracking-tight md:text-3xl ${isLight ? "text-zinc-950" : "text-white"}`}>
              Leave your mark here
            </h3>

            <p className={`mt-2 max-w-xl text-sm leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
              Tulis feedback, pertanyaan, atau sekadar say hi untuk portfolio ini.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`rounded-2xl border px-4 py-2 text-sm ${
                isLight ? "border-zinc-950/10 bg-zinc-950/[0.035] text-zinc-600" : "border-white/10 bg-white/[0.04] text-zinc-300"
              }`}
            >
              <span className={`font-semibold ${isLight ? "text-zinc-950" : "text-white"}`}>{items.length}</span> comments
            </div>

            <button
              type="button"
              onClick={loadComments}
              disabled={loadingList}
              className={`rounded-2xl border px-4 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${
                isLight
                  ? "border-zinc-950/10 bg-zinc-950/[0.035] text-zinc-600 hover:border-sky-500/30 hover:bg-sky-500/10 hover:text-zinc-950"
                  : "border-white/10 bg-white/[0.04] text-zinc-300 hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-cyan-100"
              }`}
            >
              {loadingList ? "Loading..." : "Refresh"}
            </button>
          </div>
        </div>

        <div className={formShellClass}>
          <div className="grid gap-4">
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama kamu"
                className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition placeholder:text-zinc-500 focus:border-cyan-300/50 focus:ring-4 focus:ring-cyan-400/10 ${
                  isLight ? "border-zinc-950/10 bg-zinc-950/[0.035] text-zinc-950" : "border-white/10 bg-zinc-950/60 text-zinc-100"
                }`}
                autoComplete="name"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                Message
              </label>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, MAX_LEN))}
                placeholder="Tulis komentar terbaikmu..."
                rows={5}
                className={`w-full resize-none rounded-2xl border px-4 py-3 text-sm leading-relaxed outline-none transition placeholder:text-zinc-500 focus:border-purple-300/50 focus:ring-4 focus:ring-purple-400/10 ${
                  isLight ? "border-zinc-950/10 bg-zinc-950/[0.035] text-zinc-950" : "border-white/10 bg-zinc-950/60 text-zinc-100"
                }`}
              />

              <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                <span className={remaining < 40 ? "text-amber-300" : ""}>
                  {remaining} chars left
                </span>
                <span>Max {MAX_LEN}</span>
              </div>
            </div>
          </div>

          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={submit}
              disabled={sending}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.01] hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="relative z-10">{sending ? "Sending..." : "Send Comment"}</span>
              <span className="absolute inset-0 translate-x-[-100%] bg-white/30 transition duration-500 group-hover:translate-x-[100%]" />
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={resetForm}
                className={`rounded-2xl border px-4 py-3 text-sm transition ${
                  isLight
                    ? "border-zinc-950/10 text-zinc-600 hover:border-zinc-950/20 hover:bg-zinc-950/[0.05] hover:text-zinc-950"
                    : "border-white/10 text-zinc-400 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="mt-7">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Recent Comments
            </p>

            <p className="text-xs text-zinc-500">
              {Math.min(items.length, maxVisible)}/{items.length || 0}
            </p>
          </div>

          {loadingList ? (
            <div className="space-y-3">
              <SkeletonComment variant={variant} />
              <SkeletonComment variant={variant} />
              <SkeletonComment variant={variant} />
            </div>
          ) : items.length === 0 ? (
            <div
              className={`rounded-3xl border border-dashed px-5 py-10 text-center ${
                isLight ? "border-zinc-950/15 bg-zinc-950/[0.035]" : "border-white/15 bg-white/[0.03]"
              }`}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-xl">
                ✦
              </div>

              <h4 className={`mt-4 text-base font-semibold ${isLight ? "text-zinc-950" : "text-white"}`}>
                Belum ada komentar
              </h4>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">
                Jadilah orang pertama yang meninggalkan pesan di guestbook ini.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {visibleItems.map((c) => (
                <article
                  key={c.id}
                  className={`group rounded-3xl border p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                    isLight
                      ? "border-zinc-950/10 bg-zinc-950/[0.035] hover:border-sky-500/20 hover:bg-white/80 hover:shadow-zinc-950/10"
                      : "border-white/10 bg-white/[0.03] hover:border-cyan-300/20 hover:bg-white/[0.05] hover:shadow-cyan-950/20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 text-sm font-semibold text-cyan-100 shadow-inner">
                      {getInitials(c.name) || "?"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className={`truncate text-sm font-semibold ${isLight ? "text-zinc-950" : "text-zinc-100"}`}>
                          {c.name}
                        </p>

                        <span
                          className={`rounded-full border px-2.5 py-1 text-[11px] text-zinc-500 ${
                            isLight ? "border-zinc-950/10 bg-white/60" : "border-white/10 bg-zinc-950/40"
                          }`}
                        >
                          {timeAgo(c.created_at)}
                        </span>
                      </div>

                      <p className={`mt-3 whitespace-pre-wrap text-sm leading-relaxed ${isLight ? "text-zinc-700" : "text-zinc-400"}`}>
                        {c.message}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
