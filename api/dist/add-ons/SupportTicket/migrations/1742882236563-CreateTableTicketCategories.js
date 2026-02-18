"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableTicketCategories1742882236563 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateTableTicketCategories1742882236563 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tableExist = yield queryRunner.hasTable('ticket_categories');
            if (!tableExist) {
                const table = new typeorm_1.Table({
                    name: 'ticket_categories',
                    columns: [
                        {
                            name: 'id',
                            type: 'int',
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: 'increment',
                        },
                        {
                            name: 'category_name',
                            type: 'varchar',
                            isNullable: false,
                        },
                        {
                            name: 'parent_category_id',
                            type: 'int',
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
exports.CreateTableTicketCategories1742882236563 = CreateTableTicketCategories1742882236563;
//# sourceMappingURL=1742882236563-CreateTableTicketCategories.js.map