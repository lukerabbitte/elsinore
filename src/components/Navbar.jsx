"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

const Navbar = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className="relative h-[48px]">
            <div className="absolute top-0 w-full h-[48px] bg-blur-gradient-to-top-md"></div>
            <div className="w-full h-full flex flex-row justify-end items-center p-4">
                <Switch
                    checked={theme === "dark"}
                    onCheckedChange={toggleTheme}
                    className={"transition-colors duration-500 z-30"}
                />
            </div>
        </div>
    );
};

export default Navbar;
