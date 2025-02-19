"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentArchive1588751152380 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreatePaymentArchive1588751152380 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_payment_archive_tbl_order_foreignKey',
            columnNames: ['order_id'],
            referencedColumnNames: ['order_id'],
            referencedTableName: 'order',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'payment_archive',
                columns: [
                    {
                        name: 'payment_archive_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'order_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'paid_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_number',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_information',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_amount',
                        type: 'DECIMAL',
                        length: '10,2',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_commission_amount',
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
                        default: 'CURRENT_TIMESTAMP',
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
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('payment_archive');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('payment_archive', true);
        });
    }
}
exports.CreatePaymentArchive1588751152380 = CreatePaymentArchive1588751152380;
//# sourceMappingURL=1588751152380-CreatePaymentArchive.js.map