"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSkuColumn1603105123172 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddSkuColumn1603105123172 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('product_discount', 'sku_id');
            if (!ifExist) {
                yield queryRunner.addColumn('product_discount', new typeorm_1.TableColumn({
                    name: 'sku_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist1 = yield queryRunner.hasColumn('product_special', 'sku_id');
            if (!ifExist1) {
                yield queryRunner.addColumn('product_special', new typeorm_1.TableColumn({
                    name: 'sku_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist2 = yield queryRunner.hasColumn('product_tire_price', 'sku_id');
            if (!ifExist2) {
                yield queryRunner.addColumn('product_tire_price', new typeorm_1.TableColumn({
                    name: 'sku_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('product_discount', 'sku_id');
            yield queryRunner.dropColumn('product_special', 'sku_id');
            yield queryRunner.dropColumn('product_tire_price', 'sku_id');
        });
    }
}
exports.AddSkuColumn1603105123172 = AddSkuColumn1603105123172;
//# sourceMappingURL=1603105123172-AddSkuColumn.js.map