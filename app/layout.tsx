import type { Metadata } from "next";

import { inter } from "./_lib/fonts";
import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "./_contexts/ThemeProvider";
import MotionWrapper from "./_components/ui/MotionWrapper";

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
    <html lang="it" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-style mx-auto h-full max-w-full antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MotionWrapper>{children}</MotionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
