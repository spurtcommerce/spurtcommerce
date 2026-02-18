"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginRouteSupplierManagement1735984726862 = void 0;
const tslib_1 = require("tslib");
const Plugin_1 = require("../../../src/api/core/models/Plugin");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddPluginRouteSupplierManagement1735984726862 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeormLoader_1.getDataSource)().getRepository(Plugin_1.Plugins);
            const plugin = yield repo.findOne({
                where: {
                    slugName: 'supplier-management',
                },
            });
            if (plugin) {
                plugin.routes = '~/api/supplier~,~/api/supplier/~,~/api/supplier/create-supplier~,~/api/supplier/update-supplier/~,~/api/supplier/status/update~,~/api/supplier/create-contact~,~/api/supplier/contacts/list~,~/api/supplier/contact/~,~/api/supplier/contacts/status~,~/api/supplier/document/~,~/api/supplier/export/supplier~,~/api/supplier/export/supplier-contact~,~/api/supplier/delete-multiple/supplier~,~/api/supplier/delete-multiple/contact~';
                yield repo.save(plugin);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddPluginRouteSupplierManagement1735984726862 = AddPluginRouteSupplierManagement1735984726862;
//# sourceMappingURL=1735984726862-AddPluginRouteSupplierManagement.js.map