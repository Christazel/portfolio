import CommentBox from "@/components/ui/CommentBox";

export default function RecentNotesSection() {
  return (
    <section className="recent-notes-section py-10 md:py-16">
      <div className="mx-auto max-w-5xl text-center">
        <p className="section-kicker">Recent Notes</p>
        <h2 className="section-title mt-3">Visitor messages</h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-zinc-400 md:text-lg">
          Short notes, feedback, and project messages from visitors.
        </p>
      </div>

      <div className="recent-notes-surface mt-8">
        <CommentBox compact showComposer={false} />
      </div>
    </section>
  );
}
