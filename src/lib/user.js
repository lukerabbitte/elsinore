import { supabase } from "@/lib/supabase";

export const getUserAvatar = async (userId) => {
    try {
        const { data, error } = await supabase
            .from("profile")
            .select("avatar_image")
            .eq("id", userId)
            .single();

        if (error) {
            throw error;
        }

        return data.avatar_image;
    } catch (error) {
        console.error("Error fetching user avatar:", error);
        return null;
    }
};
