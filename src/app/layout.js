import localFont from "next/font/local";
import "./globals.css";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Navbar from "@/components/Navbar";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata = {
    title: "Elsinore",
    description: "Elsinore",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`min-h-screen flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <NextThemesProvider attribute="class" defaultTheme="system">
                    <Navbar />
                    <main className="flex-grow p-4">{children}</main>
                </NextThemesProvider>
            </body>
        </html>
    );
}
