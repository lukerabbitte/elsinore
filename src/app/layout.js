"use client";

import { Rosario } from "next/font/google";
import "./globals.css";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import AudioPlayer from "@/components/AudioPlayer";
import { AnimatePresence } from "framer-motion";
import { useState, createContext } from "react";
import Head from "next/head";

const rosario = Rosario({
    subsets: ["latin"],
    display: "swap",
});

export const AudioContext = createContext();

export default function RootLayout({ children }) {
    const [audioSrc, setAudioSrc] = useState(null);

    const handleAudioEnded = () => {
        setAudioSrc(null);
    };

    <meta name="apple-mobile-web-app-title" content="Elsinore" />;

    return (
        <html lang="en">
            <Head>
                <meta name="apple-mobile-web-app-title" content="Elsinore" />
                <link rel="icon" href="/favicon.ico" />
                <title>Elsinore</title>
            </Head>
            <body className={`min-h-screen flex flex-col ${rosario.className}`}>
                <NextThemesProvider attribute="class" defaultTheme="system">
                    <AudioContext.Provider value={{ audioSrc, setAudioSrc }}>
                        <div className="mt-4 mx-4 sm:mt-0">
                            <Navbar />
                        </div>
                        <div class="flex flex-col lg:flex-row">
                            <main className="flex-grow p-4">{children}</main>
                            <AnimatePresence>
                                {audioSrc && (
                                    <AudioPlayer audioSrc={audioSrc} onEnded={handleAudioEnded} />
                                )}
                            </AnimatePresence>
                        </div>
                    </AudioContext.Provider>
                </NextThemesProvider>
            </body>
        </html>
    );
}
