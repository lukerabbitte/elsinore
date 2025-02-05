/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class", // Enable class-based dark mode (using `.dark` class)
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
                popover: {
                    DEFAULT: "var(--popover)",
                    foreground: "var(--popover-foreground)",
                },
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                },
                border: "var(--border)",
                input: "var(--input)",
                "input-selected": "var(--input-selected)", // Added input-selected color
                ring: "var(--ring)", // Keep ring color for focus states
                chart: {
                    1: "var(--chart-1)",
                    2: "var(--chart-2)",
                    3: "var(--chart-3)",
                    4: "var(--chart-4)",
                    5: "var(--chart-5)",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            screens: {
                xxs: "340px",
                xs: "480px",
                "3xl": "1920px",
            },
            height: {
                "screen-minus-padding-and-navbar": "calc(100vh - 3rem - 3rem)",
                "screen-minus-padding-and-navbar-and-footer": "calc(100vh - 3rem - 6rem)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
