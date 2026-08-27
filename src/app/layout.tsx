import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitHub Readme Stats",
  description: "Dynamic GitHub profile statistics generator with tech stack marquees, top languages, and GitHub stats cards.",
  keywords: ["github", "readme", "stats", "tech stack", "marquee", "badges", "developer profile"],
  authors: [{ name: "Hisham" }],
  openGraph: {
    title: "GitHub Readme Stats",
    description: "Dynamic GitHub profile statistics generator.",
    url: "https://readme-stats-theta-sepia.vercel.app/",
    siteName: "GitHub Readme Stats",
    images: [
      {
        url: "https://readme-stats-theta-sepia.vercel.app/api/stats?username=hisham-pp",
        width: 800,
        height: 400,
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Readme Stats",
    description: "Dynamic GitHub profile statistics generator with tech stack marquees.",
    images: ["https://readme-stats-theta-sepia.vercel.app/api/stats?username=hisham-pp"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
