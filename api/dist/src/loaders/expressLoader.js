"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressLoader = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const bodyParser = tslib_1.__importStar(require("body-parser"));
const routing_controllers_1 = require("routing-controllers");
const currentUserChecker_1 = require("../auth/currentUserChecker");
const controllers = tslib_1.__importStar(require("../common/controller-index"));
const middlewares = tslib_1.__importStar(require("../common/middleware-index"));
const lusca_1 = tslib_1.__importDefault(require("lusca"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const env_1 = require("../env");
const path_1 = tslib_1.__importDefault(require("path"));
const expressLoader = (settings) => {
    if (settings) {
        const connection = settings.getData('connection');
        const authService = require('@spurtcommerce/auth').authorizationChecker;
        /**
         * We create a new express server instance.
         * We could have also use useExpressServer here to attach controllers to an existing express instance.
         */
        const app = (0, express_1.default)();
        app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(lusca_1.default.xframe('SAMEORIGIN'));
        app.use(lusca_1.default.xssProtection(true));
        app.use(express_1.default.static(path_1.default.join(process.cwd(), '/views')));
        const expressApp = (0, routing_controllers_1.useExpressServer)(app, {
            cors: true,
            classTransformer: true,
            routePrefix: env_1.env.app.routePrefix,
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
            authorizationChecker: authService(connection, env_1.env.jwtSecret, env_1.env.cryptoSecret, {}),
            currentUserChecker: (0, currentUserChecker_1.currentUserChecker)(connection),
        });
        // Run application to listen on given port
        if (!env_1.env.isTest) {
            const server = expressApp.listen(env_1.env.app.port);
            settings.setData('express_server', server);
        }
        // Here we can set the data for other loaders
        settings.setData('express_app', expressApp);
        function data() {
            const dir = 'dist';
            if (fs_1.default.existsSync(dir)) {
                fs_1.default.readFile('dist/src/loaders/publicLoader.js', 'utf8', (err, dataV) => {
                    if (err) {
                        return console.log(err);
                    }
                    const sourcePath = 'path.join(__dirname, ' + "'../../'" + ', ' + "'views/assets')";
                    const destPath = 'path.join(__dirname, ' + "'../../../'" + ', ' + "'views/assets')";
                    const result = dataV.replace(sourcePath, destPath);
                    fs_1.default.writeFile('dist/src/loaders/publicLoader.js', result, 'utf8', (errW) => {
                        if (errW) {
                            return console.log(errW);
                        }
                    });
                });
                fs_1.default.readFile('dist/src/loaders/spurtConnectLoader.js', 'utf8', (err1, data1) => {
                    if (err1) {
                        return console.log(err1);
                    }
                    const spurtSourcePath = 'path.join(__dirname, ' + "'../../'" + ', ' + "'views')";
                    const spurtDestPath = 'path.join(__dirname, ' + "'../../../'" + ', ' + "'views')";
                    const result1 = data1.replace(spurtSourcePath, spurtDestPath);
                    fs_1.default.writeFile('dist/src/loaders/spurtConnectLoader.js', result1, 'utf8', (err2) => {
                        if (err2) {
                            return console.log(err2);
                        }
                    });
                });
            }
        }
        data();
    }
};
exports.expressLoader = expressLoader;
//# sourceMappingURL=expressLoader.js.map