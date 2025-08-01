import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Footer } from "@/components/common/Footer";
import "@/styles/globals.scss";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aura Search App",
  description: "App for users management with Next.js and TypeScript.",
  keywords: ["Next.js", "React", "Web App", "TypeScript", "Frontend"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
