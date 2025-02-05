"use client";
import React, { useContext } from "react";
import UserAvatar from "@/components/UserAvatar";
import { AudioContext } from "@/app/layout";

const HighlightCard = ({ highlight }) => {
    const { audioSrc, setAudioSrc } = useContext(AudioContext);

    const handleListenClick = () => {
        if (audioSrc === highlight.mp3_url) {
            setAudioSrc(null); // Stop the audio if it's already playing
        } else {
            setAudioSrc(highlight.mp3_url); // Play the selected audio
        }
    };

    return (
        <div className="bg-gradient-radial h-[80%]  p-4 flex flex-col gap-4 justify-between items-center">
            <div className="flex flex-row items-center justify-between w-full gap-4">
                <h1 className="font-semibold lg:font-extrabold text-foreground text-2xl text-balance">
                    {highlight.title}
                </h1>
                <div>
                    <UserAvatar
                        avatarImage={highlight.profile?.avatar_image}
                        displayName={highlight.profile?.display_name}
                    />
                </div>
            </div>
            <p className="line-clamp-6 max-w-full">{highlight.content}</p>
            <button
                onClick={handleListenClick}
                className="bg-slate-500/20 backdrop-blur-sm text-foreground px-4 py-2 min-w-12 rounded"
            >
                {audioSrc === highlight.mp3_url ? "Stop" : "Listen"}
            </button>
        </div>
    );
};

export default HighlightCard;
