"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

const Navbar = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className="flex flex-row justify-end p-4 bg-primary">
            <div className="px-4">
                <Switch
                    checked={theme === "dark"}
                    onCheckedChange={toggleTheme}
                    className={"transition-colors duration-500"}
                />
            </div>
        </div>
    );
};

export default Navbar;
