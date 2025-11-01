import type { Metadata } from "next";

import { inter } from "./_lib/fonts";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Vesugusto",
    default: "Vesugusto",
  },
  description: "Web app dashbord web app per l'e-commerce Vesugusto",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${inter.className} bg-style mx-auto h-full max-w-[95rem] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
