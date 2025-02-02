// app/api/highlights/db.js
import { supabase } from "@/lib/supabase";

export const createHighlight = async (userId, excerptId, content) => {
    try {
        const { data, error } = await supabase
            .from("highlight")
            .insert([
                {
                    user_id: userId,
                    excerpt_id: excerptId,
                    content: content,
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

export const updateHighlight = async (highlightId, content) => {
    try {
        const { data, error } = await supabase
            .from("highlight")
            .update({ content })
            .eq("id", highlightId)
            .single();

        if (error) throw error;

        return data;
    } catch (error) {
        console.error("Error updating highlight:", error);
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

// Function to fetch all highlights
export const getAllHighlights = async () => {
    try {
        const { data, error } = await supabase.from("highlight").select("*");

        if (error) throw error;

        return data;
    } catch (error) {
        console.error("Error fetching highlights:", error);
        throw error;
    }
};

// Function to fetch a highlight by ID
export const getHighlightById = async (highlightId) => {
    try {
        const { data, error } = await supabase
            .from('highlights')
            .select('*')
            .eq('id', highlightId)
            .single()

        if (error) throw error

        return data
    } catch (error) {
        console.error('Error fetching highlight by ID:', error)
        throw error
    }
}