"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Plugin_1 = require("../models/Plugin");
const env_1 = require("../../env");
// import { lstatSync, readdirSync } from 'fs';
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
class HomeController {
    constructor() {
        // ---
    }
    home(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const directoryPath = path.join(process.cwd(), 'plugins' + '/');
            const directoryList = yield fs.readdirSync(directoryPath);
            const pluginRepository = (0, typeorm_1.getManager)().getRepository(Plugin_1.Plugins);
            const pluginList = yield pluginRepository.find();
            for (const directory of directoryList) {
                const index = pluginList.findIndex(p => p.pluginName.toLowerCase() === directory.toLowerCase());
                if (index === -1) {
                    const plugin = new Plugin_1.Plugins();
                    plugin.pluginName = directory;
                    plugin.pluginStatus = 0;
                    pluginList.push(plugin);
                }
            }
            res.render('pages/home', {
                data: pluginList,
                path: '../home',
                baseUrl: env_1.env.baseUrl + env_1.env.app.routePrefix,
                title: 'Home Page',
            });
        });
    }
    updateInactiveStatus(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const pluginRepository = (0, typeorm_1.getManager)().getRepository(Plugin_1.Plugins);
            const pluginData = yield pluginRepository.findOne(id);
            pluginData.pluginStatus = 0;
            yield pluginRepository.save(pluginData);
            res.redirect(env_1.env.pluginHomeRedirectUrl);
        });
    }
    updateActiveStatus(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const pluginRepository = (0, typeorm_1.getManager)().getRepository(Plugin_1.Plugins);
            const pluginData = yield pluginRepository.findOne(id);
            pluginData.pluginStatus = 1;
            yield pluginRepository.save(pluginData);
            res.redirect(env_1.env.pluginHomeRedirectUrl);
        });
    }
}
exports.HomeController = HomeController;
//# sourceMappingURL=HomeController.js.map