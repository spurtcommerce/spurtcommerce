"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCouponProductCategoryTable1679034454853 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateCouponProductCategoryTable1679034454853 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_coupon_Related_tbl_coupon_product_category',
            columnNames: ['vendor_coupon_id'],
            referencedColumnNames: ['vendor_coupon_id'],
            referencedTableName: 'coupon',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'coupon_product_category',
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
                        name: 'vendor_coupon_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'type',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'reference_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
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
            const hasTable = yield queryRunner.hasTable('coupon_product_category');
            if (!hasTable) {
                yield queryRunner.createTable(table);
            }
            const getTable = yield queryRunner.getTable('coupon_product_category');
            const keyExist = yield getTable.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_coupon_id') !== -1);
            if (!keyExist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('coupon_product_category', true);
        });
    }
}
exports.CreateCouponProductCategoryTable1679034454853 = CreateCouponProductCategoryTable1679034454853;
//# sourceMappingURL=1679034454853-CreateCouponProductCategoryTable.js.map