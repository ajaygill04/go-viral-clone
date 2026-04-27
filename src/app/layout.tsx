import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GoViral AI - Content Virality Analyzer",
  description: "Upload your content and get an AI-powered virality score with actionable feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}