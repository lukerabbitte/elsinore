"use client";

import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

const ThemeToggle = ({ isMounted }) => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return isMounted ? (
        <Switch
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
            className="transition-colors duration-500"
        />
    ) : (
        <Switch disabled />
    );
};

export default ThemeToggle;
