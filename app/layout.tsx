import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/ModalProvider";
import { ToastProvider } from "@/components/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quinox",
  description: "Unlock creativity with Quinox, an AI platform where you can generate stunning videos, music, images, code, and converse with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body className={inter.className}>
          <ToastProvider>
            <ModalProvider />
            {children}
          </ToastProvider>
        </body>
        <Script id="chatway" strategy="lazyOnload" src="https://cdn.chatway.app/widget.js?id=sT8Dxxpw9QsB" />
      </html>
    </ClerkProvider>
  );
}
