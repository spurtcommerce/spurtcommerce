"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVendorCategoryTable1571738429508 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateVendorCategoryTable1571738429508 {
    constructor() {
        this.VendorCategoryToVendorForeignKeys = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_vendor_category_tbl_vendor_foreignKey',
            columnNames: ['vendor_id'],
            referencedColumnNames: ['vendor_id'],
            referencedTableName: 'vendor',
            onDelete: 'CASCADE',
        });
        this.VendorCategoryToCategoryForeignKeys = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_vendor_category_tbl_category_foreignKey',
            columnNames: ['category_id'],
            referencedColumnNames: ['category_id'],
            referencedTableName: 'category',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'vendor_category',
                columns: [
                    {
                        name: 'vendor_category_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'vendor_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'category_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'vendor_category_commission',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('vendor_category');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.VendorCategoryToVendorForeignKeys);
            }
            const ifDataExist = table.foreignKeys.find(fk => fk.columnNames.indexOf('category_id') !== -1);
            if (!ifDataExist) {
                yield queryRunner.createForeignKey(table, this.VendorCategoryToCategoryForeignKeys);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('vendor_category', true);
        });
    }
}
exports.CreateVendorCategoryTable1571738429508 = CreateVendorCategoryTable1571738429508;
//# sourceMappingURL=1571738429508-CreateVendorCategoryTable.js.map