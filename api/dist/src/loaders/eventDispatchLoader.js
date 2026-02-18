"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventDispatchLoader = void 0;
const tslib_1 = require("tslib");
const glob_1 = require("glob");
const env_1 = require("../env");
/**
 * eventDispatchLoader
 * ------------------------------
 * This loads all the created subscribers into the project, so we do not have to
 * import them manually
 */
const eventDispatchLoader = (settings) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (settings) {
        const patterns = env_1.env.app.dirs.subscribers;
        for (const pattern of patterns) {
            try {
                const files = yield (0, glob_1.glob)(pattern); // Direct promise-based usage
                for (const file of files) {
                    require(file);
                }
            }
            catch (err) {
                console.error(`Error processing pattern "${pattern}":`, err);
            }
        }
    }
});
exports.eventDispatchLoader = eventDispatchLoader;
//# sourceMappingURL=eventDispatchLoader.js.map