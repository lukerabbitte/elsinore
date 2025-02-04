const HighlightCard = ({ highlight }) => {
    return (
        <div class="bg-accent h-5/6 sm:h-full p-4 rounded-xl flex flex-col gap-4">
            <h1 class="font-black text-3xl">{highlight.title}</h1>
            {/* <p>{highlight.content}</p> */}
            <p>{highlight.mp3_url}</p>
        </div>
    );
};

export default HighlightCard;
