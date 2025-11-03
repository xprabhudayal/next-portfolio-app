// AsyncQueue utility for handling Live API messages
// Based on official Google GenAI implementation

export class AsyncQueue<T> {
  private queue: T[] = [];
  private waiting: ((value: T) => void)[] = [];

  put(item: T): void {
    if (this.waiting.length > 0) {
      const resolve = this.waiting.shift();
      if (resolve) resolve(item);
    } else {
      this.queue.push(item);
    }
  }

  get(): Promise<T> {
    return new Promise<T>((resolve) => {
      if (this.queue.length > 0) {
        const item = this.queue.shift();
        if (item !== undefined) {
          resolve(item);
        }
      } else {
        this.waiting.push(resolve);
      }
    });
  }

  clear(): void {
    this.queue = [];
    this.waiting = [];
  }

  get length(): number {
    return this.queue.length;
  }
}
