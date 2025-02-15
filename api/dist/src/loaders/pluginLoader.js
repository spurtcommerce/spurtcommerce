"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginLoader = exports.pluginModule = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const promises_1 = require("fs/promises");
const typeorm_1 = require("typeorm");
const Plugin_1 = require("../api/core/models/Plugin");
const Migrations_1 = require("../api/core/models/Migrations");
exports.pluginModule = [];
const pluginLoader = (settings) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // default/core plugin initialize here.....
    exports.pluginModule.push('CashOnDelivery');
    exports.pluginModule.push('gmap');
    exports.pluginModule.push('gmail');
    exports.pluginModule.push('facebook');
    // --
    const addOnPath = path_1.default.join(__dirname + '/../../add-ons');
    const pluginList = (yield (0, promises_1.readdir)(addOnPath, { withFileTypes: true }))
        .filter(dirent => dirent.isDirectory())
        .map((dirent) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const key = dirent.name;
        if (key === 'Oauth' || key === 'Payment') {
            const subPath = path_1.default.join(addOnPath, '/', key);
            const subPluginList = (yield (0, promises_1.readdir)(subPath, { withFileTypes: true }))
                .filter(subDirent => subDirent.isDirectory()).map((subDirent) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
                exports.pluginModule.push(subDirent.name);
            }));
            yield Promise.all(subPluginList);
        }
        exports.pluginModule.push(key);
    }));
    yield Promise.all(pluginList);
    const pluginManager = (0, typeorm_1.getConnection)().getRepository(Plugin_1.Plugins);
    const migrations = (0, typeorm_1.getConnection)().getRepository(Migrations_1.Migrations);
    const PluginList = yield pluginManager.find({
        pluginName: (0, typeorm_1.Not)((0, typeorm_1.In)(exports.pluginModule)),
    });
    const timestamp = PluginList.map((plugin) => plugin.pluginTimestamp);
    Promise.all(timestamp);
    if ((timestamp === null || timestamp === void 0 ? void 0 : timestamp.length) > 0) {
        yield pluginManager.delete({
            pluginName: (0, typeorm_1.Not)((0, typeorm_1.In)(exports.pluginModule)),
        });
        yield migrations.delete({
            timestamp: (0, typeorm_1.In)(timestamp),
        });
    }
});
exports.pluginLoader = pluginLoader;
//# sourceMappingURL=pluginLoader.js.map