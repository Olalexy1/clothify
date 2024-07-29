import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import ToastProvider from "@/utils/react-toastify/ToastProvider";

export const metadata: Metadata = {
  title: "Clothify",
  description: "Clothify | Online shopping for electronics, jewelry, men's clothing, women's clothing",
  icons: {
    icon: "/clothifyLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
      className="scrollbar-thumb-coral-red scrollbar-track-red-100 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <ToastProvider>
            {children}
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
