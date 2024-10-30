"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCustomerTableColumn1703918268729 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddCustomerTableColumn1703918268729 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const findColumn = yield queryRunner.hasColumn('customer', 'site_id');
            if (!findColumn) {
                yield queryRunner.addColumn('customer', new typeorm_1.TableColumn({
                    name: 'site_id',
                    type: 'INT',
                    isPrimary: false,
                    isNullable: true,
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
exports.AddCustomerTableColumn1703918268729 = AddCustomerTableColumn1703918268729;
//# sourceMappingURL=1703918268729-AddCustomerTableColumn.js.map