import HighlightCardHolder from "@/components/HighlightCardHolder";

const Home = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/highlights`);

    if (!res.ok) {
        console.error("Error fetching highlights", res.statusText);
        return <div>Error loading highlights</div>;
    }

    const highlights = await res.json();

    return (
        <div className="flex flex-col gap-4">
            <HighlightCardHolder highlights={highlights} />
        </div>
    );
}

export default Home;
