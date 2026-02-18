"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCouponTable1679032959092 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateCouponTable1679032959092 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'coupon',
                columns: [
                    {
                        name: 'vendor_coupon_id',
                        type: 'int',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'vendor_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'coupon_name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'coupon_code',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'coupon_type',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'discount',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'minimum_purchase_amount',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'maximum_purchase_amount',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'coupon_conjunction',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'coupon_applies_sales',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'email_restrictions',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'applicable_for',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'free_shipping',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'start_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'end_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'max_user_per_coupon',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'no_of_time_coupon_valid_user',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'all_qualifying_items_apply',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'applied_cart_items_count',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'is_active',
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
            const hasTable = yield queryRunner.hasTable('coupon');
            if (!hasTable) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('coupon', true);
        });
    }
}
exports.CreateCouponTable1679032959092 = CreateCouponTable1679032959092;
//# sourceMappingURL=1679032959092-CreateCouponTable.js.map