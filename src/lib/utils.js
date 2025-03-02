import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const generateSlug = (title) => {
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    const timestamp = Date.now();
    return `${slug}-${timestamp}`;
};

export const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

export const isPageWithShortcutsAllowed = (pathname) => {
    if (pathname === "/" || pathname.startsWith("/highlight/")) return true;

    return false;
};
