const FullAudioPlayerPageLayout = ({ children }) => {
    return (
        <div className="mt-[48px] h-[calc(100vh-48px)] w-full flex flex-col items-center justify-start">
            {children}
        </div>
    );
};

export default FullAudioPlayerPageLayout;
