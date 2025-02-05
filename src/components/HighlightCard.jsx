"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserAvatar from "@/components/UserAvatar";

const HighlightCard = ({ highlight }) => {
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
            <p>{highlight.mp3_url}</p> {/* replace with audio player component with playback rate controls, play pause */}
        </div>
    );
};

export default HighlightCard;
