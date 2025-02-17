import { ElevenLabsClient } from "elevenlabs";
const client = new ElevenLabsClient({ apiKey: `${process.env.ELEVENLABS_API_KEY}` });

export const getAllVoices = async () => {
    try {
        const voices = await client.voices.getAll();
        return voices;
    } catch (error) {
        throw error;
        console.error("Could not retrieve ElevenLabs voices")
    }
};

export const generateAudio = async ({ text, voiceId }) => {
    try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: "POST",
            headers: {
                Accept: "audio/mpeg",
                "Content-Type": "application/json",
                "xi-api-key": process.env.ELEVENLABS_API_KEY,
            },
            body: JSON.stringify({
                text,
                model_id: "eleven_multilingual_v2",
                output_format: "mp3_44100_128",
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`);
        }

        const audioBuffer = await response.arrayBuffer();

        if (!audioBuffer || audioBuffer.byteLength === 0) {
            throw new Error("Received empty audio buffer from ElevenLabs");
        }

        const blob = new Blob([audioBuffer], { type: "audio/mpeg" });

        return blob;
    } catch (error) {
        console.error("Error generating audio:", error);
        throw error;
    }
};
