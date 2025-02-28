"use server"

import { supabase } from "@/lib/supabase";
import { generateSlug } from "@/lib/utils";
import { generateAudio } from "@/lib/audioGeneration";
import { saveAudio } from "@/lib/audioStorage";
import { revalidatePath } from "next/cache";

export const createHighlight = async (values) => {
    const { title, content, fullTextUrl, wikipediaUrl, voiceId } = values;

    const userId = "d4e9ae26-a3de-4477-8f07-f9ed9c113745"; // TODO remove, obvs this is silly

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

        // Assuming that the "/" route is the only one affected by this form submission of creating a new highlight
        revalidatePath("/");

        return data;
    } catch (error) {
        console.error("Error creating highlight:", error);
        throw error;
    }
};
