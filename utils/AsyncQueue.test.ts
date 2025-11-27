
import { AsyncQueue } from "./AsyncQueue";

describe('AsyncQueue', () => {
    it('should reject waiting consumers when cleared', async () => {
        const queue = new AsyncQueue<string>();

        let promiseRejected = false;
        let rejectionError: any;

        const promise1 = queue.get();

        promise1.catch((err) => {
            promiseRejected = true;
            rejectionError = err;
        });

        queue.clear();

        await new Promise(r => setTimeout(r, 10));

        expect(promiseRejected).toBe(true);
        expect(rejectionError).toBeDefined();
        expect(rejectionError.message).toBe('Queue cleared');
    });

    it('should resolve waiting consumers when item is put', async () => {
        const queue = new AsyncQueue<string>();

        let promiseResolved = false;
        let resolvedValue: string | undefined;

        const promise1 = queue.get();

        promise1.then((val) => {
            promiseResolved = true;
            resolvedValue = val;
        });

        queue.put("test");

        await new Promise(r => setTimeout(r, 10));

        expect(promiseResolved).toBe(true);
        expect(resolvedValue).toBe("test");
    });
});
