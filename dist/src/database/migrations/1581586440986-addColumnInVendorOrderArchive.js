"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInVendorOrderArchive1581586440986 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInVendorOrderArchive1581586440986 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('vendor_order_archive', 'commission');
            if (!ifExist) {
                yield queryRunner.addColumn('vendor_order_archive', new typeorm_1.TableColumn({
                    name: 'commission',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 0,
                }));
            }
            const ifExistt = yield queryRunner.hasColumn('vendor_order_archive', 'order_product_id');
            if (!ifExistt) {
                yield queryRunner.addColumn('vendor_order_archive', new typeorm_1.TableColumn({
                    name: 'order_product_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('vendor_order_archive', 'commission');
            yield queryRunner.dropColumn('vendor_order_archive', 'order_product_id');
        });
    }
}
exports.AddColumnInVendorOrderArchive1581586440986 = AddColumnInVendorOrderArchive1581586440986;
//# sourceMappingURL=1581586440986-addColumnInVendorOrderArchive.js.map