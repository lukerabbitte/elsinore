const Home = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/highlights`);

    if (!res.ok) {
        console.error("Error fetching highlights", res.statusText);
        return <div>Error loading highlights</div>;
    }

    const highlights = await res.json();

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl">Highlights</h1>
            {highlights?.map((highlight) => (
                <div key={highlight.id} className="p-4 border-2 rounded-xl">
                    <h1 className="font-black">{highlight.title}</h1>
                    <p>{highlight.content}</p>
                </div>
            ))}
        </div>
    );
}

export default Home;
