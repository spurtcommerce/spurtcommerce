"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginSupplierManagement1729166794554 = void 0;
const tslib_1 = require("tslib");
const Plugin_1 = require("../../../src/api/core/models/Plugin");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddPluginSupplierManagement1729166794554 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield (0, typeormLoader_1.getDataSource)().getRepository(Plugin_1.Plugins).save({
                pluginName: 'SupplierManagement',
                slugName: 'supplier-management',
                pluginAvatar: '',
                pluginAvatarPath: '',
                pluginType: 'Marketplace',
                pluginTimestamp: 1729166794554,
                pluginStatus: 1,
                isEditable: 0,
                displayName: 'Supplier Management',
                routes: '~/api/supplier~,~/api/supplier/~,~/api/supplier/create-supplier~,~/api/supplier/update-supplier/~,~/api/supplier/status/update~,~/api/supplier/create-contact~,~/api/supplier/contacts/list~,~/api/supplier/contact/~,~/api/supplier/contacts/status~,~/api/supplier/document/~,~/api/supplier/export/supplier~,~/api/supplier/export/supplier-contact~,~/api/supplier/delete-multiple-supplier~,~/api/supplier/delete-multiple/contact~',
                createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
            });
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddPluginSupplierManagement1729166794554 = AddPluginSupplierManagement1729166794554;
//# sourceMappingURL=1729166794554-AddPluginSupplierManagement.js.map