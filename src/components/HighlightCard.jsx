"use client";
import React, { useContext } from "react";
import UserAvatar from "@/components/UserAvatar";
import { AudioContext } from "@/app/layout";
import { PrevButton, NextButton } from "@/components/embla/EmblaCarouselArrowButtons";

const HighlightCard = ({
    highlight,
    onPrevButtonClick,
    onNextButtonClick,
    prevBtnDisabled,
    nextBtnDisabled,
}) => {
    const { audioSrc, setAudioSrc } = useContext(AudioContext);

    const handleListenClick = () => {
        if (audioSrc === highlight.mp3_url) {
            setAudioSrc(null); // Stop the audio if it's already playing
        } else {
            setAudioSrc(highlight.mp3_url); // Play the selected audio
        }
    };

    return (
        <div className="bg-gradient-radial rounded-xl h-2/3 sm:h-full max-w-[65ch] mx-8 sm:mx-0 p-4 flex flex-col gap-4 justify-between items-center">
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
            <div className="flex flex-row items-center justify-center">
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />

                <button
                    onClick={handleListenClick}
                    className="bg-slate-500/20 backdrop-blur-sm text-foreground px-4 py-2 min-w-12 rounded"
                >
                    {audioSrc === highlight.mp3_url ? "Stop" : "Listen"}
                </button>

                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>
        </div>
    );
};

export default HighlightCard;
