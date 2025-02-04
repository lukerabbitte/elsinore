"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const HighlightCard = ({ highlight }) => {

    return (
        <div className="bg-accent h-[80%] sm:h-full p-4 flex flex-col gap-4">
            <h1 className="font-black text-2xl sm:text-xl text-center">{highlight.title}</h1>

            <div className="flex flex-row items-center gap-2">
                <Avatar>
                    <AvatarImage src={highlight.profile?.avatar_image} />
                    <AvatarFallback>
                        <div className="w-full h-full rounded-full backdrop-blur-xl bg-slate-500/30"></div>
                    </AvatarFallback>
                </Avatar>
                <span className="font-medium">{highlight.profile?.display_name}</span>
            </div>

            <p className="line-clamp-3 max-w-full">{highlight.content}</p>
            <p>{highlight.mp3_url}</p>
        </div>
    );
};

export default HighlightCard;
