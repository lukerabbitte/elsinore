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
        <div className="flex flex-row justify-end items-center h-12 px-4 bg-primary">
            <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                className={"transition-colors duration-500"}
            />
        </div>
    );
};

export default Navbar;
