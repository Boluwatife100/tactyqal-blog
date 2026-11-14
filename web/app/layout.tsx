import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./motion.css";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { MotionProviders } from "@/components/motion/providers";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Tactyqal Labs | Help your teen build a real app in 8 weeks",
  description:
    "1:1 mentoring that takes your teen from idea to a launched full-stack app in 8 weeks, with no coding needed. Real revenue, real projects, stronger university applications.",
  openGraph: {
    title: "Tactyqal Labs",
    description:
      "Empower your kid to build the next app that impacts millions, in 8 weeks.",
    type: "website",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-white text-neutral-900 antialiased`}
      >
        <MotionProviders>
          <Navbar />
          {children}
          <Footer />
        </MotionProviders>
      </body>
    </html>
  );
}
