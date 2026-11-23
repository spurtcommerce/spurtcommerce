
'use strict';

import 'reflect-metadata';

import { Microframework } from 'microframework-w3tec';

import { winstonLoader } from './loaders/winstonLoader';
import { iocLoader } from './loaders/iocLoader';
import { eventDispatchLoader } from './loaders/eventDispatchLoader';
import { typeormLoader } from './loaders/typeormLoader';
import { pluginLoader } from './loaders/pluginLoader';
import { expressLoader } from './loaders/expressLoader';
import { redisLoader } from './loaders/redisLoader';
import { swaggerLoader } from './loaders/swaggerLoader';
import { monitorLoader } from './loaders/monitorLoader';
import { homeLoader } from './loaders/homeLoader';
import { publicLoader } from './loaders/publicLoader';
import { cronLoader } from './loaders/cronLoader';

import { banner } from './lib/banner';
import { Logger } from './lib/logger';

let frameworkInstance: Microframework | null = null;
let startPromise: Promise<Microframework> | null = null;

async function start(): Promise<Microframework> {
    if (frameworkInstance) {
        return frameworkInstance;
    }

    if (startPromise) {
        return startPromise;
    }

    startPromise = (async (): Promise<Microframework> => {
        const framework = new Microframework();

        framework.registerLoaders([
            winstonLoader,
            iocLoader,
            eventDispatchLoader,
            typeormLoader,
            pluginLoader,
            expressLoader,
            redisLoader,
            swaggerLoader,
            monitorLoader,
            homeLoader,
            publicLoader,
            cronLoader,
        ]);

        await framework.bootstrap();

        frameworkInstance = framework;

        await banner(new Logger(__filename));

        return framework;
    })();

    try {
        return await startPromise;
    } catch (error) {
        frameworkInstance = null;
        throw error;
    } finally {
        startPromise = null;
    }
}

async function stop(): Promise<void> {
    if (!frameworkInstance) {
        return;
    }

    const framework = frameworkInstance;

    await framework.shutdown();

    frameworkInstance = null;
}

export {
    start,
    stop
};

if (require.main === module) {
    start().catch((error: unknown) => {
        console.error('SpurtCommerce startup failed:', error);
        process.exitCode = 1;
    });
}
