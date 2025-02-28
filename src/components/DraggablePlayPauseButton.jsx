import Draggable from "react-draggable";
import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faGripVertical, faG } from "@fortawesome/free-solid-svg-icons";
import { useAudioContext } from "@/components/AudioContextProvider";
import { motion, AnimatePresence } from "framer-motion";

const DraggablePlayPauseButton = ({ handleSimulaltedClick, isPlaying }) => {
    const { currentlyPlayingTitle, audioSrc } = useAudioContext();

    const [dragInfo, setDragInfo] = useState(null);

    const handleDragStart = (event, data) => {
        setDragInfo({ x: data.x, y: data.y, time: Date.now() });
    };

    const handleDragStop = (event, data) => {
        if (!dragInfo) return;

        const delta = {
            x: Math.abs(data.x - dragInfo.x),
            y: Math.abs(data.y - dragInfo.y),
            time: Date.now() - dragInfo.time,
        };

        // https://github.com/react-grid-layout/react-draggable/issues/550
        // Issue with onClick events within react-draggable, so we simulate a "click" as a very quick (<=300ms) drag that travels at most by x=10 and y=10
        if (delta.x <= 10 && delta.y <= 10 && delta.time <= 300) handleSimulaltedClick();
    };

    return (
        <AnimatePresence>
            {audioSrc && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4"
                >
                    <Draggable onStart={handleDragStart} onStop={handleDragStop}>
                        <div className="max-w-64 h-16 p-4 bg-blue-900/20 dark:bg-blue-200/20 backdrop-blur-sm rounded-xl flex flex-row gap-2 items-center justify-between shadow-xl cursor-pointer z-50">
                            <div className="w-5/6 flex flex-row gap-2 items-center justify-start">
                                <div className="flex flex-row gap-1 items-center">
                                    <button className="text-2xl text-primary min-w-6 text-left">
                                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                                    </button>
                                    <span className="text-xs line-clamp-2 text-balance max-w-full">
                                        {currentlyPlayingTitle}
                                    </span>
                                </div>

                                <div className="w-6">
                                    <AnimatePresence>
                                        {isPlaying && (
                                            <motion.div
                                                className="flex items-center ml-auto"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="sound-wave-bar bg-primary rounded-md"></div>
                                                <div className="sound-wave-bar bg-primary rounded-md"></div>
                                                <div className="sound-wave-bar bg-primary rounded-md"></div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="w-1/6 flex flex-row items-center justify-end cursor-grab">
                                <div className="bg-blue-900/40 dark:bg-blue-200/40 w-8 h-8 aspect-square flex flex-row items-center justify-center rounded-md">
                                    <span className="text-xl text-primary">
                                        <FontAwesomeIcon icon={faGripVertical} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Draggable>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DraggablePlayPauseButton;
