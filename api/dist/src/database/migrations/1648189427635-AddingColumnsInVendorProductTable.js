"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddingColumnsInVendorProductTable1648189427635 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddingColumnsInVendorProductTable1648189427635 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('vendor_product', 'sku_id');
            if (!ifExist) {
                yield queryRunner.addColumn('vendor_product', new typeorm_1.TableColumn({
                    name: 'sku_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist1 = yield queryRunner.hasColumn('vendor_product', 'reuse');
            if (!ifExist1) {
                yield queryRunner.addColumn('vendor_product', new typeorm_1.TableColumn({
                    name: 'reuse',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist2 = yield queryRunner.hasColumn('vendor_product', 'reuse_status');
            if (!ifExist2) {
                yield queryRunner.addColumn('vendor_product', new typeorm_1.TableColumn({
                    name: 'reuse_status',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 0,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('vendor_product', 'sku_id');
            yield queryRunner.dropColumn('vendor_product', 'reuse');
            yield queryRunner.dropColumn('vendor_product', 'reuse_status');
        });
    }
}
exports.AddingColumnsInVendorProductTable1648189427635 = AddingColumnsInVendorProductTable1648189427635;
//# sourceMappingURL=1648189427635-AddingColumnsInVendorProductTable.js.map