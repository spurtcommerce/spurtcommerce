"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableVendorDocument1716271269831 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateTableVendorDocument1716271269831 {
    constructor() {
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_vendor_document_vendor_vendor_id',
            columnNames: ['vendor_id'],
            referencedColumnNames: ['vendor_id'],
            referencedTableName: 'vendor',
            onDelete: 'CASCADE',
        });
        this.tableForeignKey2 = new typeorm_1.TableForeignKey({
            name: 'fk_vendor_document_document_document_id',
            columnNames: ['document_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'document',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'vendor_document',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
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
                        name: 'document_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'file_name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'file_path',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'status',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'INT',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'created_date',
                        type: 'DATETIME',
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
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('vendor_document');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const getTable = yield queryRunner.getTable('vendor_document');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(getTable, this.tableForeignKey1);
            }
            const ifDataExsist1 = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('document_id') !== -1);
            if (!ifDataExsist1) {
                yield queryRunner.createForeignKey(getTable, this.tableForeignKey2);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.CreateTableVendorDocument1716271269831 = CreateTableVendorDocument1716271269831;
//# sourceMappingURL=1716271269831-CreateTableVendorDocument.js.map