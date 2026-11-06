import type { Metadata } from "next";
import { Geist_Mono, Inter, Michroma } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shamika Keshan - Software Engineer",
  description:
    "Portfolio of Shamika Keshan: backend, cloud and AI integration projects including Arka, Silverline and HeadRef.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${michroma.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
