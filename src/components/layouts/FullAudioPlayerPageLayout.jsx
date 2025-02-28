const FullAudioPlayerPageLayout = ({ children }) => {
    return (
        <div className="mt-[48px] max-h-[calc(100vh-110px-48px)] p-4 w-full flex flex-col items-center justify-start">
            {children}
        </div>
    );
};

export default FullAudioPlayerPageLayout;
