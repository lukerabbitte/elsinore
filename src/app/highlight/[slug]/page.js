import FullAudioPlayerPageLayout from "@/components/layouts/FullAudioPlayerPageLayout";
import HighlightFull from "@/components/HighlightFull";
import { getHighlightBySlug } from "@/lib/highlights";

const HighlightPage = async ({ params }) => {
    const { slug } = params;

    const highlight = await getHighlightBySlug(slug);

    return (
        <FullAudioPlayerPageLayout>
            <div className="flex flex-col items-center justify-start w-full">
                <HighlightFull highlight={highlight} />
            </div>
        </FullAudioPlayerPageLayout>
    );
};

export default HighlightPage;
