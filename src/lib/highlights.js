import { supabase } from "@/lib/supabase";
import { generateSlug } from "@/lib/utils";
import { generateAudio } from "@/lib/audioGeneration";
import { saveAudio } from "@/lib/audioStorage";

export const createHighlight = async (values) => {
    const { title, content, fullTextUrl, wikipediaUrl, voiceId } = values;

    const userId = "43725733-9ce0-4e44-b527-27764e673a97"; // TODO remove, obvs this is silly

    try {
        // Validate mandatory inputs
        if (!userId || !title || !content || !voiceId) {
            throw new Error("Missing required fields: userId, title, content, or voiceId");
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
            throw new Error(`Audio generation failed: ${audioError.message}`);
        }

        // Only proceed to storage if we have valid audio
        let mp3_url;
        try {
            mp3_url = await saveAudio({ highlightFilename: slug, audioBlob });
        } catch (storageError) {
            console.error("Storage save failed:", storageError);
            throw new Error(`Storage save failed: ${storageError.message}`);
        }

        // Create the highlight
        const highlightData = {
            user_id: userId,
            slug,
            title,
            content,
            full_text_url: fullTextUrl,
            wikipedia_url: wikipediaUrl,
            mp3_url,
            elevenlabs_voice_id: voiceId,
        };

        const { data, error } = await supabase.from("highlight").insert([highlightData]).single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error("Error creating highlight:", error);
        throw error;
    }
};

export const updateHighlightContent = async (highlightId, content) => {
    try {
        const { data, error } = await supabase
            .from("highlight")
            .update({ content })
            .eq("id", highlightId)
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error("Error updating highlight content:", error);
        throw error;
    }
};

export const updateHighlightMP3 = async (highlightId, mp3_url) => {
    try {
        const { data, error } = await supabase
            .from("highlight")
            .update({ mp3_url })
            .eq("id", highlightId)
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error("Error updating highlight MP3 url:", error);
        throw error;
    }
};

export const deleteHighlight = async (highlightId) => {
    try {
        const { data, error } = await supabase.from("highlight").delete().eq("id", highlightId);

        if (error) throw error;

        return data;
    } catch (error) {
        console.error("Error deleting highlight:", error);
        throw error;
    }
};

// Function to fetch all highlights with user profile information from join
export const getAllHighlights = async () => {
    try {
        const { data, error } = await supabase
            .from("highlight")
            .select(
                `
                *,
                profile:profile (
                    avatar_image,
                    display_name
                )
            `
            )
            .order("created_at", { ascending: false });

        if (error) throw error;

        return data;
    } catch (error) {
        console.error("Error fetching highlights:", error);
        throw error;
    }
};

// Function to fetch a highlight by ID
export const getHighlightBySlug = async (highlightSlug) => {
    try {
        const { data, error } = await supabase
            .from("highlight")
            .select("*")
            .eq("slug", highlightSlug)
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error("Error fetching highlight by slug:", error);
        throw error;
    }
};
