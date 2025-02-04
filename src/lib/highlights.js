import { supabase } from "@/lib/supabase";

export const createHighlight = async ({
    user_id,
    title,
    content,
    full_text_url,
    wikipedia_url,
    mp3_url,
    slug,
    book_id,
}) => {
    try {
        const { data, error } = await supabase
            .from("highlight")
            .insert([
                {
                    user_id,
                    title,
                    content,
                    full_text_url,
                    wikipedia_url,
                    mp3_url,
                    slug,
                    book_id,
                },
            ])
            .single();

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
        const { data, error } = await supabase.from("highlight").select(`
                *,
                profile:profile (
                    avatar_image,
                    display_name
                )
            `);

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
