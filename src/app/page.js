import HighlightCardHolder from "@/components/HighlightCardHolder";
import { getAllHighlights } from "@/lib/highlights";

const Home = async () => {
    const highlights = await getAllHighlights();

    return (
        <div className="flex flex-row justify-center items-center">
            <div className="w-full h-full">
                <HighlightCardHolder highlights={highlights} />
            </div>
        </div>
    );
};

export default Home;
