import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const UserAvatar = ({ avatarImage, displayName }) => {
    return (
        <div className="flex flex-row items-center gap-2">
            <Avatar>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <AvatarImage src={avatarImage} className="w-full h-full rounded-full"/>
                </motion.div>
                <AvatarFallback>
                    <div className="w-full h-full rounded-full bg-formfield"></div>
                </AvatarFallback>
            </Avatar>
            <span className="lg:font-medium text-right text-balance">{displayName}</span>
        </div>
    );
};

export default UserAvatar;
