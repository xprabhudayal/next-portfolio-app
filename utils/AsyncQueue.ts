// AsyncQueue utility for handling Live API messages
// Based on official Google GenAI implementation

export class AsyncQueue<T> {
  private queue: T[] = [];
  private waiting: { resolve: (value: T) => void; reject: (reason?: any) => void }[] = [];

  put(item: T): void {
    if (this.waiting.length > 0) {
      const { resolve } = this.waiting.shift()!;
      resolve(item);
    } else {
      this.queue.push(item);
    }
  }

  get(): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (this.queue.length > 0) {
        const item = this.queue.shift();
        if (item !== undefined) {
          resolve(item);
        }
      } else {
        this.waiting.push({ resolve, reject });
      }
    });
  }

  clear(): void {
    this.queue = [];
    while (this.waiting.length > 0) {
      const { reject } = this.waiting.shift()!;
      reject(new Error('Queue cleared'));
    }
  }

  get length(): number {
    return this.queue.length;
  }
}
