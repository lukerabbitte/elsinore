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
                <div className="space-x-8 z-30 text-lg">
                    <Link href="/" className="text-primary">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <FontAwesomeIcon icon={faHome} />
                                </TooltipTrigger>
                                <div className="hidden lg:inline-block">
                                    <TooltipContent>
                                        <p>Home</p>
                                    </TooltipContent>
                                </div>
                            </Tooltip>
                        </TooltipProvider>
                    </Link>
                    <Link href="/edit" className="text-primary">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <FontAwesomeIcon icon={faPlus} />
                                </TooltipTrigger>
                                <div className="hidden lg:inline-block">
                                    <TooltipContent>
                                        <p>Add Highlight</p>
                                    </TooltipContent>
                                </div>
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
