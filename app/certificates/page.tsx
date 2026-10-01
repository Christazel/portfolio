import type { Metadata } from "next";
import CertificatesSection from "@/components/sections/CertificatesSection";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "A collection of competency certifications, technical credentials, and academic achievements earned by Yohan Christazel Jeffry.",
  openGraph: {
    title: "Certificates | Yohan Christazel Jeffry",
    description:
      "A collection of competency certifications, technical credentials, and academic achievements earned by Yohan Christazel Jeffry.",
    url: "https://christazel.vercel.app/certificates",
    type: "website",
  },
  alternates: {
    canonical: "https://christazel.vercel.app/certificates",
  },
};

export default function CertificatesPage() {
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 bg-white dark:bg-black text-neutral-900 dark:text-neutral-100">
      <main className="flex-1">
        <div className="page-content pt-28 md:pt-32">
          <CertificatesSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
