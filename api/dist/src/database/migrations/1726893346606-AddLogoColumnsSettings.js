"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddLogoColumnsSettings1726893346606 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddLogoColumnsSettings1726893346606 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnCheck = yield queryRunner.hasColumn('settings', 'admin_logo');
            if (!columnCheck) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'admin_logo',
                    type: 'varchar',
                    length: '30',
                    isPrimary: false,
                    isNullable: false,
                    default: false,
                }));
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'admin_logo_path',
                    type: 'varchar',
                    length: '30',
                    isPrimary: false,
                    isNullable: false,
                    default: false,
                }));
            }
            const columnCheck2 = yield queryRunner.hasColumn('settings', 'seller_logo');
            if (!columnCheck2) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'seller_logo',
                    type: 'varchar',
                    length: '30',
                    isPrimary: false,
                    isNullable: false,
                    default: false,
                }));
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'seller_logo_path',
                    type: 'varchar',
                    length: '30',
                    isPrimary: false,
                    isNullable: false,
                    default: false,
                }));
            }
            const columnCheck3 = yield queryRunner.hasColumn('settings', 'seller_logo2');
            if (!columnCheck3) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'seller_logo2',
                    type: 'varchar',
                    length: '30',
                    isPrimary: false,
                    isNullable: false,
                    default: false,
                }));
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'seller_logo2_path',
                    type: 'varchar',
                    length: '30',
                    isPrimary: false,
                    isNullable: false,
                    default: false,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddLogoColumnsSettings1726893346606 = AddLogoColumnsSettings1726893346606;
//# sourceMappingURL=1726893346606-AddLogoColumnsSettings.js.map