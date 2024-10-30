"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInVendorTable1602321897451 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInVendorTable1602321897451 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('vendor', 'company_cover_image');
            if (!ifExist) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'company_cover_image',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExistt = yield queryRunner.hasColumn('vendor', 'company_cover_image_path');
            if (!ifExistt) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'company_cover_image_path',
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
            yield queryRunner.dropColumn('vendor', 'company_cover_image');
            yield queryRunner.dropColumn('vendor', 'company_cover_image_path');
        });
    }
}
exports.AddColumnInVendorTable1602321897451 = AddColumnInVendorTable1602321897451;
//# sourceMappingURL=1602321897451-AddColumnInVendorTable.js.map