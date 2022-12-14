/*
 * spurtcommerce API
 * version 4.8.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Application } from 'express';
import express from 'express';
import * as bodyParser from 'body-parser';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { useExpressServer } from 'routing-controllers';
import { authorizationChecker } from '../auth/authorizationChecker';
import { currentUserChecker } from '../auth/currentUserChecker';
import * as controllers from '../common/controller-index';
import * as middlewares from '../common/middleware-index';
import lusca from 'lusca';
import fs from 'fs';
import { env } from '../env';

export const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const connection = settings.getData('connection');

        /**
         * We create a new express server instance.
         * We could have also use useExpressServer here to attach controllers to an existing express instance.
         */
        const app = express();
        app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));
        app.use(bodyParser.json({limit: '50mb'}));
        app.use(lusca.xframe('SAMEORIGIN'));
        app.use(lusca.xssProtection(true));
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

        // const fs = require('fs');
        function data(): void {
            const dir = 'dist';
            if (fs.existsSync(dir)) {
                fs.readFile('dist/src/loaders/publicLoader.js', 'utf8', (err: any, dataV: any) => {
                if (err) {
                    return console.log(err);
                }
                const sourcePath = 'path.join(__dirname, ' + "'../../'" + ', ' + "'views/assets')";
                const destPath = 'path.join(__dirname, ' + "'../../../'" + ', ' + "'views/assets')";
                const result = dataV.replace(sourcePath , destPath);
                fs.writeFile('dist/src/loaders/publicLoader.js', result, 'utf8', (errW) => {
                    if (errW) { return console.log(errW); }
                });
                });
            }
        }

        data();
    }
};
