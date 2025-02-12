"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Navbar = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className="relative h-[48px]">
            <div className="absolute top-0 w-full h-[48px] bg-blur-gradient-to-top-md"></div>
            <div className="w-full h-full flex flex-row justify-between items-center p-4">
                <div className="space-x-4 z-30">
                    <Link href="/" className="text-primary hover:underline">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <FontAwesomeIcon icon={faHome} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Home</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Link>
                    <Link href="/edit" className="text-primary hover:underline z-30">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <FontAwesomeIcon icon={faPlus} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Add Highlight</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Link>
                </div>
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
