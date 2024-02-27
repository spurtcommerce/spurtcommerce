"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVendorOrderArchiveTable1579519310557 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateVendorOrderArchiveTable1579519310557 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_vendor_tbl_vendor_order_archive_foreignKey',
            columnNames: ['vendor_id'],
            referencedColumnNames: ['vendor_id'],
            referencedTableName: 'vendor',
            onDelete: 'CASCADE',
        });
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_order_tbl_vendor_order_archive_foreignKey',
            columnNames: ['order_id'],
            referencedColumnNames: ['order_id'],
            referencedTableName: 'order',
            onDelete: 'CASCADE',
        });
        this.tableForeignKey2 = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_vendor_order_status_tbl_vendor_order_archive_foreignKey',
            columnNames: ['sub_order_status_id'],
            referencedColumnNames: ['vendor_order_status_id'],
            referencedTableName: 'vendor_order_status',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'vendor_order_archive',
                columns: [
                    {
                        name: 'vendor_order_archive_id',
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
                        isNullable: false,
                    }, {
                        name: 'order_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'sub_order_id',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'sub_order_status_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'total',
                        type: 'DECIMAL',
                        length: '10,2',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'created_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'created_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'modified_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'modified_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('vendor_order_archive');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
            const ifDataExist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_id') !== -1);
            if (!ifDataExist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
            const ifDataExistt = table.foreignKeys.find(fk => fk.columnNames.indexOf('sub_order_status_id') !== -1);
            if (!ifDataExistt) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey2);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('vendor_order_archive', true);
        });
    }
}
exports.CreateVendorOrderArchiveTable1579519310557 = CreateVendorOrderArchiveTable1579519310557;
//# sourceMappingURL=1579519310557-CreateVendorOrderArchiveTable.js.map