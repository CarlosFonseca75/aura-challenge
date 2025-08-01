import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Footer } from "@/components/common/Footer";
import "@/styles/globals.scss";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

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
      <body className={roboto.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
