import type { Metadata } from "next";
import CertificatesSection from "@/components/sections/CertificatesSection";
import Footer from "@/components/sections/Footer";
import { certificates } from "@/app/data/certificatesData";

const siteUrl = "https://christazel.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Certificates — Yohan Christazel Jeffry",
  description:
    "A collection of competency certifications, technical credentials, and academic achievements earned by Yohan Christazel Jeffry.",
  url: `${siteUrl}/certificates`,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: certificates.length,
    itemListElement: certificates.map((cert, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "EducationalOccupationalCredential",
        name: cert.title,
        description: cert.description,
        credentialCategory: "certification",
        recognizedBy: {
          "@type": "Organization",
          name: cert.issuer,
        },
        url: cert.credentialUrl,
        validIn: {
          "@type": "AdministrativeArea",
          name: "Indonesia",
        },
      },
    })),
  },
};

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "A collection of competency certifications, technical credentials, and academic achievements earned by Yohan Christazel Jeffry.",
  openGraph: {
    title: "Certificates | Yohan Christazel Jeffry",
    description:
      "A collection of competency certifications, technical credentials, and academic achievements earned by Yohan Christazel Jeffry.",
    url: "https://christazel.vercel.app/certificates",
    siteName: "Yohan Christazel Jeffry Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://christazel.vercel.app/asset/profile_800.webp",
        width: 800,
        height: 800,
        alt: "Yohan Christazel Jeffry portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Certificates | Yohan Christazel Jeffry",
    description:
      "A collection of competency certifications, technical credentials, and academic achievements earned by Yohan Christazel Jeffry.",
    images: ["https://christazel.vercel.app/asset/profile_800.webp"],
  },
  alternates: {
    canonical: "https://christazel.vercel.app/certificates",
  },
};

export default function CertificatesPage() {
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 bg-white dark:bg-black text-neutral-900 dark:text-neutral-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="flex-1">
        <div className="page-content pt-28 md:pt-32">
          <CertificatesSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
