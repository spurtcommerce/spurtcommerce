/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Application } from 'express';
import express from 'express';
import * as bodyParser from 'body-parser';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { useExpressServer } from 'routing-controllers';
import { currentUserChecker } from '../auth/currentUserChecker';
import * as controllers from '../common/controller-index';
import * as middlewares from '../common/middleware-index';
import lusca from 'lusca';
import fs from 'fs';
import { env } from '../env';
import path from 'path';

export const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const connection = settings.getData('connection');

        const authService = require('@spurtcommerce/auth').authorizationChecker;
        /**
         * We create a new express server instance.
         * We could have also use useExpressServer here to attach controllers to an existing express instance.
         */
        const app = express();
        app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(lusca.xframe('SAMEORIGIN'));
        app.use(lusca.xssProtection(true));
        app.use(express.static(path.join(process.cwd(), '/views')));
        const expressApp: Application = useExpressServer(app, {
            cors: true,
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
            authorizationChecker: authService(connection, env.jwtSecret, env.cryptoSecret, {}),
            currentUserChecker: currentUserChecker(connection),
        });

        // Run application to listen on given port
        if (!env.isTest) {
            const server = expressApp.listen(env.app.port);
            settings.setData('express_server', server);
        }

        // Here we can set the data for other loaders
        settings.setData('express_app', expressApp);

        function data(): void {
            const dir = 'dist';
            if (fs.existsSync(dir)) {
                fs.readFile('dist/src/loaders/publicLoader.js', 'utf8', (err: any, dataV: any) => {
                    if (err) {
                        return console.log(err);
                    }
                    const sourcePath = 'path.join(__dirname, ' + "'../../'" + ', ' + "'views/assets')";
                    const destPath = 'path.join(__dirname, ' + "'../../../'" + ', ' + "'views/assets')";
                    const result = dataV.replace(sourcePath, destPath);
                    fs.writeFile('dist/src/loaders/publicLoader.js', result, 'utf8', (errW) => {
                        if (errW) { return console.log(errW); }
                    });
                });
                fs.readFile('dist/src/loaders/spurtConnectLoader.js', 'utf8', (err1: any, data1: any) => {
                    if (err1) {
                        return console.log(err1);
                    }
                    const spurtSourcePath = 'path.join(__dirname, ' + "'../../'" + ', ' + "'views')";
                    const spurtDestPath = 'path.join(__dirname, ' + "'../../../'" + ', ' + "'views')";
                    const result1 = data1.replace(spurtSourcePath, spurtDestPath);
                    fs.writeFile('dist/src/loaders/spurtConnectLoader.js', result1, 'utf8', (err2) => {
                        if (err2) { return console.log(err2); }
                    });
                });
            }
        }

        data();
    }
};
