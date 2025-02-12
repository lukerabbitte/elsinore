"use client";

import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { debounce } from "@/lib/utils";

const AudioPlayer = ({ audioSrc, onEnded, currentRoute }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [metadataLoaded, setMetadataLoaded] = useState(false);

    useEffect(() => {
        if (audioSrc) {
            setMetadataLoaded(false);
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
            setMetadataLoaded(false);
        }
    }, [audioSrc]);

    // Hijack spacebar and arrow left and right events while audio is playing and metadata is loaded
    useEffect(() => {
        if (!metadataLoaded) return;

        const handleKeyDown = (event) => {
            if (!audioSrc) return;

            switch (event.key) {
                case " ":
                    event.preventDefault();
                    togglePlayPause();
                    break;
                case "ArrowLeft":
                    event.preventDefault();
                    debouncedSeekBy(-5);
                    break;
                case "ArrowRight":
                    event.preventDefault();
                    debouncedSeekBy(5);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [audioSrc, isPlaying, metadataLoaded]);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handlePlaybackRateChange = (value) => {
        const rate = parseFloat(value);
        audioRef.current.playbackRate = rate;
        setPlaybackRate(rate);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleSeek = (value) => {
        const time = parseFloat(value[0]);
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
        setMetadataLoaded(true);
    };

    const seekBy = (seconds) => {
        const newTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const debouncedSeekBy = debounce(seekBy, 50);

    return (
        <div className="relative text-foreground flex flex-col gap-4 items-center justify-center h-[110px]">
            
            {/* Background blur used on homepage for immersive effect while scrolling, not really needed elsewhere */}
            {(currentRoute === "/" || audioSrc) && (
                <div className="absolute bottom-0 w-full h-full bg-blur-gradient-md"></div>
            )}

            <div className="z-30 w-full">
                <audio
                    ref={audioRef}
                    src={audioSrc}
                    onEnded={onEnded}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                />
                <AnimatePresence>
                    {audioSrc && (
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-4 w-full px-4 py-4"
                        >
                            <div className="flex items-center justify-between w-full">
                                <button
                                    onClick={togglePlayPause}
                                    className="text-2xl text-primary text-left w-1/4 sm:w-48 mr-4"
                                >
                                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                                </button>
                                <Select
                                    onValueChange={(value) => handlePlaybackRateChange(value)}
                                    value={playbackRate.toString()}
                                >
                                    <SelectTrigger className="ml-4 w-1/4 sm:w-48">
                                        <SelectValue placeholder="Select playback rate" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="0.5">0.5x</SelectItem>
                                            <SelectItem value="1">1x</SelectItem>
                                            <SelectItem value="1.5">1.5x</SelectItem>
                                            <SelectItem value="2">2x</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <Slider
                                    value={[currentTime]}
                                    onValueChange={handleSeek}
                                    min={0}
                                    max={duration}
                                />
                                <div className="flex justify-between w-full text-sm">
                                    <span>
                                        {new Date(currentTime * 1000).toISOString().substr(11, 8)}
                                    </span>
                                    <span>
                                        {new Date(duration * 1000).toISOString().substr(11, 8)}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AudioPlayer;
