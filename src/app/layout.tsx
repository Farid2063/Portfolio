import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  weight: ['400', '700', '900'],
});

export const metadata: Metadata = {
  title: "Fariduddin Fakhrizan | Portfolio",
  description: "Full-Stack Developer, Cloud Engineer, and UI/UX Designer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang ="en">
      <body className={`${inter.className} bg-gray-500 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
} 