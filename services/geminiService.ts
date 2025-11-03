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


