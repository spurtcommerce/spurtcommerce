/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Application } from 'express';
import express from 'express';
import * as bodyParser from 'body-parser';
import { useExpressServer } from 'routing-controllers';
import { currentUserChecker } from '../auth/currentUserChecker';
import * as controllers from '../common/controller-index';
import * as middlewares from '../common/middleware-index';
import lusca from 'lusca';
import { env } from '../env';
import path from 'path';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { authorizationChecker } from '../../src/auth/authorizationChecker';
export const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const connection = settings.getData('connection');
        /**
         * We create a new express server instance.
         * We could have also use useExpressServer here to attach controllers to an existing express instance.
         */
        const app = express();
        app.use('/themes', express.static(path.join(process.cwd(), 'views/assets/themes')));
        app.use((req, res, next) => {
            if (req.is('application/json') && req.headers && req.headers['stripe-signature']) {
                bodyParser.raw({ type: 'application/json' })(req, res, next);
            } else {
                bodyParser.json({ limit: '10mb' })(req, res, next);
            }
        });
        app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
        app.use(lusca.xframe('SAMEORIGIN'));
        app.use(lusca.xssProtection(true));
        app.use(express.static(path.join(process.cwd(), '/views')));
        // Build the CORS origin allowlist from the CORS_ORIGIN environment variable.
        // Value is a comma-separated list of allowed frontend origins,
        // e.g. CORS_ORIGIN=https://store.example.com,https://admin.example.com
        const allowedOrigins: string[] = env.corsOrigin
            ? env.corsOrigin.split(',').map((o: string) => o.trim()).filter(Boolean)
            : [];
        const corsOptions = {
            origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
                // Allow requests with no Origin header (same-origin, server-to-server, mobile clients).
                if (!origin) {
                    return callback(null, true);
                }
                if (allowedOrigins.includes(origin)) {
                    return callback(null, true);
                }
                return callback(new Error(`CORS policy: origin '${origin}' is not allowed`));
            },
            credentials: true,
        };
        const expressApp: Application = useExpressServer(app, {
            cors: corsOptions,
            classTransformer: true,
            routePrefix: env.app.routePrefix,
            defaultErrorHandler: false,
            /**
             * We can add options about how routing-controllers should configure itself.
             * Here we specify what controllers should be registered in our express server.
             */
            controllers: Object.values(controllers),
            middlewares: Object.values(middlewares),
            // interceptors: env.app.dirs.interceptors,
            /**
             * Authorization features
             */
            authorizationChecker: authorizationChecker(connection),
            currentUserChecker: currentUserChecker(connection),
        });
        // Run application to listen on given port
        if (!env.isTest) {
            const server = expressApp.listen(env.app.port);
            settings.setData('express_server', server);
        }
        // Here we can set the data for other loaders
        settings.setData('express_app', expressApp);
    }
};
