import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Pro - Modern Dashboard Template",
  description: "Professional admin dashboard built with Next.js 14, TypeScript, Tailwind CSS, and Radix UI",
  keywords: ["admin dashboard", "next.js", "typescript", "tailwind", "radix ui", "react"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem
          disableTransitionOnChange={false}
        >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
