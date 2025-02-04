import { generateAudio } from "@/lib/audioGeneration";
import { saveAudio, getAudioByHighlightId, getAllHighlightAudio } from "@/lib/audioStorage";

export async function POST(request) {
    try {
        const { highlightId, text, voiceId } = await request.json();

        // Validate inputs
        if (!highlightId || !text || !voiceId) {
            return Response.json(
                {
                    success: false,
                    error: "Missing required fields: highlightId, text, or voiceId",
                },
                { status: 400 }
            );
        }

        // Generate the audio blob
        let audioBlob;
        try {
            audioBlob = await generateAudio({ text, voiceId });

            // Validate the audio blob
            if (!audioBlob || audioBlob.size === 0) {
                throw new Error("Generated audio is empty or invalid");
            }
        } catch (audioError) {
            console.error("Audio generation failed:", audioError);
            return Response.json(
                {
                    success: false,
                    error: `Audio generation failed: ${audioError.message}`,
                    step: "generation",
                },
                { status: 500 }
            );
        }

        // Only proceed to storage if we have valid audio
        try {
            const url = await saveAudio({ highlightId, audioBlob });
            return Response.json({
                success: true,
                url,
            });
        } catch (storageError) {
            console.error("Storage save failed:", storageError);
            return Response.json(
                {
                    success: false,
                    error: `Storage save failed: ${storageError.message}`,
                    step: "storage",
                },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("General request error:", error);
        return Response.json(
            {
                success: false,
                error: `Request failed: ${error.message}`,
                step: "request",
            },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const highlightId = searchParams.get("highlightId");

        if (highlightId) {
            // Get specific highlight audio
            const url = await getAudioByHighlightId(highlightId);
            return Response.json({
                success: true,
                url,
            });
        } else {
            // Get all highlight audio files
            const audioFiles = await getAllHighlightAudio({
                selectedSortOption: "created_at",
                selectedOrder: "desc",
            });
            return Response.json({
                success: true,
                audioFiles,
            });
        }
    } catch (error) {
        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}
