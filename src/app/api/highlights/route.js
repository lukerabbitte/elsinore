// app/api/highlights/route.js
import { createHighlight, updateHighlight, deleteHighlight, getAllHighlights } from "./db";

export async function POST(req) {
    const { userId, excerptId, content } = await req.json();

    try {
        // Create a new highlight
        const newHighlight = await createHighlight(userId, excerptId, content);

        return new Response(JSON.stringify(newHighlight), { status: 201 });
    } catch (error) {
        return new Response("Error creating highlight", { status: 500 });
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

// GET request to fetch a highlight by ID or if no ID given, all highlights
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const highlightId = searchParams.get("id");

    if (highlightId) {
        try {
            const highlight = await getHighlightById(highlightId);
            if (!highlight) {
                return new Response("Highlight not found", { status: 404 });
            }

            return new Response(JSON.stringify(highlight), { status: 200 });
        } catch (error) {
            return new Response("Error fetching highlight by ID", { status: 500 });
        }
    } else {
        try {
            const highlights = await getAllHighlights();

            return new Response(JSON.stringify(highlights), { status: 200 });
        } catch (error) {
            return new Response("Error fetching highlights", { status: 500 });
        }
    }
}
