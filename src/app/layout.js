import { Rosario } from "next/font/google";
import "./globals.css";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import AudioPlayer from "@/components/AudioPlayer";
import { AudioContextProvider } from "@/components/AudioContextProvider";
import { CarouselSlideIndexContextProvider } from "@/components/CarouselSlideIndexContextProvider";
import { Toaster } from "@/components/ui/toaster";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faPlus, faQuestion } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ViewTransitions } from "next-view-transitions";
config.autoAddCss = false;

// Add icons to the library
library.add(faHome, faPlus, faQuestion);

const rosario = Rosario({
    subsets: ["latin"],
    display: "swap",
});

export const metadata = {
    title: "Elsinore",
    description: "A reading highlight management app",
};

export default function RootLayout({ children }) {
    return (
        <ViewTransitions>
            <html lang="en" suppressHydrationWarning>
                <body className={`min-h-screen flex flex-col ${rosario.className}`}>
                    <NextThemesProvider attribute="class" defaultTheme="system">
                        <AudioContextProvider>
                            <CarouselSlideIndexContextProvider>
                                <div className="absolute top-0 w-full">
                                    <Navbar />
                                </div>
                                <div className="flex flex-col lg:flex-row relative">
                                    <main className="flex-grow">{children}</main>
                                    <div className="fixed bottom-0 left-0 right-0">
                                        <AudioPlayer />
                                    </div>
                                    <Toaster />
                                </div>
                            </CarouselSlideIndexContextProvider>
                        </AudioContextProvider>
                    </NextThemesProvider>
                </body>
            </html>
        </ViewTransitions>
    );
}
