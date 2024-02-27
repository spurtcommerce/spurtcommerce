"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDiscountTable1546580179314 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateProductDiscountTable1546580179314 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'product_discount',
                columns: [
                    {
                        name: 'product_discount_id',
                        type: 'integer',
                        length: '11',
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isPrimary: true,
                        isNullable: false,
                    }, {
                        name: 'product_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'quantity',
                        type: 'integer',
                        length: '4',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'priority',
                        type: 'integer',
                        length: '5',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'price',
                        type: 'DECIMAL(15,4)',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'date_start',
                        type: 'DATE',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'date_end',
                        type: 'DATE',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'is_active',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'created_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'modified_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'created_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    }, {
                        name: 'modified_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('product_discount');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('product_discount', true);
        });
    }
}
exports.CreateProductDiscountTable1546580179314 = CreateProductDiscountTable1546580179314;
//# sourceMappingURL=1546580179314-CreateProductDiscountTable.js.map