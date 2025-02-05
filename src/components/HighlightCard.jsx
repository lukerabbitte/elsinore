"use client";
import React, { useContext } from "react";
import UserAvatar from "@/components/UserAvatar";
import { AudioContext } from "@/app/layout";

const HighlightCard = ({ highlight }) => {
    const { setAudioSrc } = useContext(AudioContext);

    const handleListenClick = () => {
        setAudioSrc(highlight.mp3_url);
    };

    return (
        <div className="bg-accent h-[80%] sm:h-full p-4 flex flex-col gap-4 justify-between">
            <div className="flex flex-row items-center justify-between w-full gap-4">
                <h1 className="font-semibold lg:font-extrabold text-2xl text-balance">
                    {highlight.title}
                </h1>
                <div>
                    <UserAvatar
                        avatarImage={highlight.profile?.avatar_image}
                        displayName={highlight.profile?.display_name}
                    />
                </div>
            </div>
            <p className="line-clamp-3 max-w-full">{highlight.content}</p>
            <button
                onClick={handleListenClick}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Listen
            </button>
        </div>
    );
};

export default HighlightCard;
