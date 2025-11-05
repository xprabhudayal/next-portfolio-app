'use client';

// No imports from @google/genai at all - types will be loaded dynamically
export const getGeminiAI = async (): Promise<any> => {
    // Ensure this only runs on the client side
    if (typeof window === 'undefined') {
        throw new Error("getGeminiAI can only be called on the client side");
    }

    // Dynamically import the SDK only when needed
    const { GoogleGenAI } = await import('@google/genai/web');

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
        onmessage?: (message: any) => void;
        onerror?: (e: Event) => void;
        onclose?: (e: CloseEvent) => void;
    },
    systemInstruction: string
): Promise<any> => {
    // Dynamically import Modality
    const { Modality } = await import('@google/genai/web');

    const ai = await getGeminiAI();

    const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: callbacks,
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: 'Puck' }
                },
            },
            inputAudioTranscription: {},
            outputAudioTranscription: {},
            systemInstruction: systemInstruction,
            tools: [{ googleSearch: {} }],
        },
    });

    return sessionPromise;
};


