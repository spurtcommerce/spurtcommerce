"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableTicket1742883898295 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateTableTicket1742883898295 {
    constructor() {
        this.tableForeignKeyCategory = new typeorm_1.TableForeignKey({
            name: 'fk_tickets_ticket_categories_category_id',
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ticket_categories',
            onDelete: 'RESTRICT',
        });
        this.tableForeignKeySubCategory = new typeorm_1.TableForeignKey({
            name: 'fk_tickets_ticket_categories_sub_category_id',
            columnNames: ['sub_category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ticket_categories',
            onDelete: 'RESTRICT',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tableExist = yield queryRunner.hasTable('tickets');
            if (!tableExist) {
                const table = new typeorm_1.Table({
                    name: 'tickets',
                    columns: [
                        {
                            name: 'id',
                            type: 'int',
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: 'increment',
                        },
                        {
                            name: 'ref_id',
                            type: 'varchar',
                            isNullable: false,
                        },
                        {
                            name: 'user_id',
                            type: 'int',
                            isNullable: false,
                        },
                        {
                            name: 'user_type',
                            type: 'enum',
                            enum: ['buyer', 'seller', 'admin'],
                            isNullable: false,
                        },
                        {
                            name: 'category_id',
                            type: 'int',
                            isNullable: false,
                        },
                        {
                            name: 'sub_category_id',
                            type: 'int',
                            isNullable: true,
                        },
                        {
                            name: 'subject',
                            type: 'varchar',
                            isNullable: false,
                        },
                        {
                            name: 'description',
                            type: 'text',
                            isNullable: false,
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
                        {
                            name: 'status',
                            type: 'enum',
                            enum: ['open', 'pending', 'resolved'],
                            isNullable: false,
                        },
                    ],
                });
                yield queryRunner.createTable(table);
                const getTable = yield queryRunner.getTable('tickets');
                const ifCategoryIdExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('category_id') !== -1);
                if (!ifCategoryIdExsist) {
                    yield queryRunner.createForeignKey(table, this.tableForeignKeyCategory);
                }
                const ifSubCategoryIdExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('sub_category_id') !== -1);
                if (!ifSubCategoryIdExsist) {
                    yield queryRunner.createForeignKey(table, this.tableForeignKeySubCategory);
                }
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.CreateTableTicket1742883898295 = CreateTableTicket1742883898295;
//# sourceMappingURL=1742883898295-CreateTableTicket.js.map