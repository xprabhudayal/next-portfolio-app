import { GoogleGenAI, LiveSession, LiveServerMessage, Modality } from '@google/genai';

export const getGeminiAI = () => {
    // Re-initializing GoogleGenAI ensures it picks up the latest API key
    // if the user has just selected one via a dialog.
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (!apiKey) {
        throw new Error("NEXT_PUBLIC_API_KEY environment variable not set. Please add it to your .env file.");
    }
    return new GoogleGenAI({ apiKey });
}

export const startLiveConversation = async (
    callbacks: {
        onopen?: () => void;
        onmessage?: (message: LiveServerMessage) => void;
        onerror?: (e: Event) => void;
        onclose?: (e: CloseEvent) => void;
    },
    systemInstruction: string
): Promise<LiveSession> => {
    const ai = getGeminiAI();
    const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: callbacks,
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
            },
            inputAudioTranscription: {},
            outputAudioTranscription: {},
            systemInstruction: systemInstruction,
            tools: [{ googleSearch: {} }],
        },
    });
    return sessionPromise;
};

export const generateImage = async (prompt: string): Promise<string> => {
    try {
        const ai = getGeminiAI();
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: `Create a visually stunning, abstract, minimalist, premium piece of cover art for a software project. Theme: ${prompt}. Use a dark color palette with subtle, glowing accents, reminiscent of Apple's design aesthetic.`,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '16:9',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        }
        throw new Error("No image generated.");
    } catch (error) {
        console.error("Image generation failed:", error);
        throw error;
    }
};
