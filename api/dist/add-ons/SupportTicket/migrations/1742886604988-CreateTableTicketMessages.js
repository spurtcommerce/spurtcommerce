"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableTicketMessages1742886604988 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateTableTicketMessages1742886604988 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_ticket_messages_tickets_ticket_id',
            columnNames: ['ticket_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tickets',
            onDelete: 'RESTRICT',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tableExist = yield queryRunner.hasTable('ticket_messages');
            if (!tableExist) {
                const table = new typeorm_1.Table({
                    name: 'ticket_messages',
                    columns: [
                        {
                            name: 'id',
                            type: 'int',
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: 'increment',
                        },
                        {
                            name: 'ticket_id',
                            type: 'int',
                            isNullable: false,
                        },
                        {
                            name: 'sender_id',
                            type: 'int',
                            isNullable: false,
                        },
                        {
                            name: 'sender_type',
                            type: 'enum',
                            enum: ['buyer', 'seller', 'admin'],
                            isNullable: false,
                        },
                        {
                            name: 'message',
                            type: 'text',
                            isNullable: false,
                        },
                        {
                            name: 'sent_at',
                            type: 'timestamp',
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
                        {
                            name: 'created_by_type',
                            type: 'enum',
                            enum: ['buyer', 'seller', 'admin'],
                            isNullable: true,
                        },
                        {
                            name: 'modified_by_type',
                            type: 'enum',
                            enum: ['buyer', 'seller', 'admin'],
                            isNullable: true,
                        },
                    ],
                });
                yield queryRunner.createTable(table);
                const getTable = yield queryRunner.getTable('ticket_messages');
                const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('ticket_id') !== -1);
                if (!ifDataExsist) {
                    yield queryRunner.createForeignKey(table, this.tableForeignKey);
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
exports.CreateTableTicketMessages1742886604988 = CreateTableTicketMessages1742886604988;
//# sourceMappingURL=1742886604988-CreateTableTicketMessages.js.map