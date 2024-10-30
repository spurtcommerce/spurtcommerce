"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventDispatchLoader = void 0;
const tslib_1 = require("tslib");
const glob_1 = tslib_1.__importDefault(require("glob"));
const env_1 = require("../env");
/**
 * eventDispatchLoader
 * ------------------------------
 * This loads all the created subscribers into the project, so we do not have to
 * import them manually
 */
const eventDispatchLoader = (settings) => {
    if (settings) {
        const patterns = env_1.env.app.dirs.subscribers;
        patterns.forEach((pattern) => {
            (0, glob_1.default)(pattern, (err, files) => {
                for (const file of files) {
                    require(file);
                }
            });
        });
    }
};
exports.eventDispatchLoader = eventDispatchLoader;
//# sourceMappingURL=eventDispatchLoader.js.map