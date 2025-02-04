const HighlightCard = ( { highlight }) => {

    return (
        <div class="bg-accent p-4 rounded-xl flex flex-col gap-4">
            <h1 class="font-black text-3xl">Highlight</h1>
            <p>{highlight.content}</p>
        </div>
    )
}

export default HighlightCard;