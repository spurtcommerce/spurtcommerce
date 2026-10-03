/*
 * Redis Cache Middleware
 * version 1.0.0
 * Copyright (c) 2025
 * Licensed under the MIT license.
 */

import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { Service } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import { match } from 'path-to-regexp';
import { getRedis } from '../../../loaders/redisLoader';
import { env } from '../../../env';

interface CacheRouteConfig {
    [route: string]: number; // TTL in seconds
}

function isCacheable(requestPath: string, cacheRoutes: CacheRouteConfig): { ttl: number } | null {
    for (const route in cacheRoutes) {
        if (Object.prototype.hasOwnProperty.call(cacheRoutes, route)) {
            const isMatch = match(route, { decode: decodeURIComponent });
            if (isMatch(requestPath)) {
                return { ttl: cacheRoutes[route] };
            }
        }
    }
    return null;
}

// ✅ configure your cache routes here
const cacheableRoutes: CacheRouteConfig = {
    '/api/store-list/banner': 10,
    '/api/store-list/country-list': 5,
    '/api/store-widget/list': 10,
    '/api/store-list/custom-product-list': 10,
};

@Service()
@Middleware({ type: 'before' })
export class RedisCacheMiddleware implements ExpressMiddlewareInterface {
    public async use(req: Request, res: Response, next: NextFunction): Promise<any> {

        const redis = getRedis();
        if (!redis) {
            console.warn('[CACHE] Redis not available, skipping cache');
            return next();
        }

        if (req.method !== 'GET') {
            console.log(`[CACHE] Skip (method ${req.method}) ${req.originalUrl}`);
            return next();
        }

        const matchResult = isCacheable(req.originalUrl.split('?')[0], cacheableRoutes);

        if (!matchResult) {
            console.log(`[CACHE] Not cacheable: ${req.originalUrl}`);
            return next();
        }

        const appId = req.headers['app-id'] as string | undefined || env.app.appId;
        if (!appId) {
            console.log('[CACHE] Missing app-id, skipping cache');
            return next();
        }

        try {

            const cacheKey = `cache:${appId}:${req.originalUrl}`;
            const ttl = matchResult.ttl;

            console.log(`[CACHE] Checking key: ${cacheKey} (ttl: ${ttl}s)`);

            const cached = await redis.get(cacheKey);
            if (cached) {
                console.log(`[CACHE] HIT for ${cacheKey}`);
                res.setHeader('X-Cache', 'HIT');
                return res.json(JSON.parse(cached));
            }

            console.log(`[CACHE] MISS for ${cacheKey}, will store after response`);

            // monkey-patch res.json
            const originalJson = res.json.bind(res);
            res.json = (data: any) => {
                console.log(`[CACHE] SET ${cacheKey} (ttl: ${ttl}s)`);
                redis.setex(cacheKey, ttl, JSON.stringify(data)).catch(err =>
                    console.error('[CACHE] Redis set error:', err)
                );
                res.setHeader('X-Cache', 'MISS');
                return originalJson(data);
            };

            return next();
        } catch (err) {
            console.error('[CACHE] Redis middleware error:', err);
            return next();
        }
    }
}
