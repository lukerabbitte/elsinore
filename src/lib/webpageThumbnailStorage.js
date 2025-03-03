import { supabase } from "@/lib/supabase";

export const saveWebpageThumbnail = async ({ webpageThumbnailFilename, webpageThumbnailBlob }) => {
    const fileName = `webpage_thumbnails/${webpageThumbnailFilename}.mp3`;

    const { data, error } = await supabase.storage
        .from("image-files")
        .upload(fileName, webpageThumbnailBlob, {
            upsert: true,
        });

    if (error) throw error;

    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/image-files/${data.path}`;
};
