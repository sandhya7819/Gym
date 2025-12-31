import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sandhya – Fitness & Diet Management",
  description: "Your personalized platform for elite fitness tracking, nutrition planning, and body transformation.",
};

import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Toaster position="top-center" />
          {children}
        </main>
        <footer className="bg-gray-900 text-gray-400 py-6 text-center">
          <p>&copy; {new Date().getFullYear()} GymGuide. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
