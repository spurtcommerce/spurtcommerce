"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddServiceChargesColumnInProduct1581679252934 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddServiceChargesColumnInProduct1581679252934 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('product', 'service_charges');
            if (!ifExist) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'service_charges',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist1 = yield queryRunner.hasColumn('product', 'product_slug');
            if (!ifExist1) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'product_slug',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist2 = yield queryRunner.hasColumn('product', 'service_charges');
            if (!ifExist2) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'service_charges',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist4 = yield queryRunner.hasColumn('product', 'price_update_file_log_id');
            if (!ifExist4) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'price_update_file_log_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('vendor', 'price_update_file_log_id');
            yield queryRunner.dropColumn('vendor', 'product_slug');
            yield queryRunner.dropColumn('vendor', 'service_charges');
        });
    }
}
exports.AddServiceChargesColumnInProduct1581679252934 = AddServiceChargesColumnInProduct1581679252934;
//# sourceMappingURL=1581679252934-AddServiceChargesColumnInProduct.js.map