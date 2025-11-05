// localStorage polyfill for SSR
if (typeof window === 'undefined') {
  const storage = new Map<string, string>();

  const localStoragePolyfill = {
    getItem(key: string): string | null {
      return storage.get(key) || null;
    },
    setItem(key: string, value: string): void {
      storage.set(key, String(value));
    },
    removeItem(key: string): void {
      storage.delete(key);
    },
    clear(): void {
      storage.clear();
    },
    key(index: number): string | null {
      const keys = Array.from(storage.keys());
      return keys[index] || null;
    },
    get length(): number {
      return storage.size;
    }
  };

  // Define with proper binding
  Object.defineProperty(global, 'localStorage', {
    value: localStoragePolyfill,
    writable: true,
    configurable: true
  });

  // Also set it directly (for some module loaders)
  (global as any).localStorage = localStoragePolyfill;
}

export {};
