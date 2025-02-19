"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductViewLogTable1552376547486 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateProductViewLogTable1552376547486 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'product_view_log',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        length: '11',
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isPrimary: true,
                        isNullable: false,
                    }, {
                        name: 'product_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'first_name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'last_name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'email',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'username',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'mobile',
                        type: 'bigint',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'address',
                        type: 'varchar',
                        length: '255',
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
            const ifExsist = yield queryRunner.hasTable('product_view_log');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('product_view_log', true);
        });
    }
}
exports.CreateProductViewLogTable1552376547486 = CreateProductViewLogTable1552376547486;
//# sourceMappingURL=1552376547486-CreateProductViewLogTable.js.map