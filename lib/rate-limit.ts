
interface RateLimitContext {
    check: (limit: number, token: string) => Promise<void>;
}

const PRUNE_INTERVAL = 60 * 1000; // 1 minute

const rateLimit = (options?: { uniqueTokenPerInterval?: number; interval?: number }): RateLimitContext => {
    const { uniqueTokenPerInterval = 500, interval = 60000 } = options || {};
    const tokenCache = new Map<string, number[]>();
    let lastPrune = Date.now();

    return {
        check: (limit: number, token: string) =>
            new Promise<void>((resolve, reject) => {
                const now = Date.now();

                // Prune older entries if needed
                if (now - lastPrune > PRUNE_INTERVAL) {
                    tokenCache.clear();
                    lastPrune = now;
                }

                const tokenCount = tokenCache.get(token) || [];
                const recentTokens = tokenCount.filter((timestamp) => now - timestamp < interval);

                if (recentTokens.length >= limit) {
                    reject();
                } else {
                    recentTokens.push(now);
                    tokenCache.set(token, recentTokens);
                    resolve();
                }
            }),
    };
};

export default rateLimit;
