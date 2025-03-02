import HighlightFull from "@/components/HighlightFull";
import { getHighlightBySlug } from "@/lib/highlights";
import FloatingAudioPlayerPageLayout from "@/components/layouts/FloatingAudioPlayerPageLayout";

const HighlightPage = async ({ params }) => {
    const { slug } = params;

    const highlight = await getHighlightBySlug(slug);

    return (
        <FloatingAudioPlayerPageLayout>
            <div className="flex flex-col items-center justify-start p-0 lg:p-4 w-full h-full bg-gradient-radial-reverse rounded-xl">
                <HighlightFull highlight={highlight} />
            </div>
        </FloatingAudioPlayerPageLayout>
    );
};

export default HighlightPage;
