"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductVirtualTable1755004124839 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateProductVirtualTable1755004124839 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tableExist = yield queryRunner.hasTable('product_virtual');
            if (!tableExist) {
                const table = new typeorm_1.Table({
                    name: 'product_virtual',
                    columns: [
                        {
                            name: 'id',
                            type: 'int',
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: 'increment',
                        },
                        {
                            name: 'product_id',
                            type: 'int',
                            isNullable: true,
                        },
                        {
                            name: 'sku_id',
                            type: 'int',
                            isNullable: true,
                        },
                        {
                            name: 'file_name',
                            type: 'varchar',
                            isNullable: true,
                        },
                        {
                            name: 'file_path',
                            type: 'varchar',
                            isNullable: true,
                        },
                        {
                            name: 'is_active',
                            type: 'tinyint',
                            default: 1,
                            isNullable: false,
                        },
                        {
                            name: 'is_delete',
                            type: 'tinyint',
                            default: 0,
                            isNullable: false,
                        },
                        {
                            name: 'created_date',
                            type: 'timestamp',
                            isNullable: true,
                        },
                        {
                            name: 'modified_date',
                            type: 'timestamp',
                            isNullable: true,
                        },
                        {
                            name: 'created_by',
                            type: 'int',
                            isNullable: true,
                        },
                        {
                            name: 'modified_by',
                            type: 'int',
                            isNullable: true,
                        },
                    ],
                });
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.CreateProductVirtualTable1755004124839 = CreateProductVirtualTable1755004124839;
//# sourceMappingURL=1755004124839-CreateProductDigitalTable.js.map