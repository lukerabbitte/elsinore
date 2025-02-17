"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className="relative h-[48px]">
            <div className="absolute top-0 w-full h-[48px] bg-blur-gradient-to-top-md pointer-events-none"></div>
            <div className="w-full h-full flex flex-row justify-between items-center p-4 pointer-events-auto">
                <div className="space-x-2 z-30">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link
                                    href="/"
                                    className={`transition-transform text-md duration-950 w-9 h-8 flex items-center justify-center rounded-full ${
                                        pathname === "/"
                                            ? "text-primary-foreground scale-90 bg-input"
                                            : "text-primary"
                                    }`}
                                >
                                    <FontAwesomeIcon icon={faHome} />
                                </Link>
                            </TooltipTrigger>
                            <div className="hidden lg:inline-block">
                                <TooltipContent>
                                    <p>Home</p>
                                </TooltipContent>
                            </div>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link
                                    href="/edit"
                                    className={`transition-transform text-lg duration-950 w-9 h-8 flex items-center justify-center rounded-full ${
                                        pathname === "/edit"
                                            ? "text-primary-foreground scale-90 bg-input"
                                            : "text-primary"
                                    }`}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </Link>
                            </TooltipTrigger>
                            <div className="hidden lg:inline-block">
                                <TooltipContent>
                                    <p>Add Highlight</p>
                                </TooltipContent>
                            </div>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="z-30">
                    <Switch
                        checked={theme === "dark"}
                        onCheckedChange={toggleTheme}
                        className={"transition-colors duration-500"}
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
