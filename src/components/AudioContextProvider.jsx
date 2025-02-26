"use client";

import { useState, createContext } from "react";

export const AudioContext = createContext();

const AudioContextProvider = ({ children }) => {
    const [audioSrc, setAudioSrc] = useState(null);
    const [currentlyPlayingTitle, setCurrentlyPlayingTitle] = useState(null);
    const [audioEnded, setAudioEnded] = useState(false);

    const handleAudioEnded = () => {
        setAudioSrc(null);
        setCurrentlyPlayingTitle(null);
        setAudioEnded(true);
    };

    return (
        <AudioContext.Provider
            value={{
                audioSrc,
                setAudioSrc,
                currentlyPlayingTitle,
                setCurrentlyPlayingTitle,
                audioEnded,
                setAudioEnded,
                handleAudioEnded
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};

export default AudioContextProvider;
