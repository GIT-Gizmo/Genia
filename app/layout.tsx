import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/ModalProvider";
import { ToastProvider } from "@/components/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Genia",
  description: "Unlock creativity with Genia, an AI platform where you can effortlessly generate stunning videos, music, images, code, and conversation.",
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
      </html>
    </ClerkProvider>
  );
}
