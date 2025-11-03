import React, { useState, useEffect, useRef, useCallback } from 'react';
// FIX: Import Blob type for use in createBlob function.
import { LiveServerMessage, LiveSession, Blob } from '@google/genai';
import { startLiveConversation } from '../services/geminiService';
import { SYSTEM_INSTRUCTION } from './constants';
import { XIcon, MicIcon, Volume2Icon } from './Icons';

// Audio utility functions
// FIX: Add encode and createBlob utility functions to safely handle audio data encoding, aligning with Gemini API best practices.
function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function createBlob(data: Float32Array): Blob {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
        int16[i] = data[i] * 32768;
    }
    return {
        data: encode(new Uint8Array(int16.buffer)),
        mimeType: 'audio/pcm;rate=16000',
    };
}

function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

type Transcription = { speaker: 'user' | 'model'; text: string; isFinal: boolean };

export default function LiveChatModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState('Initializing...');
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
  const sessionRef = useRef<LiveSession | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const cleanup = useCallback(() => {
    console.log("Cleaning up resources...");
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (inputAudioContextRef.current && inputAudioContextRef.current.state !== 'closed') {
      inputAudioContextRef.current.close();
    }
    if (outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
      outputAudioContextRef.current.close();
    }
     audioSourcesRef.current.forEach(source => source.stop());
     audioSourcesRef.current.clear();
  }, []);

  const handleMessage = useCallback(async (message: LiveServerMessage) => {
    if (message.serverContent) {
        if (message.serverContent.inputTranscription) {
            const { text, isFinal } = message.serverContent.inputTranscription;
            setTranscriptions(prev => {
                const last = prev[prev.length - 1];
                if (last?.speaker === 'user' && !last.isFinal) {
                    const newTranscripts = [...prev];
                    newTranscripts[newTranscripts.length - 1] = { ...last, text: last.text + text, isFinal };
                    return newTranscripts;
                }
                return [...prev, { speaker: 'user', text, isFinal }];
            });
        }
        if (message.serverContent.outputTranscription) {
            const { text, isFinal } = message.serverContent.outputTranscription;
             setTranscriptions(prev => {
                const last = prev[prev.length - 1];
                if (last?.speaker === 'model' && !last.isFinal) {
                    const newTranscripts = [...prev];
                    newTranscripts[newTranscripts.length - 1] = { ...last, text: last.text + text, isFinal };
                    return newTranscripts;
                }
                return [...prev, { speaker: 'model', text, isFinal }];
            });
        }
    }

    const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData.data;
    if (audioData && outputAudioContextRef.current) {
        const outputAudioContext = outputAudioContextRef.current;
        nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContext.currentTime);
        const audioBuffer = await decodeAudioData(decode(audioData), outputAudioContext, 24000, 1);
        const source = outputAudioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(outputAudioContext.destination);
        source.start(nextStartTimeRef.current);
        nextStartTimeRef.current += audioBuffer.duration;
        audioSourcesRef.current.add(source);
        source.onended = () => audioSourcesRef.current.delete(source);
    }
  }, []);
  
  useEffect(() => {
    const initialize = async () => {
      try {
        setStatus('Requesting microphone access...');
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;

        setStatus('Connecting to AI...');
        
        inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

        const sessionPromise = startLiveConversation({
          onopen: () => {
            setStatus('Connected. Start talking!');
            const source = inputAudioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;

            // FIX: Refactor audio processing to use the new createBlob helper function for cleaner and safer data handling.
            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current!.destination);
          },
          onmessage: handleMessage,
          onerror: (e) => {
            console.error(e);
            setStatus('Connection error.');
            cleanup();
          },
          onclose: () => {
            setStatus('Connection closed.');
            cleanup();
          },
        }, SYSTEM_INSTRUCTION);

        sessionRef.current = await sessionPromise;

      } catch (err) {
        console.error(err);
        setStatus('Failed to initialize. Check microphone permissions.');
      }
    };

    initialize();
    
    return () => {
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleanup]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-gray-900/50 border border-white/10 rounded-2xl w-full max-w-2xl h-[80vh] flex flex-col p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Live Conversation</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 space-y-4">
          {transcriptions.map((t, i) => (
            <div key={i} className={`flex items-start gap-3 ${t.speaker === 'user' ? 'justify-end' : ''}`}>
              {t.speaker === 'model' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center"><Volume2Icon className="w-5 h-5"/></div>}
              <div className={`px-4 py-2 rounded-xl max-w-md ${t.speaker === 'user' ? 'bg-blue-600' : 'bg-gray-700'} ${t.isFinal ? '' : 'opacity-70'}`}>
                {t.text}
              </div>
               {t.speaker === 'user' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center"><MicIcon className="w-5 h-5"/></div>}
            </div>
          ))}
        </div>

        <div className="pt-4 text-center text-gray-400 border-t border-white/10">
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
}