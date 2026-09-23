import type { Metadata } from "next";
import { Anton, Space_Grotesk } from "next/font/google";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: "Harun Njihia Muriuki — Engineer & Builder",
  description:
    "Finacle engineer and full-stack developer in Nairobi, working across core banking, applied AI, and the web.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${anton.variable} ${grotesk.variable}`}>
      <body className="font-body">
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}
