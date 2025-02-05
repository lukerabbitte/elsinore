import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = ({ avatarImage, displayName }) => {
    return (
        <div className="flex flex-row items-center gap-2">
            <Avatar>
                <AvatarImage src={avatarImage} />
                <AvatarFallback>
                    <div className="w-full h-full rounded-full backdrop-blur-xl bg-slate-500/30"></div>
                </AvatarFallback>
            </Avatar>
            <span className="lg:font-medium text-right text-balance">{displayName}</span>
        </div>
    );
};

export default UserAvatar;
