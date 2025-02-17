"use client";

import React, { useEffect, useContext } from "react";
import { AudioContext } from "@/app/layout";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { PrevButton, NextButton, usePrevNextButtons } from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import HighlightCard from "@/components/HighlightCard";
import "./embla.css";

const EmblaCarousel = (props) => {
    const {
        audioSrc,
        setAudioSrc,
        currentlyPlayingTitle,
        setCurrentlyPlayingTitle,
        audioEnded,
        setAudioEnded,
    } = useContext(AudioContext);

    const { highlights, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [WheelGesturesPlugin()]);

    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
        usePrevNextButtons(emblaApi);

    const { selectedIndex } = useDotButton(emblaApi);

    useEffect(() => {
        if (audioEnded) {
            if (emblaApi) {
                const nextIndex = selectedIndex + 1 < highlights.length ? selectedIndex + 1 : null;
                if (nextIndex) {
                    emblaApi.scrollTo(nextIndex);
                    setTimeout(() => {
                        setAudioSrc(highlights[nextIndex].mp3_url);
                        setCurrentlyPlayingTitle(highlights[nextIndex].title);
                        set;
                    }, 2000);
                }
            }
            setAudioEnded(false);
        }
    }, [audioEnded, emblaApi]);

    // Hijack up and down arrow to navigate through cards
    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case "ArrowUp":
                    event.preventDefault();
                    onPrevButtonClick();
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    onNextButtonClick();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onPrevButtonClick, onNextButtonClick]);

    return (
        <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {highlights.map((highlight, index) => (
                        <div className="embla__slide" key={highlight.id}>
                            <HighlightCard
                                highlight={highlight}
                                onPrevButtonClick={onPrevButtonClick}
                                onNextButtonClick={onNextButtonClick}
                                prevBtnDisabled={prevBtnDisabled}
                                nextBtnDisabled={nextBtnDisabled}
                                isFocused={index === selectedIndex}
                            />
                        </div>
                    ))}
                </div>

                {/* <div className="embla__controls">
                    <div className="embla__buttons">
                        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                    </div>
                </div> */}

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
