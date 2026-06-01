import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

export const metadata: Metadata = {
  title: "India ESG Benchmark Dashboard | BRSR 2026",
  description: "Interactive ESG benchmarking platform analyzing India's top 1,000 listed companies across 22 sectors. Powered by BRSR 2026 data covering Environmental, Social, and Governance performance.",
  keywords: ["ESG", "BRSR", "India", "sustainability", "benchmark", "corporate governance", "environmental", "social"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
