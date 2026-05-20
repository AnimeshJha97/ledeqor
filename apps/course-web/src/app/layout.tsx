import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-engineer-guide.local"),
  title: {
    default: "AI Engineer Guide | Applied AI Engineering Courses",
    template: "%s | AI Engineer Guide"
  },
  description: "Applied AI engineering courses for full-stack developers, built around production-style portfolio projects.",
  openGraph: {
    title: "AI Engineer Guide",
    description: "Learn applied AI engineering by building production-style AI products.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
