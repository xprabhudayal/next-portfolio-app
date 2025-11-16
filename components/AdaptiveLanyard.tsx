/**
 * Adaptive Lanyard Component with Progressive Enhancement
 *
 * Intelligently selects the appropriate rendering strategy based on:
 * - Device capabilities (mobile, tablet, desktop)
 * - Hardware performance (CPU cores, memory)
 * - User preferences (reduced motion)
 * - Real-time performance monitoring
 *
 * Progressive Enhancement Layers:
 * 1. Static 3D (low-end mobile) - CSS animations, no physics
 * 2. Light Physics (mid-tier devices) - 30fps physics, simplified
 * 3. Full Physics (high-end devices) - 60fps physics, full features
 *
 * Features:
 * - Automatic device detection
 * - Performance-based degradation
 * - Accessibility support
 * - IntersectionObserver optimization
 * - WebGL context loss recovery
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import {
  detectDevice,
  PerformanceMonitor,
  DeviceCapabilities,
} from '@/utils/deviceDetection';

// Lazy load components for better initial load performance
const DraggableLanyardFull = dynamic(
  () => import('./DraggableLanyard'),
  { ssr: false }
);

const DraggableLanyardLight = dynamic(
  () => import('./DraggableLanyardLight'),
  { ssr: false }
);

const DraggableLanyardStatic = dynamic(
  () => import('./DraggableLanyardStatic'),
  { ssr: false }
);

type QualityTier = 'low' | 'medium' | 'high';

interface AdaptiveLanyardProps {
  className?: string;
  forceQuality?: QualityTier;
  enablePerformanceMonitoring?: boolean;
  enableIntersectionOptimization?: boolean;
  onQualityChange?: (quality: QualityTier) => void;
}

export default function AdaptiveLanyard({
  className = '',
  forceQuality,
  enablePerformanceMonitoring = true,
  enableIntersectionOptimization = true,
  onQualityChange,
}: AdaptiveLanyardProps) {
  const [deviceCapabilities, setDeviceCapabilities] = useState<DeviceCapabilities | null>(null);
  const [currentQuality, setCurrentQuality] = useState<QualityTier>('medium');
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const performanceMonitor = useRef<PerformanceMonitor | null>(null);
  const [degradationCount, setDegradationCount] = useState(0);

  // Initial device detection
  useEffect(() => {
    const capabilities = detectDevice();
    setDeviceCapabilities(capabilities);

    // Set initial quality based on device capabilities or forced quality
    const initialQuality = forceQuality || capabilities.recommendedQuality;
    setCurrentQuality(initialQuality);

    // Log device info for debugging
    console.log('🔍 Device Detection Results:', {
      isMobile: capabilities.isMobile,
      isTablet: capabilities.isTablet,
      hardwareConcurrency: capabilities.hardwareConcurrency,
      deviceMemory: capabilities.deviceMemory,
      recommendedQuality: capabilities.recommendedQuality,
      hasWebGL2: capabilities.hasWebGL2,
      prefersReducedMotion: capabilities.prefersReducedMotion,
    });

    // Notify parent of quality selection
    onQualityChange?.(initialQuality);
  }, [forceQuality, onQualityChange]);

  // Performance monitoring and automatic degradation
  useEffect(() => {
    if (!enablePerformanceMonitoring || !deviceCapabilities || forceQuality) return;

    // Don't monitor if we're already at lowest quality
    if (currentQuality === 'low') return;

    const monitor = new PerformanceMonitor(30, 100);
    performanceMonitor.current = monitor;

    let degradationTimer: NodeJS.Timeout | null = null;

    monitor.start((metrics) => {
      console.log('📊 Performance Metrics:', {
        fps: metrics.fps,
        avgFrameTime: metrics.avgFrameTime,
        isThrottling: metrics.isThrottling,
        memoryUsage: metrics.memoryUsage,
      });

      // If performance is degraded for 3 consecutive checks, downgrade quality
      if (metrics.isThrottling || (metrics.memoryUsage && metrics.memoryUsage > 100)) {
        if (!degradationTimer) {
          degradationTimer = setTimeout(() => {
            console.warn('⚠️ Performance degradation detected - reducing quality tier');

            setDegradationCount((prev) => prev + 1);

            // Degrade quality tier
            setCurrentQuality((prevQuality) => {
              const newQuality = prevQuality === 'high' ? 'medium' : 'low';
              onQualityChange?.(newQuality);
              return newQuality;
            });

            degradationTimer = null;
          }, 3000); // 3 seconds of poor performance before degrading
        }
      } else {
        // Clear degradation timer if performance improves
        if (degradationTimer) {
          clearTimeout(degradationTimer);
          degradationTimer = null;
        }
      }
    });

    return () => {
      monitor.stop();
      if (degradationTimer) clearTimeout(degradationTimer);
    };
  }, [
    enablePerformanceMonitoring,
    deviceCapabilities,
    forceQuality,
    currentQuality,
    onQualityChange,
  ]);

  // Handle WebGL errors
  const handleWebGLError = () => {
    console.error('❌ WebGL initialization failed - falling back to low quality');
    setHasWebGLError(true);
    setCurrentQuality('low');
    onQualityChange?.('low');
  };

  // SSR fallback
  if (!deviceCapabilities) {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.5,
        }}
      >
        <p>Loading 3D content...</p>
      </div>
    );
  }

  // Error fallback
  if (hasWebGLError || !deviceCapabilities.hasWebGL) {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <div>
          <h3>WebGL Not Available</h3>
          <p>Your browser doesn't support WebGL or it has been disabled.</p>
          <p style={{ fontSize: '0.875rem', opacity: 0.7, marginTop: '1rem' }}>
            Try updating your browser or enabling hardware acceleration.
          </p>
        </div>
      </div>
    );
  }

  // Render appropriate quality tier
  try {
    switch (currentQuality) {
      case 'low':
        return (
          <DraggableLanyardStatic
            className={className}
          />
        );

      case 'medium':
        return (
          <DraggableLanyardLight
            className={className}
          />
        );

      case 'high':
        return (
          <DraggableLanyardFull
            className={className}
            enableIntersectionOptimization={enableIntersectionOptimization}
          />
        );

      default:
        return (
          <DraggableLanyardLight
            className={className}
          />
        );
    }
  } catch (error) {
    console.error('Error rendering lanyard component:', error);
    handleWebGLError();
    return null;
  }
}

/**
 * Hook to manually control quality tier
 */
export function useLanyardQuality() {
  const [quality, setQuality] = useState<QualityTier>('medium');

  const upgradeQuality = () => {
    setQuality((prev) => {
      if (prev === 'low') return 'medium';
      if (prev === 'medium') return 'high';
      return prev;
    });
  };

  const downgradeQuality = () => {
    setQuality((prev) => {
      if (prev === 'high') return 'medium';
      if (prev === 'medium') return 'low';
      return prev;
    });
  };

  const resetQuality = () => {
    const capabilities = detectDevice();
    setQuality(capabilities.recommendedQuality);
  };

  return {
    quality,
    setQuality,
    upgradeQuality,
    downgradeQuality,
    resetQuality,
  };
}
