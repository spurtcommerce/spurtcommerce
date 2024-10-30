"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicLoader = void 0;
const tslib_1 = require("tslib");
const express = tslib_1.__importStar(require("express"));
const path = tslib_1.__importStar(require("path"));
const serve_favicon_1 = tslib_1.__importDefault(require("serve-favicon"));
const publicLoader = (settings) => {
    if (settings) {
        const expressApp = settings.getData('express_app');
        expressApp
            // Serve static filles like images from the public folder
            .use(express.static(path.join(__dirname, '..', 'public'), { maxAge: 31557600000 }))
            .use(express.static(path.join(__dirname, '../../', 'views/assets'), { maxAge: 31557600000 }))
            // A favicon is a visual cue that client software, like browsers, use to identify a site
            .use((0, serve_favicon_1.default)(path.join(__dirname, '..', 'public', 'favicon.ico')));
    }
    const webhookAddon = require('../../add-ons/WebHook/WebHookConfig');
    if (webhookAddon) {
        (() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            yield webhookAddon.webHookInit();
        }))();
    }
};
exports.publicLoader = publicLoader;
//# sourceMappingURL=publicLoader.js.map