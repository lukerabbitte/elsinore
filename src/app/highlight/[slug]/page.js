import FloatingAudioPlayerPageLayout from "@/components/layouts/FloatingAudioPlayerPageLayout";
import HighlightFull from "@/components/HighlightFull";
import { getHighlightBySlug } from "@/lib/highlights";

const HighlightPage = async ({ params }) => {
    const { slug } = params;

    const highlight = await getHighlightBySlug(slug);

    return (
        <FloatingAudioPlayerPageLayout>
            <HighlightFull highlight={highlight} />
        </FloatingAudioPlayerPageLayout>
    );
};

export default HighlightPage;
