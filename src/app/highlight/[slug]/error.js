"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import FloatingAudioPlayerPageLayout from "@/components/layouts/FloatingAudioPlayerPageLayout";
import Link from "next/link";

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <FloatingAudioPlayerPageLayout>
            <div className="p-4 flex flex-col gap-4 items-center">
                <h1 className="font-semibold lg:font-extrabold text-foreground text-2xl text-balance">
                    Highlight not found!
                </h1>

                <Link href="/">
                    <Button className="bg-slate-500/20 backdrop-blur-sm text-foreground px-4 py-2 h-12 rounded hover:scale-105 transition-all duration-300">
                        Return Home
                    </Button>
                </Link>
            </div>
        </FloatingAudioPlayerPageLayout>
    );
}
