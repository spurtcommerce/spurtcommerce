"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddIsActiveAndDeleteInVendor1728276424858 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddIsActiveAndDeleteInVendor1728276424858 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Check if 'is_active' column does not exist, then add it
            const isActiveColumn = yield queryRunner.hasColumn('vendor', 'is_active');
            if (!isActiveColumn) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'is_active',
                    type: 'tinyint',
                    default: 1,
                }));
            }
            // Check if 'is_delete' column does not exist, then add it
            const isDeleteColumn = yield queryRunner.hasColumn('vendor', 'is_delete');
            if (!isDeleteColumn) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'is_delete',
                    type: 'tinyint',
                    default: 0,
                }));
            }
            // Update all existing records to have 'is_active' = 1 and 'is_delete' = 0
            yield queryRunner.query(`
            UPDATE vendor SET is_active = 1, is_delete = 0
        `);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Drop the 'is_active' column if it exists
            const isActiveColumn = yield queryRunner.hasColumn('vendor', 'is_active');
            if (isActiveColumn) {
                yield queryRunner.dropColumn('vendor', 'is_active');
            }
            // Drop the 'is_delete' column if it exists
            const isDeleteColumn = yield queryRunner.hasColumn('vendor', 'is_delete');
            if (isDeleteColumn) {
                yield queryRunner.dropColumn('vendor', 'is_delete');
            }
        });
    }
}
exports.AddIsActiveAndDeleteInVendor1728276424858 = AddIsActiveAndDeleteInVendor1728276424858;
//# sourceMappingURL=1728276424858-AddIsActiveAndDeleteInVendor.js.map