'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SYSTEM_INSTRUCTION } from './constants';
import { X as XIcon, Mic as MicIcon, Volume2 as Volume2Icon } from 'lucide-react';
import { AsyncQueue } from '../utils/AsyncQueue';

// Audio utility functions
function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function createBlob(data: Float32Array): any {
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

  const sessionRef = useRef<any | null>(null);
  const messageQueueRef = useRef<AsyncQueue<any>>(new AsyncQueue<any>());
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const isInitializingRef = useRef<boolean>(false);
  const processingTurnRef = useRef<boolean>(false);

  const cleanup = useCallback(() => {
    console.log('🧹 Cleaning up resources...');

    // Stop all audio sources
    audioSourcesRef.current.forEach(source => {
      try {
        source.stop();
      } catch (e) {
        // Already stopped
      }
    });
    audioSourcesRef.current.clear();

    // Clear message queue
    messageQueueRef.current.clear();

    // Disconnect audio processing BEFORE closing session
    if (scriptProcessorRef.current) {
      try {
        scriptProcessorRef.current.disconnect();
      } catch (e) {
        // Already disconnected
      }
      scriptProcessorRef.current = null;
    }

    // Stop media stream BEFORE closing session
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    // Close session
    if (sessionRef.current) {
      try {
        sessionRef.current.close();
      } catch (e) {
        console.error('Error closing session:', e);
      }
      sessionRef.current = null;
    }

    // Close audio contexts LAST
    if (inputAudioContextRef.current) {
      try {
        if (inputAudioContextRef.current.state !== 'closed') {
          inputAudioContextRef.current.close();
        }
      } catch (e) {
        // Already closed
      }
      inputAudioContextRef.current = null;
    }

    if (outputAudioContextRef.current) {
      try {
        if (outputAudioContextRef.current.state !== 'closed') {
          outputAudioContextRef.current.close();
        }
      } catch (e) {
        // Already closed
      }
      outputAudioContextRef.current = null;
    }
  }, []);

  // Process a complete turn (wait for turnComplete)
  const processTurn = useCallback(async (): Promise<void> => {
    if (processingTurnRef.current) return;

    processingTurnRef.current = true;
    console.log('🔄 Processing turn...');

    try {
      while (true) {
        const message = await messageQueueRef.current.get();

        // Handle transcriptions
        if (message.serverContent?.inputTranscription) {
          const { text, isFinal } = message.serverContent.inputTranscription;
          console.log(`📝 User: "${text}" (final: ${isFinal})`);

          setTranscriptions(prev => {
            const last = prev[prev.length - 1];
            if (last?.speaker === 'user' && !last.isFinal) {
              const updated = [...prev];
              updated[updated.length - 1] = { speaker: 'user', text, isFinal };
              return updated;
            }
            return [...prev, { speaker: 'user', text, isFinal }];
          });
        }

        if (message.serverContent?.outputTranscription) {
          const { text, isFinal } = message.serverContent.outputTranscription;
          console.log(`🤖 Model: "${text}" (final: ${isFinal})`);

          setTranscriptions(prev => {
            const last = prev[prev.length - 1];
            if (last?.speaker === 'model' && !last.isFinal) {
              const updated = [...prev];
              updated[updated.length - 1] = { speaker: 'model', text, isFinal };
              return updated;
            }
            return [...prev, { speaker: 'model', text, isFinal }];
          });
        }

        // Handle audio
        const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
        if (audioData && outputAudioContextRef.current) {
          try {
            const audioCtx = outputAudioContextRef.current;
            const currentTime = audioCtx.currentTime;

            if (nextStartTimeRef.current < currentTime) {
              nextStartTimeRef.current = currentTime + 0.1;
            }

            const audioBuffer = await decodeAudioData(decode(audioData), audioCtx, 24000, 1);
            const source = audioCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioCtx.destination);
            source.start(nextStartTimeRef.current);

            nextStartTimeRef.current += audioBuffer.duration;
            audioSourcesRef.current.add(source);

            source.onended = () => {
              audioSourcesRef.current.delete(source);
            };

            console.log(`🔊 Scheduled audio: ${audioBuffer.duration.toFixed(2)}s at ${nextStartTimeRef.current.toFixed(2)}s`);
          } catch (error) {
            console.error('❌ Audio playback error:', error);
          }
        }

        // Check for turn completion
        if (message.serverContent?.turnComplete) {
          console.log('✅ Turn complete');
          break;
        }
      }
    } catch (error) {
      console.error('❌ Turn processing error:', error);
    } finally {
      processingTurnRef.current = false;
    }
  }, []);

  useEffect(() => {
    // Prevent duplicate initialization
    if (isInitializingRef.current) {
      console.log('⚠️ Already initializing, skipping duplicate');
      return;
    }

    let mounted = true; // Track if component is still mounted

    const initialize = async () => {
      try {
        isInitializingRef.current = true;
        console.log('🚀 Starting live conversation...');

        setStatus('Requesting microphone access...');
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        if (!mounted) {
          console.log('⚠️ Component unmounted before mic access, cleaning up stream');
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        mediaStreamRef.current = stream;

        setStatus('Connecting to AI...');

        // Create audio contexts
        const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

        if (!mounted) {
          console.log('⚠️ Component unmounted before contexts created, cleaning up');
          inputAudioContext.close();
          outputAudioContext.close();
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        inputAudioContextRef.current = inputAudioContext;
        outputAudioContextRef.current = outputAudioContext;

        // Dynamically import geminiService to avoid SSR issues
        const { startLiveConversation } = await import('../services/geminiService');

        const session = await startLiveConversation({
          onopen: () => {
            if (!mounted || !inputAudioContextRef.current) {
              console.log('⚠️ Component unmounted, skipping audio setup');
              return;
            }

            console.log('✅ Session opened');
            setStatus('Connected. Start talking!');

            const source = inputAudioContext.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              if (sessionRef.current && mounted) {
                sessionRef.current.sendRealtimeInput({ media: pcmBlob });
              }
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
          },
          onmessage: (message: any) => {
            if (!mounted) return;

            // Add message to queue
            messageQueueRef.current.put(message);

            // Start processing turn if not already processing
            if (!processingTurnRef.current) {
              processTurn();
            }
          },
          onerror: (e) => {
            console.error('❌ Connection error:', e);
            setStatus('Connection error.');
            cleanup();
          },
          onclose: () => {
            console.log('🔌 Connection closed');
            setStatus('Connection closed.');
            if (mounted) {
              cleanup();
            }
          },
        }, SYSTEM_INSTRUCTION);

        if (!mounted) {
          console.log('⚠️ Component unmounted, closing session immediately');
          session.close();
          return;
        }

        sessionRef.current = session;
        console.log('✅ Live conversation initialized');

      } catch (err) {
        console.error('❌ Initialization error:', err);
        setStatus('Failed to initialize. Check microphone permissions.');
        isInitializingRef.current = false;
      }
    };

    initialize();

    return () => {
      console.log('🧹 Component unmounting...');
      mounted = false;
      isInitializingRef.current = false;

      // Small delay to allow session to fully initialize before cleanup
      setTimeout(() => {
        cleanup();
      }, 100);
    };
  }, [cleanup, processTurn]);

  return (
    <div className="fixed inset-0 bg-[#030014]/90 backdrop-blur-2xl z-50 flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-violet-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative bg-white/[0.02] border border-white/[0.08] rounded-3xl w-full max-w-2xl h-[80vh] flex flex-col p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/[0.05]">
          <div>
            <h2 className="text-xl font-semibold text-white">Live Conversation</h2>
            <p className="text-sm text-white/40 mt-1">AI-powered voice chat</p>
          </div>
          <button onClick={onClose} className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
            <XIcon className="w-5 h-5 text-white/70" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 space-y-4">
          {transcriptions.map((t, i) => (
            <div key={i} className={`flex items-start gap-3 ${t.speaker === 'user' ? 'justify-end' : ''}`}>
              {t.speaker === 'model' && (
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center">
                  <Volume2Icon className="w-4 h-4 text-indigo-400" />
                </div>
              )}
              <div
                className={`px-4 py-3 rounded-2xl max-w-md text-sm ${t.speaker === 'user'
                    ? 'bg-gradient-to-r from-sky-500/20 to-indigo-500/20 border border-sky-500/20 text-white'
                    : 'bg-white/5 border border-white/10 text-white/80'
                  } ${t.isFinal ? '' : 'opacity-60'}`}
              >
                {t.text}
              </div>
              {t.speaker === 'user' && (
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border border-white/10 flex items-center justify-center">
                  <MicIcon className="w-4 h-4 text-sky-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-4 mt-4 text-center border-t border-white/[0.05]">
          <p className="text-sm text-white/40">{status}</p>
        </div>
      </div>
    </div>
  );
}
