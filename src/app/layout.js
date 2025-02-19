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
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

// Add icons to the library
library.add(faHome, faPlus);

const rosario = Rosario({
    subsets: ["latin"],
    display: "swap",
});

export const AudioContext = createContext();

export default function RootLayout({ children }) {
    const [audioSrc, setAudioSrc] = useState(null);
    const [currentlyPlayingTitle, setCurrentlyPlayingTitle] = useState(null);
    const [audioEnded, setAudioEnded] = useState(false);
    const pathname = usePathname();

    const handleAudioEnded = () => {
        setAudioSrc(null);
        setCurrentlyPlayingTitle(null);
        setAudioEnded(true);
    };

    return (
        <html lang="en">
            <Head>
                <meta name="apple-mobile-web-app-title" content="Elsinore" />
                <link rel="icon" href="/favicon.ico" />
                <title>Elsinore</title>
            </Head>
            <body className={`min-h-screen flex flex-col ${rosario.className}`}>
                <NextThemesProvider attribute="class" defaultTheme="system">
                    <AudioContext.Provider
                        value={{
                            audioSrc,
                            setAudioSrc,
                            currentlyPlayingTitle,
                            setCurrentlyPlayingTitle,
                            audioEnded,
                            setAudioEnded,
                        }}
                    >
                        <div className="absolute top-0 w-full">
                            <Navbar />
                        </div>
                        <div className="flex flex-col lg:flex-row relative">
                            <main className="flex-grow">{children}</main>
                            <div className="fixed bottom-0 left-0 right-0">
                                <AudioPlayer
                                    audioSrc={audioSrc}
                                    onEnded={handleAudioEnded}
                                    currentRoute={pathname}
                                />
                            </div>
                            <Toaster />
                        </div>
                    </AudioContext.Provider>
                </NextThemesProvider>
            </body>
        </html>
    );
}
