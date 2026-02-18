"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCouponUsageProductTable1679033767307 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateCouponUsageProductTable1679033767307 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_coupon_usage_Related_tbl_coupon_usage_product',
            columnNames: ['coupon_usage_id'],
            referencedColumnNames: ['coupon_usage_id'],
            referencedTableName: 'coupon_usage',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'coupon_usage_product',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'coupon_usage_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'customer_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'order_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'order_product_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'amount',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'discount_amount',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'created_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'created_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'modified_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'modified_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            });
            const hasTable = yield queryRunner.hasTable('coupon_usage_product');
            if (!hasTable) {
                yield queryRunner.createTable(table);
            }
            const getTable = yield queryRunner.getTable('coupon_usage_product');
            const keyExist = yield getTable.foreignKeys.find(fk => fk.columnNames.indexOf('coupon_usage_id') !== -1);
            if (!keyExist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('coupon_usage_product', true);
        });
    }
}
exports.CreateCouponUsageProductTable1679033767307 = CreateCouponUsageProductTable1679033767307;
//# sourceMappingURL=1679033767307-CreateCouponUsageProductTable.js.map