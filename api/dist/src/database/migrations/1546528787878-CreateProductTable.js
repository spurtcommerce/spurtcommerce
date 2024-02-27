"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductTable1546528787878 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateProductTable1546528787878 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'product',
                columns: [
                    {
                        name: 'product_id',
                        type: 'integer',
                        length: '11',
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isPrimary: true,
                        isNullable: false,
                    }, {
                        name: 'sku',
                        type: 'varchar',
                        length: '64',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'upc',
                        type: 'varchar',
                        length: '12',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'quantity',
                        type: 'integer',
                        length: '4',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'stock_status_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'image',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'image_path',
                        type: 'TEXT',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'manufacturer_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'shipping',
                        type: 'TINYINT',
                        length: '4',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'price',
                        type: 'DECIMAL',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'date_available',
                        type: 'DATE',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'sort_order',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'description',
                        type: 'TEXT',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'amount',
                        type: 'FLOAT',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'discount',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'subtract_stock',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'minimum_quantity',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'location',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'is_featured',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'today_deals',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'delete_flag',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                        default: 0,
                    }, {
                        name: 'wishlist_status',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                        default: 0,
                    }, {
                        name: 'condition',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'rating',
                        type: 'int',
                        length: '11',
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
            const ifExsist = yield queryRunner.hasTable('product');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('product', true);
        });
    }
}
exports.CreateProductTable1546528787878 = CreateProductTable1546528787878;
//# sourceMappingURL=1546528787878-CreateProductTable.js.map