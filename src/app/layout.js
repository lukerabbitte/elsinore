import localFont from "next/font/local";
import { Rosario } from "next/font/google";
import "./globals.css";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Navbar from "@/components/Navbar";

const rosario = Rosario({
    subsets: ["latin"],
    display: "swap",
});

export const metadata = {
    title: "Elsinore",
    description: "Elsinore",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`min-h-screen flex flex-col rosario.className`}>
                <NextThemesProvider attribute="class" defaultTheme="system">
                    <div className="mt-4 mx-4 sm:mt-0">
                        <Navbar />
                    </div>
                    <main className="flex-grow p-4">{children}</main>
                </NextThemesProvider>
            </body>
        </html>
    );
}
