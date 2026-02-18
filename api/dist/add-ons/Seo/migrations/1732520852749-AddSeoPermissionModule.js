"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSeoPermissionModule1732520852749 = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddSeoPermissionModule1732520852749 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.query('SELECT * FROM `permission_module_group` WHERE `slug_name` = ' + '"seo"');
            if ((exist.length === 0)) {
                const SeoPermissionGroupSeed = [
                    {
                        name: 'SEO',
                        slugName: 'seo',
                        sortOrder: '81',
                        createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                ];
                (0, typeormLoader_1.getDataSource)().getRepository('PermissionModuleGroup').save(SeoPermissionGroupSeed);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddSeoPermissionModule1732520852749 = AddSeoPermissionModule1732520852749;
//# sourceMappingURL=1732520852749-AddSeoPermissionModule.js.map