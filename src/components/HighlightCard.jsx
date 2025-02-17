"use client";
import React, { useContext, useRef, useEffect } from "react";
import UserAvatar from "@/components/UserAvatar";
import { AudioContext } from "@/app/layout";
import { PrevButton, NextButton } from "@/components/embla/EmblaCarouselArrowButtons";

const HighlightCard = ({
    highlight,
    onPrevButtonClick,
    onNextButtonClick,
    prevBtnDisabled,
    nextBtnDisabled,
    isFocused,
}) => {
    const { audioSrc, setAudioSrc } = useContext(AudioContext);
    const { setCurrentlyPlayingTitle } = useContext(AudioContext);
    const togglePlaybackButtonRef = useRef(null);

    const handleListenClick = () => {
        if (audioSrc === highlight.mp3_url) {
            setAudioSrc(null); // Stop the audio if it's already playing
            setCurrentlyPlayingTitle(null);
        } else {
            setAudioSrc(highlight.mp3_url); // Play the selected audio
            setCurrentlyPlayingTitle(highlight.title);
        }
    };

    // Hijack enter button TODO - parked for now as it messes with keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isFocused) {
                switch (event.key) {
                    case "k":
                        event.preventDefault();
                        togglePlaybackButtonRef.current.focus();
                        handleListenClick();
                        break;
                    default:
                        break;
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isFocused, audioSrc]);

    return (
        <div className="bg-gradient-radial rounded-xl h-2/3 sm:h-full max-w-prose max-h-144 mx-4 sm:mx-0 p-4 flex flex-col gap-4 justify-between items-center focus:outline-none">
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
            <div className="flex flex-row gap-2 items-center justify-center">
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />

                <button
                    ref={togglePlaybackButtonRef}
                    onClick={handleListenClick}
                    className="bg-slate-500/20 backdrop-blur-sm text-foreground px-4 py-2 h-12 w-20 rounded"
                >
                    {audioSrc === highlight.mp3_url ? "Stop" : "Listen"}
                </button>

                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>
        </div>
    );
};

export default HighlightCard;
