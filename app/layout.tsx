import type { Metadata } from "next";
import { JetBrains_Mono, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/navigation/NavigationBar";
import Scroll from "@/components/Scroll";

const jetBrain = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: '400',
  style: ["normal", "italic"],
});

const roboto = Roboto_Condensed({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: '400',
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Parzival's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetBrain.variable} ${roboto.variable} antialiased relative`}
      >
        <NavigationBar />
        {children}
        <Scroll />
      </body>
    </html>
  );
}
