import { supabase } from "@/lib/supabase";

export const saveAudio = async ({ highlightFilename, audioBlob }) => {
    const fileName = `highlights/${highlightFilename}.mp3`;

    const { data, error } = await supabase.storage.from("audio-files").upload(fileName, audioBlob, {
        upsert: true,
    });

    if (error) throw error;
    return data.path;
};

export const getAudioByHighlightFilename = (highlightFilename) => {
    const filePath = `highlights/${highlightFilename}.mp3`;

    const {
        data: { publicUrl },
        error,
    } = supabase.storage.from("audio-files").getPublicUrl(filePath);

    if (error) throw error;
    return publicUrl;
};

export const getAllHighlightAudio = async ({
    selectedSortOption = "created_at",
    selectedOrder = "desc",
}) => {
    const { data, error } = await supabase.storage.from("audio-files").list("highlights", {
        sortBy: { column: selectedSortOption, order: selectedOrder },
    });

    if (error) {
        console.error("Storage list error:", error);
        throw error;
    }

    // Get public URLs directly for each highlight's MP3
    const audioFiles = data.map((file) => {
        const {
            data: { publicUrl },
            error: urlError,
        } = supabase.storage.from("audio-files").getPublicUrl(`highlights/${file.name}.mp3`);

        if (urlError) {
            console.error(`Error getting public URL for highlight ${file.name}:`, urlError);
            return null;
        }

        const highlightFilename = file.name.replace(".mp3", "");

        return {
            highlightFilename,
            url: publicUrl,
            created_at: file.created_at,
            last_modified: file.last_modified,
        };
    });

    return audioFiles.filter(Boolean);
};
