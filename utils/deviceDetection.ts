/**
 * Device Detection & Performance Monitoring Utility
 *
 * Provides intelligent device detection and performance monitoring for
 * adaptive 3D rendering across mobile, tablet, and desktop devices.
 *
 * Features:
 * - Device capability detection
 * - Hardware concurrency analysis
 * - Memory availability checking
 * - Reduced motion preferences
 * - WebGL capability testing
 * - Real-time FPS monitoring
 * - Automatic quality degradation
 */

export interface DeviceCapabilities {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLowPowerDevice: boolean;
  prefersReducedMotion: boolean;
  hasWebGL: boolean;
  hasWebGL2: boolean;
  supportsASTCTextures: boolean;
  deviceMemory: number | null;
  hardwareConcurrency: number;
  devicePixelRatio: number;
  recommendedQuality: 'low' | 'medium' | 'high';
  maxTextureSize: number | null;
}

export interface PerformanceMetrics {
  fps: number;
  avgFrameTime: number;
  frameCount: number;
  isThrottling: boolean;
  memoryUsage: number | null;
}

/**
 * Detects device type using multiple strategies
 */
export function detectDevice(): DeviceCapabilities {
  // Check if we're in browser environment
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return getDefaultCapabilities();
  }

  // Device type detection
  const userAgent = navigator.userAgent || '';
  const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;

  // Hardware detection
  const hardwareConcurrency = navigator.hardwareConcurrency || 2;
  const isLowPowerDevice = hardwareConcurrency <= 4;

  // Memory detection (Chrome only)
  const deviceMemory = (navigator as any).deviceMemory || null;

  // Accessibility preferences
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Device pixel ratio
  const devicePixelRatio = window.devicePixelRatio || 1;

  // WebGL capability detection
  const webglCapabilities = detectWebGLCapabilities();

  // Determine recommended quality tier
  const recommendedQuality = determineQualityTier({
    isMobile,
    isTablet,
    isLowPowerDevice,
    hardwareConcurrency,
    deviceMemory,
    devicePixelRatio,
    hasWebGL2: webglCapabilities.hasWebGL2,
  });

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLowPowerDevice,
    prefersReducedMotion,
    hasWebGL: webglCapabilities.hasWebGL,
    hasWebGL2: webglCapabilities.hasWebGL2,
    supportsASTCTextures: webglCapabilities.supportsASTCTextures,
    deviceMemory,
    hardwareConcurrency,
    devicePixelRatio,
    recommendedQuality,
    maxTextureSize: webglCapabilities.maxTextureSize,
  };
}

/**
 * Detects WebGL capabilities
 */
function detectWebGLCapabilities() {
  if (typeof document === 'undefined') {
    return {
      hasWebGL: false,
      hasWebGL2: false,
      supportsASTCTextures: false,
      maxTextureSize: null,
    };
  }

  try {
    const canvas = document.createElement('canvas');

    // Test WebGL 2
    const gl2 = canvas.getContext('webgl2');
    if (gl2) {
      const maxTextureSize = gl2.getParameter(gl2.MAX_TEXTURE_SIZE);
      const astcExtension = gl2.getExtension('WEBGL_compressed_texture_astc');

      return {
        hasWebGL: true,
        hasWebGL2: true,
        supportsASTCTextures: !!astcExtension,
        maxTextureSize,
      };
    }

    // Fallback to WebGL 1
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const maxTextureSize = (gl as WebGLRenderingContext).getParameter(
        (gl as WebGLRenderingContext).MAX_TEXTURE_SIZE
      );
      const astcExtension = (gl as WebGLRenderingContext).getExtension('WEBGL_compressed_texture_astc');

      return {
        hasWebGL: true,
        hasWebGL2: false,
        supportsASTCTextures: !!astcExtension,
        maxTextureSize,
      };
    }

    return {
      hasWebGL: false,
      hasWebGL2: false,
      supportsASTCTextures: false,
      maxTextureSize: null,
    };
  } catch (e) {
    console.warn('WebGL detection failed:', e);
    return {
      hasWebGL: false,
      hasWebGL2: false,
      supportsASTCTextures: false,
      maxTextureSize: null,
    };
  }
}

/**
 * Determines quality tier based on device capabilities
 */
function determineQualityTier(params: {
  isMobile: boolean;
  isTablet: boolean;
  isLowPowerDevice: boolean;
  hardwareConcurrency: number;
  deviceMemory: number | null;
  devicePixelRatio: number;
  hasWebGL2: boolean;
}): 'low' | 'medium' | 'high' {
  const {
    isMobile,
    isTablet,
    isLowPowerDevice,
    hardwareConcurrency,
    deviceMemory,
    devicePixelRatio,
    hasWebGL2,
  } = params;

  // Low tier: Budget mobile devices
  if (isMobile && isLowPowerDevice) return 'low';
  if (deviceMemory !== null && deviceMemory < 4) return 'low';
  if (hardwareConcurrency <= 2) return 'low';
  if (!hasWebGL2 && isMobile) return 'low';

  // High tier: Desktop and high-end mobile/tablets
  if (!isMobile && !isTablet) {
    if (hardwareConcurrency >= 8 && (deviceMemory === null || deviceMemory >= 8)) {
      return 'high';
    }
  }

  if ((isMobile || isTablet) && hardwareConcurrency >= 6 && hasWebGL2) {
    return 'high';
  }

  // Medium tier: Everything else
  return 'medium';
}

/**
 * Default capabilities for SSR/non-browser environments
 */
function getDefaultCapabilities(): DeviceCapabilities {
  return {
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLowPowerDevice: false,
    prefersReducedMotion: false,
    hasWebGL: false,
    hasWebGL2: false,
    supportsASTCTextures: false,
    deviceMemory: null,
    hardwareConcurrency: 4,
    devicePixelRatio: 1,
    recommendedQuality: 'medium',
    maxTextureSize: null,
  };
}

/**
 * Performance Monitor Class
 *
 * Monitors FPS and automatically suggests quality degradation when performance drops
 */
export class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private frameTimes: number[] = [];
  private readonly maxFrameTimeSamples = 60;
  private readonly fpsThreshold: number;
  private readonly memoryThreshold: number;
  private isMonitoring = false;
  private rafId: number | null = null;
  private callbacks: ((metrics: PerformanceMetrics) => void)[] = [];

  constructor(
    fpsThreshold = 30,
    memoryThreshold = 50 // MB
  ) {
    this.fpsThreshold = fpsThreshold;
    this.memoryThreshold = memoryThreshold;
  }

  /**
   * Start monitoring performance
   */
  start(callback?: (metrics: PerformanceMetrics) => void) {
    if (this.isMonitoring) return;

    if (callback) {
      this.callbacks.push(callback);
    }

    this.isMonitoring = true;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.frameTimes = [];
    this.monitorLoop();
  }

  /**
   * Stop monitoring performance
   */
  stop() {
    this.isMonitoring = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.callbacks = [];
  }

  /**
   * Main monitoring loop
   */
  private monitorLoop = () => {
    if (!this.isMonitoring) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;

    this.frameCount++;
    this.frameTimes.push(deltaTime);

    // Keep only recent samples
    if (this.frameTimes.length > this.maxFrameTimeSamples) {
      this.frameTimes.shift();
    }

    // Calculate metrics every 60 frames
    if (this.frameCount % 60 === 0) {
      const metrics = this.getMetrics();
      this.callbacks.forEach(callback => callback(metrics));
    }

    this.lastTime = currentTime;
    this.rafId = requestAnimationFrame(this.monitorLoop);
  };

  /**
   * Get current performance metrics
   */
  getMetrics(): PerformanceMetrics {
    const avgFrameTime =
      this.frameTimes.length > 0
        ? this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length
        : 16.67; // Default to 60 FPS

    const fps = 1000 / avgFrameTime;
    const isThrottling = fps < this.fpsThreshold;

    // Memory usage (Chrome only)
    let memoryUsage: number | null = null;
    if ('memory' in performance && (performance as any).memory) {
      const memory = (performance as any).memory;
      memoryUsage = memory.usedJSHeapSize / 1048576; // Convert to MB
    }

    return {
      fps: Math.round(fps),
      avgFrameTime: Math.round(avgFrameTime * 100) / 100,
      frameCount: this.frameCount,
      isThrottling,
      memoryUsage,
    };
  }

  /**
   * Check if performance is degraded
   */
  shouldDegrade(): boolean {
    const metrics = this.getMetrics();

    if (metrics.isThrottling) return true;

    if (metrics.memoryUsage !== null && metrics.memoryUsage > this.memoryThreshold) {
      return true;
    }

    return false;
  }

  /**
   * Subscribe to performance updates
   */
  subscribe(callback: (metrics: PerformanceMetrics) => void) {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback);
    };
  }
}

/**
 * Touch event debouncer for optimized mobile interaction
 */
export class TouchDebouncer {
  private lastTouchTime = 0;
  private touchPosition = { x: 0, y: 0 };
  private touchVelocity = { x: 0, y: 0 };
  private readonly threshold: number;
  private readonly debounceTime: number;

  constructor(threshold = 10, debounceTime = 16) {
    this.threshold = threshold;
    this.debounceTime = debounceTime;
  }

  /**
   * Process touch event with debouncing
   */
  shouldProcess(x: number, y: number): boolean {
    const now = performance.now();
    const timeDelta = now - this.lastTouchTime;

    // Time-based debouncing
    if (timeDelta < this.debounceTime) {
      return false;
    }

    // Distance-based threshold
    const dx = x - this.touchPosition.x;
    const dy = y - this.touchPosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.threshold && this.lastTouchTime > 0) {
      return false;
    }

    // Update velocity
    if (timeDelta > 0) {
      this.touchVelocity.x = dx / timeDelta;
      this.touchVelocity.y = dy / timeDelta;
    }

    // Update state
    this.touchPosition.x = x;
    this.touchPosition.y = y;
    this.lastTouchTime = now;

    return true;
  }

  /**
   * Get current touch velocity
   */
  getVelocity() {
    return { ...this.touchVelocity };
  }

  /**
   * Reset debouncer state
   */
  reset() {
    this.lastTouchTime = 0;
    this.touchPosition = { x: 0, y: 0 };
    this.touchVelocity = { x: 0, y: 0 };
  }
}

/**
 * Get haptic feedback capability
 */
export function hasHapticFeedback(): boolean {
  return typeof navigator !== 'undefined' && 'vibrate' in navigator;
}

/**
 * Trigger haptic feedback (if supported)
 */
export function triggerHaptic(pattern: number | number[] = 10) {
  if (hasHapticFeedback()) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      console.warn('Haptic feedback failed:', e);
    }
  }
}
