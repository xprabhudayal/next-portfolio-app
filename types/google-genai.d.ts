// Type definitions for @google/genai
declare module '@google/genai' {
  export interface GoogleGenAIConfig {
    apiKey: string;
  }

  export interface LiveServerMessage {
    serverContent?: {
      inputTranscription?: {
        text: string;
        isFinal: boolean;
      };
      outputTranscription?: {
        text: string;
        isFinal: boolean;
      };
      modelTurn?: {
        parts: Array<{
          inlineData?: {
            data: string;
            mimeType?: string;
          };
        }>;
      };
    };
  }

  export interface LiveSession {
    close(): void;
    sendRealtimeInput(input: { media: Blob }): Promise<void>;
  }

  export interface Blob {
    data: string;
    mimeType: string;
  }

  export enum Modality {
    AUDIO = 'AUDIO',
    TEXT = 'TEXT',
  }

  export interface LiveCallbacks {
    onopen?: () => void;
    onmessage?: (message: LiveServerMessage) => void;
    onerror?: (e: Event) => void;
    onclose?: (e: CloseEvent) => void;
  }

  export interface LiveConfig {
    responseModalities?: Modality[];
    speechConfig?: {
      voiceConfig?: {
        prebuiltVoiceConfig?: {
          voiceName: string;
        };
      };
    };
    inputAudioTranscription?: object;
    outputAudioTranscription?: object;
    systemInstruction?: string;
    tools?: Array<{ googleSearch?: object }>;
  }

  export class GoogleGenAI {
    constructor(config: GoogleGenAIConfig);
    live: {
      connect(params: {
        model: string;
        callbacks?: LiveCallbacks;
        config?: LiveConfig;
      }): Promise<LiveSession>;
    };
    models: {
      generateImages(params: {
        model: string;
        prompt: string;
        config?: {
          numberOfImages?: number;
          outputMimeType?: string;
          aspectRatio?: string;
        };
      }): Promise<{
        generatedImages?: Array<{
          image: {
            imageBytes: string;
          };
        }>;
      }>;
    };
  }
}
