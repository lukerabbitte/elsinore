import React from "react";
import EmblaCarousel from "@/components/embla/EmblaCarousel";

const HighlightCardHolder = ({ highlights }) => {

    return (
        <div>
            {!highlights ? (
                <div>
                    <p className="text-center text-lg">Loading...</p>
                </div>
            ) : (
                <div>
                    <EmblaCarousel options={{ axis: "y", duration: 20 }} highlights={highlights} />
                </div>
            )}
        </div>
    );
};

export default HighlightCardHolder;
