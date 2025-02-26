const KeyboardShortcutList = () => {
    return (
        <ul className="flex flex-col gap-4 p-2">
            <li>
                <p>
                    Press{" "}
                    <kbd className="rounded-md bg-secondary p-1 mx-1 border border-secondary-foreground text-sm font-medium">
                        k
                    </kbd>{" "}
                    to read the current highlight audio aloud.
                </p>
            </li>
            <li>
                <p>
                    Press{" "}
                    <kbd className="rounded-md bg-secondary p-1 mx-1 border border-secondary-foreground text-sm font-medium">
                        spacebar
                    </kbd>{" "}
                    to play/pause the current highlight audio.
                </p>
            </li>
            <li>
                <p className="flex flex-row items-center">
                    Use{" "}
                    <div className="flex flex-row gap-1 mx-1">
                        <kbd className="rounded-md bg-secondary p-1 border border-secondary-foreground text-sm font-medium">
                            {`←`}
                        </kbd>{" "}
                        <kbd className="rounded-md bg-secondary p-1 border border-secondary-foreground text-sm font-medium">
                            {`→`}
                        </kbd>{" "}
                    </div>
                    to seek forward and backwards in the audio by 5 seconds.
                </p>
            </li>
            <li>
                <p className="flex flex-row items-center">
                    Use{" "}
                    <div className="flex flex-row gap-1 mx-1">
                        <kbd className="rounded-md bg-secondary p-1 border border-secondary-foreground text-sm font-medium">
                            {`↓`}
                        </kbd>{" "}
                        <kbd className="rounded-md bg-secondary p-1 border border-secondary-foreground text-sm font-medium">
                            {`↑`}
                        </kbd>{" "}
                    </div>
                    to visit next/previous highlight.
                </p>
            </li>
        </ul>
    );
};

export default KeyboardShortcutList;
