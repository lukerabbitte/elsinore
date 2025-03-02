const FloatingAudioPlayerPageLayout = ({ children }) => {
    return (
        <div className="mt-[48px] p-4 w-full min-h-screen-minus-navbar flex flex-col items-center justify-start">
            {children}
        </div>
    );
};

export default FloatingAudioPlayerPageLayout;
