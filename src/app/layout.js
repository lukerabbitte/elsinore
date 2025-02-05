"use client";

import localFont from "next/font/local";
import { Rosario } from "next/font/google";
import "./globals.css";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import AudioPlayer from "@/components/AudioPlayer";
import { AnimatePresence } from "framer-motion";

const rosario = Rosario({
    subsets: ["latin"],
    display: "swap",
});

export const AudioContext = React.createContext();

export default function RootLayout({ children }) {
    const [audioSrc, setAudioSrc] = React.useState(null);

    const handleAudioEnded = () => {
        setAudioSrc(null);
    };

    return (
        <html lang="en">
            <body className={`min-h-screen flex flex-col ${rosario.className}`}>
                <NextThemesProvider attribute="class" defaultTheme="system">
                    <AudioContext.Provider value={{ audioSrc, setAudioSrc }}>
                        <div className="mt-4 mx-4 sm:mt-0">
                            <Navbar />
                        </div>
                        <main className="flex-grow p-4">{children}</main>
                        <AnimatePresence>
                            {audioSrc && (
                                <AudioPlayer audioSrc={audioSrc} onEnded={handleAudioEnded} />
                            )}
                        </AnimatePresence>
                    </AudioContext.Provider>
                </NextThemesProvider>
            </body>
        </html>
    );
}
