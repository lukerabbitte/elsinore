"use client";
import React, { useContext, useRef, useEffect } from "react";
import UserAvatar from "@/components/UserAvatar";
import { useAudioContext } from "@/components/AudioContextProvider";
import { PrevButton, NextButton } from "@/components/embla/EmblaCarouselArrowButtons";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const HighlightCard = ({
    highlight,
    onPrevButtonClick,
    onNextButtonClick,
    prevBtnDisabled,
    nextBtnDisabled,
    isFocused,
}) => {
    const { audioSrc, setAudioSrc, setCurrentlyPlayingTitle } = useAudioContext();
    const togglePlaybackButtonRef = useRef(null);

    const handleListenClick = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (audioSrc === highlight.mp3_url) {
            setAudioSrc(null); // Stop the audio if it's already playing
            setCurrentlyPlayingTitle(null);
        } else {
            setAudioSrc(highlight.mp3_url); // Play the selected audio
            setCurrentlyPlayingTitle(highlight.title);
        }
    };

    const handlePrevClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        onPrevButtonClick(e);
    };

    const handleNextClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        onNextButtonClick(e);
    };

    // Override k button
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isFocused) {
                switch (event.key) {
                    case "k":
                        event.preventDefault();
                        togglePlaybackButtonRef.current.focus();
                        handleListenClick(event);
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
        <Link
            href={`/highlight/${highlight.slug}`}
            className="transition-all duration-300 hover:scale-[0.99]"
        >
            <div className="bg-gradient-radial rounded-xl min-w-60 max-w-prose max-h-144 mx-4 sm:mx-0 p-4 flex flex-col gap-8 justify-between items-center focus:outline-none">
                <div className="flex flex-row items-center justify-between w-full gap-4">
                    <h1
                        className="font-semibold lg:font-extrabold text-foreground text-2xl text-balance hover:underline"
                        style={{ viewTransitionName: `highlight-title-${highlight.id}` }}
                    >
                        {highlight.title}
                        <span className="mx-2">
                            <FontAwesomeIcon icon={faArrowRight} />
                        </span>
                    </h1>
                    <div>
                        <UserAvatar
                            avatarImage={highlight.profile?.avatar_image}
                            displayName={highlight.profile?.display_name}
                            style={{ viewTransitionName: `highlight-avatar-${highlight.id}` }}
                        />
                    </div>
                </div>

                <p
                    className="line-clamp-6 max-w-full"
                    style={{ viewTransitionName: `highlight-content-${highlight.id}` }}
                >
                    {highlight.content}
                </p>

                <div className="flex flex-row gap-2 items-center justify-center">
                    <PrevButton onClick={handlePrevClick} disabled={prevBtnDisabled} />

                    <Button
                        ref={togglePlaybackButtonRef}
                        onClick={handleListenClick}
                        className="bg-slate-500/20 backdrop-blur-sm text-foreground px-4 py-2 h-12 w-20 rounded hover:scale-105 transition-all duration-300"
                        style={{
                            viewTransitionName: `highlight-listen-${highlight.id}`,
                        }}
                    >
                        {audioSrc === highlight.mp3_url ? "Stop" : "Listen"}
                    </Button>

                    <NextButton onClick={handleNextClick} disabled={nextBtnDisabled} />
                </div>
            </div>
        </Link>
    );
};

export default HighlightCard;
