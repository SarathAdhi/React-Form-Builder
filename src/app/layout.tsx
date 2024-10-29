import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "React Forms",
  description:
    "A powerful form-building tool that enables users to effortlessly create, customize, and validate forms directly within their web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          bricolageGrotesque.variable,
          "antialiased min-h-screen flex flex-col"
        )}
      >
        <Navbar />

        {children}

        <Analytics />

        <Toaster />
      </body>
    </html>
  );
}
