import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import Redis from 'ioredis';
import { env } from '../env';

let redis: Redis | undefined;

export const redisLoader: MicroframeworkLoader = async (settings?: MicroframeworkSettings) => {
    if (!settings) {
        return;
    }

    try {
        redis = new Redis(env.redisUrl ?? '');

        // wait for initial connection
        await new Promise<void>((resolve, reject) => {
            redis!.once('connect', () => {
                // console.log('✅ Redis connected');
                resolve();
            });
            // global error handler
            redis.on('error', (err) => {
                reject(err);
            });
        });

    } catch (err: any) {
        console.error('❌ Redis initialization failed, cache disabled:', err);
        redis = undefined;
    }

    // store redis instance (may be undefined)
    settings.setData('redis', redis);
};

// getter
export const getRedis = (): Redis | undefined => redis;
