"use client";

import React, { useEffect, useContext, useState, useCallback } from "react";
import { useAudioContext } from "@/components/AudioContextProvider";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { PrevButton, NextButton, usePrevNextButtons } from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import HighlightCard from "@/components/HighlightCard";
import "./embla.css";
import { useCarouselSlideIndexContext } from "@/components/CarouselSlideIndexContextProvider";

const EmblaCarousel = (props) => {
    const {
        audioSrc,
        setAudioSrc,
        currentlyPlayingTitle,
        setCurrentlyPlayingTitle,
        audioEnded,
        setAudioEnded,
    } = useAudioContext();

    // Last slide context to let us navigate away from carousel route and re-assume scroll position when we go back
    const { carouselSlideIndex, setCarouselSlideIndex } = useCarouselSlideIndexContext();

    const { highlights, options } = props;

    const [emblaRef, emblaApi] = useEmblaCarousel(options, [WheelGesturesPlugin()]);
    const { selectedIndex } = useDotButton(emblaApi);

    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
        usePrevNextButtons(emblaApi);

    // Effect which sets up event listeners
    useEffect(() => {
        if (emblaApi) {
            const onSelect = () => {
                const currentIndex = emblaApi.selectedScrollSnap();
                setCarouselSlideIndex(currentIndex);
            };

            emblaApi.on("select", onSelect);

            // Call handler immediately to set the initial index
            onSelect();

            return () => emblaApi.off("select", onSelect);
        }
    }, [emblaApi, setCarouselSlideIndex]);

    // Effect which scrolls to last saved index upon page mount
    useEffect(() => {
        if (emblaApi && carouselSlideIndex) {
            emblaApi.scrollTo(carouselSlideIndex, true);
        }
    }, [emblaApi]);

    useEffect(() => {
        if (audioEnded) {
            if (emblaApi) {
                const nextIndex = selectedIndex + 1 < highlights.length ? selectedIndex + 1 : null;
                if (nextIndex) {
                    emblaApi.scrollTo(nextIndex);
                    setTimeout(() => {
                        setAudioSrc(highlights[nextIndex].mp3_url);
                        setCurrentlyPlayingTitle(highlights[nextIndex].title);
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
