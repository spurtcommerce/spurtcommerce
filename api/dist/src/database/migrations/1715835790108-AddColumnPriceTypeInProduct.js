"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnPriceTypeInProduct1715835790108 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnPriceTypeInProduct1715835790108 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('product', 'price_type');
            if (!columnExist) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'price_type',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 1,
                }));
                const productRepo = (0, typeorm_1.getRepository)('Product');
                yield productRepo.update({ priceType: (0, typeorm_1.IsNull)() }, { priceType: 1 });
                yield queryRunner.changeColumn('product', new typeorm_1.TableColumn({
                    name: 'price_type',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 1,
                }), new typeorm_1.TableColumn({
                    name: 'price_type',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                    default: 1,
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
exports.AddColumnPriceTypeInProduct1715835790108 = AddColumnPriceTypeInProduct1715835790108;
//# sourceMappingURL=1715835790108-AddColumnPriceTypeInProduct.js.map