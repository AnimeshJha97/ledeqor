import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ledeqor.local"),
  title: {
    default: "Ledeqor | Learn. Develop. Conquer.",
    template: "%s | Ledeqor"
  },
  description: "Applied AI engineering courses for full-stack developers, built around production-style portfolio projects.",
  openGraph: {
    title: "Ledeqor",
    description: "Learn, develop, and conquer future-ready technology through project-driven courses.",
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
