"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const microframework_w3tec_1 = require("microframework-w3tec");
const banner_1 = require("./lib/banner");
const logger_1 = require("./lib/logger");
const eventDispatchLoader_1 = require("./loaders/eventDispatchLoader");
const expressLoader_1 = require("./loaders/expressLoader");
const homeLoader_1 = require("./loaders/homeLoader");
const iocLoader_1 = require("./loaders/iocLoader");
const monitorLoader_1 = require("./loaders/monitorLoader");
const publicLoader_1 = require("./loaders/publicLoader");
const typeormLoader_1 = require("./loaders/typeormLoader");
const winstonLoader_1 = require("./loaders/winstonLoader");
const swaggerLoader_1 = require("./loaders/swaggerLoader");
const pluginLoader_1 = require("./loaders/pluginLoader");
/**
 * EXPRESS TYPESCRIPT BOILERPLATE
 * ----------------------------------------
 *
 * This is a boilerplate for Node.js Application written in TypeScript.
 * The basic layer of this app is express. For further information visit
 * the 'README.md' file.
 */
const log = new logger_1.Logger(__filename);
(0, microframework_w3tec_1.bootstrapMicroframework)({
    /**
     * Loader is a place where you can configure all your modules during microframework
     * bootstrap process. All loaders are executed one by one in a sequential order.
     */
    loaders: [
        winstonLoader_1.winstonLoader,
        iocLoader_1.iocLoader,
        eventDispatchLoader_1.eventDispatchLoader,
        typeormLoader_1.typeormLoader,
        pluginLoader_1.pluginLoader,
        expressLoader_1.expressLoader,
        swaggerLoader_1.swaggerLoader,
        monitorLoader_1.monitorLoader,
        homeLoader_1.homeLoader,
        publicLoader_1.publicLoader,
        // spurtConnectLoader,
    ],
})
    .then(() => (0, banner_1.banner)(log))
    .catch(error => log.error('Application is crashed: ' + error));
// const fs = require('fs');
// function data (){
//     const dir = 'dist';
//     if (fs.existsSync(dir)) {
//         fs.readFile('dist/src/loaders/publicLoader.js', 'utf8', (err: any, dataV: any) => {
//         if (err) {
//             return console.log(err);
//         }
//         const sourcePath = 'path.join(__dirname, ' + "'../../'" + ', ' + "'views/assets')";
//         const destPath = 'path.join(__dirname, ' + "'../../../'" + ', ' + "'views/assets')";
//         console.log(sourcePath + 'sourcePath');
//         console.log(destPath + 'destPath');
//         const result = dataV.replace(sourcePath , destPath);
//         fs.writeFile('dist/src/loaders/publicLoader.js', result, 'utf8', (errW) => {
//             if (errW) { return console.log(errW); }
//         });
//         });
//         fs.readFile('dist/src/loaders/spurtConnectLoader.js', 'utf8', (err1: any,data1: any) => {
//             if (err1) {
//                 return console.log(err1);
//             }
//             const spurtSourcePath = 'path.join(__dirname, ' + "'../../'" + ', ' + "'views')";
//             const spurtDestPath = 'path.join(__dirname, ' + "'../../../'" + ', ' + "'views')";
//             console.log(spurtSourcePath + 'spurtSourcePath');
//             console.log(spurtDestPath + 'spurtDestPath');
//             const result1 = data1.replace(spurtSourcePath , spurtDestPath);
//             fs.writeFile('dist/src/loaders/spurtConnectLoader.js', result1, 'utf8', (err2) => {
//                 if (err2) { return console.log(err2); }
//             });
//         });
//     }
// }
// data();
//# sourceMappingURL=app.js.map