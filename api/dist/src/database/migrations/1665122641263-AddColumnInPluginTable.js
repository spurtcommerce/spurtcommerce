"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInPluginTable1665122641263 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInPluginTable1665122641263 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('plugins', 'slug_name');
            if (!ifExist) {
                yield queryRunner.addColumn('plugins', new typeorm_1.TableColumn({
                    name: 'slug_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('plugins', 'slug_name');
        });
    }
}
exports.AddColumnInPluginTable1665122641263 = AddColumnInPluginTable1665122641263;
//# sourceMappingURL=1665122641263-AddColumnInPluginTable.js.map