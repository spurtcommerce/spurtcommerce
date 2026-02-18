"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webHookInit = webHookInit;
exports.trigger = trigger;
const tslib_1 = require("tslib");
const typeormLoader_1 = require("../../src/loaders/typeormLoader");
const Plugin_1 = require("../../src/api/core/models/Plugin");
const path = tslib_1.__importStar(require("path"));
let webHook;
function webHookInit() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const webhooks = require('node-webhooks');
        const pluginRepository = (0, typeormLoader_1.getDataSource)().getRepository(Plugin_1.Plugins);
        const webHookUrlRegistrations = {};
        const isPluginActive = yield pluginRepository.findOne({ where: { slugName: 'webhook', pluginStatus: 1 } });
        if (isPluginActive) {
            const webHookEvents = require(path.join(process.cwd(), 'webHookConfig.json'));
            for (const event in webHookEvents) {
                if (true) {
                    webHookUrlRegistrations[event] = webHookEvents[event].api ? [webHookEvents[event].api] : [];
                }
            }
        }
        console.log(webHookUrlRegistrations);
        const registerHooks = () => {
            return new webhooks({
                db: webHookUrlRegistrations,
            });
        };
        webHook = registerHooks();
        const emitter = webHook.getEmitter();
        emitter.on('*.success', (shortname, statusCode, body) => {
            console.log('Success on trigger webHook ' + shortname + ' with status code ', statusCode, 'and body ', body);
        });
        emitter.on('*.failure', (shortname, statusCode, body) => {
            console.error('Error on trigger webHook ' + shortname + ' with status code ', statusCode, 'and body', body);
        });
        // --
    });
}
function trigger(event, params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        var _a;
        const webHookEvents = require(path.join(process.cwd(), 'webHookConfig.json'));
        const webHookAuthToken = (_a = webHookEvents[event].token) !== null && _a !== void 0 ? _a : '';
        webHook.trigger(event, { event, params }, { authorization: `Basic ${webHookAuthToken}` });
    });
}
//# sourceMappingURL=WebHookConfig.js.map