"use client";

import React from "react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { PrevButton, NextButton, usePrevNextButtons } from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import HighlightCard from "@/components/HighlightCard";
import "./embla.css";

const EmblaCarousel = (props) => {
    const { highlights, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [WheelGesturesPlugin()]);

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
        usePrevNextButtons(emblaApi);

    return (
        <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {highlights.map((highlight, index) => (
                        <div className="embla__slide" key={index}>
                            <HighlightCard highlight={highlight} />
                        </div>
                    ))}
                </div>

                <div className="embla__controls">
                    <div className="embla__buttons">
                        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                    </div>
                </div>

                {/* <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={"embla__dot".concat(
                                index === selectedIndex ? " embla__dot--selected" : ""
                            )}
                        />
                    ))}
                </div> */}
            </div>
        </section>
    );
};

export default EmblaCarousel;
