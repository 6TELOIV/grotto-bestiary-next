import type { Metadata } from "next";
import { Aclonica, Amethysta } from "next/font/google";
import "./globals.css";

const aclonica = Aclonica({
  variable: "--font-aclonica",
  subsets: ["latin"],
  weight: "400",
});

const amethysta = Amethysta({
  variable: "--font-amethysta",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Violet's Grotto Bestiary",
  description: "Your favorite website for your favorite card game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${aclonica.variable} ${amethysta.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
