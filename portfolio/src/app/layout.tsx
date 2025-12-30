import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import Breadcrumbs from "@/components/Breadcrumbs";
import BackToTop from "@/components/BackToTop";

const inter = Inter({ 
  subsets: ["latin"], 
  weight: ['400', '700', '900'],
});

export const metadata: Metadata = {
  title: {
    default: "Fariduddin Fakhrizan | Portfolio",
    template: "%s | Fariduddin Fakhrizan",
  },
  description: "Full-Stack Developer & Cloud Engineer specializing in high-end UI/UX and scalable architecture. Available for projects.",
  keywords: ["Full-Stack Developer", "Cloud Engineer", "UI/UX Designer", "Laravel", "Next.js", "AWS", "Portfolio", "Software Engineer"],
  authors: [{ name: "Fariduddin Fakhrizan" }],
  creator: "Fariduddin Fakhrizan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fariduddin.dev",
    title: "Fariduddin Fakhrizan | Portfolio",
    description: "Full-Stack Developer & Cloud Engineer specializing in high-end UI/UX and scalable architecture. Available for projects.",
    siteName: "Fariduddin Fakhrizan Portfolio",
    images: [
      {
        url: "/og-image.png", // Placeholder - add your OG image to public folder
        width: 1200,
        height: 630,
        alt: "Fariduddin Fakhrizan - Full-Stack Developer & Cloud Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fariduddin Fakhrizan | Portfolio",
    description: "Full-Stack Developer & Cloud Engineer specializing in high-end UI/UX and scalable architecture. Available for projects.",
    images: ["/og-image.png"], // Placeholder - add your OG image to public folder
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-500 text-white antialiased`}>
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-mono focus:uppercase focus:tracking-widest focus:text-sm"
        >
          Skip to main content
        </a>
        <Navigation />
        <ScrollProgress />
        <Breadcrumbs />
        <BackToTop />
        <div id="main-content">
          {children}
        </div>
      </body>
    </html>
  );
} 