import type { Metadata } from "next";
import { Inter, EB_Garamond, JetBrains_Mono } from "next/font/google";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const serif = EB_Garamond({
  variable: "--font-serif-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  // Resolves the relative OG/canonical URLs below to absolute ones.
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Software Development Studio`,
    // Page titles become "About — NetraSoft Solutions"
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "software development company",
    "custom software development",
    "web application development",
    "mobile app development",
    "cloud and DevOps",
    "systems integration",
    "software development Nigeria",
    "Abuja software company",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName,
    title: `${siteName} — Software Development Studio`,
    description: siteDescription,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Software Development Studio`,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/**
 * Organization markup, so search engines can attach the name, logo and contact
 * details to the brand rather than inferring them from the page.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/brand/netrasoft-logo.png`,
  description: siteDescription,
  areaServed: "Worldwide",
  knowsAbout: [
    "Custom web application development",
    "Mobile app development",
    "Cloud infrastructure and DevOps",
    "Systems and API integration",
    "AI and workflow automation",
    "Product and UI/UX design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
