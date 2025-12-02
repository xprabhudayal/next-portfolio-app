// This file runs before any other code in the application
// It's used to set up global polyfills for SSR

export async function register() {
  if (typeof window === 'undefined') {
    // Server-side: create localStorage polyfill
    const storage = new Map<string, string>();

    const localStoragePolyfill = {
      getItem: (key: string): string | null => {
        return storage.get(key) ?? null;
      },
      setItem: (key: string, value: string): void => {
        storage.set(key, String(value));
      },
      removeItem: (key: string): void => {
        storage.delete(key);
      },
      clear: (): void => {
        storage.clear();
      },
      key: (index: number): string | null => {
        const keys = Array.from(storage.keys());
        return keys[index] ?? null;
      },
      get length(): number {
        return storage.size;
      }
    };

    // @ts-ignore
    globalThis.localStorage = localStoragePolyfill;
  }
}
