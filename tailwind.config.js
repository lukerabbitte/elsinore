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
                muted: {
                    DEFAULT: "var(--muted-background)",
                    foreground: "var(--muted-foreground)",
                },
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
                formfield: {
                    DEFAULT: "var(--form-field)",
                    foreground: "var(--form-field-foreground)",
                },
                border: "var(--border)",
                input: "var(--input)",
                "input-selected": "var(--input-selected)",
                ring: "var(--ring)",
                destructive: "var(--destructive)",
                chart: {
                    1: "var(--chart-1)",
                    2: "var(--chart-2)",
                    3: "var(--chart-3)",
                    4: "var(--chart-4)",
                    5: "var(--chart-5)",
                },
            },
            screens: {
                xxs: "340px",
                xs: "480px",
                "3xl": "1920px",
            },
            height: {
                "screen-minus-padding-and-navbar": "calc(100vh - 3rem - 3rem)",
                "screen-minus-padding-and-navbar-and-footer": "calc(100vh - 3rem - 6rem)",
                "screen-minus-audio-player": "calc(100vh - 110px)",
                "screen-minus-audio-player-and-navbar": "calc(100vh - 110px - 48px)",
            },
            maxHeight: {
                144: "36rem",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
