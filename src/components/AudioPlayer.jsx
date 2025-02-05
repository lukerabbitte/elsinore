"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const AudioPlayer = ({ audioSrc, onEnded }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (audioSrc) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [audioSrc]);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handlePlaybackRateChange = (event) => {
        const rate = parseFloat(event.target.value);
        audioRef.current.playbackRate = rate;
        setPlaybackRate(rate);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleSeek = (event) => {
        const time = parseFloat(event.target.value);
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-secondary text-foreground flex flex-col items-center"
        >
            <audio
                ref={audioRef}
                src={audioSrc}
                onEnded={onEnded}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />
            <div className="flex items-center justify-between w-full mb-2">
                <button onClick={togglePlayPause} className="mr-4">
                    {isPlaying ? "Pause" : "Play"}
                </button>
                <label>
                    Playback Rate:
                    <select
                        value={playbackRate}
                        onChange={handlePlaybackRateChange}
                        className="ml-2"
                    >
                        <option value="0.5">0.5x</option>
                        <option value="1">1x</option>
                        <option value="1.5">1.5x</option>
                        <option value="2">2x</option>
                    </select>
                </label>
            </div>
            <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="w-full"
            />
            <div className="flex justify-between w-full text-sm">
                <span>{new Date(currentTime * 1000).toISOString().substr(11, 8)}</span>
                <span>{new Date(duration * 1000).toISOString().substr(11, 8)}</span>
            </div>
        </motion.div>
    );
};

export default AudioPlayer;
