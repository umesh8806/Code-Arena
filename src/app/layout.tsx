import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Code2, PenTool, LayoutDashboard, Terminal } from "lucide-react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Code Arena | Professional Developer Environment",
  description: "A premium coding arena for developers to write, test, and collaborate on code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <nav className="glass-panel sticky top-0 z-50 w-full h-16 flex items-center justify-between px-6 shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center group-hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              CodeArena
            </span>
          </Link>
          
          <div className="flex items-center gap-6 text-sm font-medium text-gray-400">
            <Link href="/compiler" className="hover:text-white flex items-center gap-2 transition-colors">
              <Terminal className="w-4 h-4" />
              Compiler
            </Link>
            <Link href="/live-preview" className="hover:text-white flex items-center gap-2 transition-colors">
              <LayoutDashboard className="w-4 h-4" />
              Live Preview
            </Link>
            <Link href="/whiteboard" className="hover:text-white flex items-center gap-2 transition-colors">
              <PenTool className="w-4 h-4" />
              Whiteboard
            </Link>
          </div>
        </nav>
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
