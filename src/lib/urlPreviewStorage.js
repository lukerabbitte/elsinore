import { supabase } from "@/lib/supabase";

export const saveURLPreview = () => {

    const fileName = `highlights/${highlightFilename}.mp3`;

    const { data, error } = await supabase.storage.from("audio-files").upload(fileName, audioBlob, {
        upsert: true,
    });

    if (error) throw error;

    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/audio-files/${data.path}`;
}