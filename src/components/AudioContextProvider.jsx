"use client";

import { useState, createContext, useContext } from "react";

export const AudioContext = createContext();

export const AudioContextProvider = ({ children }) => {
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

export const useAudioContext = () => {
    return useContext(AudioContext);
}