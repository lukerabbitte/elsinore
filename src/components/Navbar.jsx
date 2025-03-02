"use client";

import React, { useState, useEffect } from "react";
import KeyboardShortcutList from "@/components/KeyboardShortcutList";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
    const [activePage, setActivePage] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === "/") {
            setActivePage("home");
        } else if (pathname === "/edit") {
            setActivePage("edit");
        }
    }, [pathname]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleNavClick = (page) => {
        setActivePage(page);
    };

    return (
        <div className="fixed w-full top-0 left-0 right-0 h-[48px] z-50">
            <div className="absolute top-0 w-full h-[48px] bg-blur-gradient-to-top-md pointer-events-none z-10"></div>
            <div className="w-full h-full flex flex-row justify-between items-center p-4 pointer-events-auto">
                <div className="space-x-2 z-30">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link
                                    href="/"
                                    className={`transition-transform text-md duration-300 w-9 h-8 flex items-center justify-center rounded-full ${
                                        activePage === "home"
                                            ? "text-primary-foreground scale-90 bg-input"
                                            : "text-primary"
                                    }`}
                                    onClick={() => handleNavClick("home")}
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
                                    className={`transition-transform text-lg duration-300 w-9 h-8 flex items-center justify-center rounded-full ${
                                        activePage === "edit"
                                            ? "text-primary-foreground scale-90 bg-input"
                                            : "text-primary"
                                    }`}
                                    onClick={() => handleNavClick("edit")}
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
                    {pathname === "/" && (
                        <div className="hidden lg:inline-block">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className="w-9 h-8 flex items-center justify-center text-primary hover:text-input transition-transform duration-300 hover:scale-90">
                                            <FontAwesomeIcon icon={faQuestion} />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <KeyboardShortcutList />
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    )}
                </div>
                <div className="z-30">
                    <ThemeToggle isMounted={isMounted} />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
