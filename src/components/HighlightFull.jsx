"use client";
import React, { useContext, useRef, useEffect } from "react";
import UserAvatar from "@/components/UserAvatar";
import { useAudioContext } from "@/components/AudioContextProvider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "@/components/ui/badge";

const HighlightFull = ({ highlight }) => {
    const { audioSrc, setAudioSrc, setCurrentlyPlayingTitle } = useAudioContext();
    const togglePlaybackButtonRef = useRef(null);

    const handleListenClick = (e) => {
        if (audioSrc === highlight.mp3_url) {
            setAudioSrc(null); // Stop the audio if it's already playing
            setCurrentlyPlayingTitle(null);
        } else {
            setAudioSrc(highlight.mp3_url); // Play the selected audio
            setCurrentlyPlayingTitle(highlight.title);
        }
    };

    // Override k button
    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case "k":
                    event.preventDefault();
                    togglePlaybackButtonRef.current.focus();
                    handleListenClick(event);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [audioSrc]);

    return (
        <div
            className="bg-gradient-radial max-w-prose lg:w-auto rounded-xl p-4 flex flex-row justify-center"
            style={{ viewTransitionName: `highlight-background-${highlight.id}` }}
        >
            <div className="max-w-prose flex flex-col gap-8 items-center">
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex flex-row items-center justify-between w-full gap-4">
                        <h1
                            className="font-semibold lg:font-extrabold text-foreground text-2xl text-balance"
                            style={{
                                viewTransitionName: `highlight-title-${highlight.id}`,
                            }}
                        >
                            {highlight.title}
                        </h1>
                        <div>
                            <UserAvatar
                                avatarImage={highlight.profile?.avatar_image}
                                displayName={highlight.profile?.display_name}
                                style={{
                                    viewTransitionName: `highlight-avatar-${highlight.id}`,
                                }}
                            />
                        </div>
                    </div>
                    {highlight.full_text_url && (
                        <a href={highlight.full_text_url} target="_blank">
                            <Badge className="transition-all duration-300 hover:scale-[98%] hover:opacity-90">
                                <p>
                                    Read Source
                                    <span className="ml-2">
                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                    </span>
                                </p>
                            </Badge>
                        </a>
                    )}
                </div>

                <p
                    className="max-w-full"
                    style={{ viewTransitionName: `highlight-content-${highlight.id}` }}
                >
                    {highlight.content}
                </p>

                {highlight.mp3_url && (
                    <div className="flex flex-col gap-2 items-center justify-center">
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default HighlightFull;
