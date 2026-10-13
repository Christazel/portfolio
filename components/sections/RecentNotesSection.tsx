import dynamic from "next/dynamic";
import ScrollReveal from "@/components/animations/ScrollReveal";

const CommentBox = dynamic(() => import("@/components/ui/CommentBox"));

export default function RecentNotesSection() {
  return (
    <section className="recent-notes-section py-10 md:py-16">
      <ScrollReveal delay={0} duration={0.8} distance={24}>
        <div className="about-new-header text-center flex flex-col items-center justify-center mx-auto max-w-2xl mb-8">
          <h2 className="about-new-heading text-center">Visitor messages</h2>
          <p className="about-new-subheading text-center max-w-xl mx-auto">
            Short notes, feedback, and project messages from visitors.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.12} duration={0.8} distance={28}>
        <div className="recent-notes-surface mt-8">
          <CommentBox compact showComposer={true} showHeader={false} />
        </div>
      </ScrollReveal>
    </section>
  );
}
