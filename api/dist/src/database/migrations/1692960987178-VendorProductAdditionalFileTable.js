"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProductAdditionalFileTable1692960987178 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class VendorProductAdditionalFileTable1692960987178 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_vendor_product',
            columnNames: ['product_id'],
            referencedColumnNames: ['product_id'],
            referencedTableName: 'product',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'vendor_product_additional_file',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'product_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'file_name',
                        type: 'varchar',
                        length: '512',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'container_name',
                        type: 'varchar',
                        length: '512',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'modified_by',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'created_date',
                        type: 'date',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'modified_date',
                        type: 'date',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('vendor_product_additional_file');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
                const getTable = yield queryRunner.getTable('vendor_product_additional_file');
                const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
                if (!ifDataExsist) {
                    yield queryRunner.createForeignKey(getTable, this.tableForeignKey);
                }
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('vendor_product_additional_file');
        });
    }
}
exports.VendorProductAdditionalFileTable1692960987178 = VendorProductAdditionalFileTable1692960987178;
//# sourceMappingURL=1692960987178-VendorProductAdditionalFileTable.js.map