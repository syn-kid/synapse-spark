import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SynapseSpark — Ideas spread like signal",
  description: "Start with one word. Watch it branch in five directions. Follow the sparks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className="antialiased">{children}</body>
    </html>
  );
}
