import React from "react";
import Link from "next/link";
import HighlightCard from "@/components/HighlightCard";

const HighlightCardHolder = ({ highlights }) => {
    return (
        <div>
            {!highlights ? (
                <div>
                    <p className="text-center text-lg">Loading...</p>
                </div>
            ) : (
                <div className="grid gap-4 grid-cols-1">
                    {highlights.map((highlight) => (
                        <Link key={highlight.slug} href={`/highlights/${highlight.slug}`}>
                            <HighlightCard highlight={highlight} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HighlightCardHolder;