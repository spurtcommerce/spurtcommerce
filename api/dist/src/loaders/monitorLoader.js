"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.monitorLoader = void 0;
const tslib_1 = require("tslib");
const express_basic_auth_1 = tslib_1.__importDefault(require("express-basic-auth"));
const express_status_monitor_1 = tslib_1.__importDefault(require("express-status-monitor"));
const env_1 = require("../env");
const monitorLoader = (settings) => {
    if (settings && env_1.env.monitor.enabled) {
        const expressApp = settings.getData('express_app');
        expressApp.use((0, express_status_monitor_1.default)());
        expressApp.get(env_1.env.monitor.route, env_1.env.monitor.username ? (0, express_basic_auth_1.default)({
            users: {
                [`${env_1.env.monitor.username}`]: env_1.env.monitor.password,
            },
            challenge: true,
        }) : (req, res, next) => next(), (0, express_status_monitor_1.default)().pageRoute);
    }
};
exports.monitorLoader = monitorLoader;
//# sourceMappingURL=monitorLoader.js.map