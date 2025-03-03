import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "rounded-full border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                secondary:
                    "rounded-full border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "rounded-full border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                outline: "rounded-full text-foreground",
                noRounding: "rounded-none border-none bg-primary text-primary-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

function Badge({ className, variant, ...props }) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
