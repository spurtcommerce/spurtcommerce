"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSupplierContactTable1716978089770 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateSupplierContactTable1716978089770 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_supplier_contact_supplier_supplier_id',
            columnNames: ['supplier_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'supplier',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'supplier_contact',
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
                        name: 'supplier_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar(55)',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'mobile',
                        type: 'bigint',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'is_active',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'is_delete',
                        type: 'int',
                        length: '11',
                        default: 0,
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'position',
                        type: 'varchar',
                        length: '255',
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
            const ifExsist = yield queryRunner.hasTable('supplier_contact');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const getTable = yield queryRunner.getTable('supplier_contact');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('supplier_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(getTable, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            //
        });
    }
}
exports.CreateSupplierContactTable1716978089770 = CreateSupplierContactTable1716978089770;
//# sourceMappingURL=1716978089770-CreateSupplierContactTable.js.map