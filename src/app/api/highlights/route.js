import { createHighlight, getAllHighlights, getHighlightBySlug } from "@/lib/highlights";
import { generateAudio } from "@/lib/audioGeneration";
import { saveAudio } from "@/lib/audioStorage";
import { generateSlug } from "@/lib/utils";

export async function POST(request) {
    try {
        const { userId, title, content, full_text_url, wikipedia_url, voiceId } =
            await request.json();

        // Validate mandatory inputs
        if (!userId || !title || !content || !voiceId) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Missing required fields: userId, title, content, or voiceId",
                }),
                { status: 400 }
            );
        }

        // Generate the slug
        const slug = generateSlug(title);

        // Generate the audio blob
        let audioBlob;
        try {
            audioBlob = await generateAudio({ text: content, voiceId });

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
        let mp3_url;
        try {
            mp3_url = await saveAudio({ highlightFilename: slug, audioBlob });
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

        // Create the highlight
        const highlightData = {
            user_id: userId,
            title,
            content,
            full_text_url,
            wikipedia_url,
            mp3_url,
            slug,
        };

        const newHighlight = await createHighlight(highlightData);

        return new Response(JSON.stringify(newHighlight), { status: 201 });
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                error: "Error creating highlight",
            }),
            { status: 500 }
        );
    }
}

export async function PUT(req) {
    const { highlightId, content } = await req.json();

    try {
        // Update an existing highlight
        const updatedHighlight = await updateHighlight(highlightId, content);

        return new Response(JSON.stringify(updatedHighlight), { status: 200 });
    } catch (error) {
        return new Response("Error updating highlight", { status: 500 });
    }
}

export async function DELETE(req) {
    const { highlightId } = await req.json();

    try {
        // Delete a highlight
        await deleteHighlight(highlightId);

        return new Response("Highlight deleted", { status: 200 });
    } catch (error) {
        return new Response("Error deleting highlight", { status: 500 });
    }
}

// GET request to fetch a highlight by slug or if no slug given, all highlights
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const highlightSlug = searchParams.get("slug");

    if (highlightSlug) {
        try {
            const highlight = await getHighlightBySlug(highlightSlug);
            if (!highlight) {
                return new Response("Highlight not found", { status: 404 });
            }

            return new Response(JSON.stringify(highlight), { status: 200 });
        } catch (error) {
            console.error("Error fetching highlight by slug:", error);
            return new Response("Error fetching highlight by slug", { status: 500 });
        }
    } else {
        try {
            const highlights = await getAllHighlights();

            return new Response(JSON.stringify(highlights), { status: 200 });
        } catch (error) {
            console.error("Error fetching highlights:", error);
            return new Response("Error fetching highlights", { status: 500 });
        }
    }
}
