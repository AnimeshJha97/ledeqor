import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orvion DocIntel AI Engineer Course",
  description: "A full-stack applied AI engineering course built around Orvion DocIntel."
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
