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
        <div className="flex flex-row justify-end items-center h-12 px-4">
            <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                className={"transition-colors duration-500"}
            />
        </div>
    );
};

export default Navbar;
