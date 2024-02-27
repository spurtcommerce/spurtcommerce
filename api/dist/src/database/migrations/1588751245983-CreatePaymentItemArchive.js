"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentItemArchive1588751245983 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreatePaymentItemArchive1588751245983 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_paymentItemsArchive_tbl_payment_foreignKey',
            columnNames: ['payment_archive_id'],
            referencedColumnNames: ['payment_archive_id'],
            referencedTableName: 'payment_archive',
            onDelete: 'CASCADE',
        });
        this.tableForeignKeyy = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_paymentItemsArchive_tbl_orderProduct_foreignKey',
            columnNames: ['order_product_id'],
            referencedColumnNames: ['order_product_id'],
            referencedTableName: 'order_product',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'payment_items_archive',
                columns: [
                    {
                        name: 'payment_item_archive_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'payment_archive_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'order_product_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'total_amount',
                        type: 'DECIMAL',
                        length: '10,2',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'product_name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'product_quantity',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'product_price',
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
            const ifExsist = yield queryRunner.hasTable('payment_items_archive');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('payment_archive_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
            const ifDataExsistt = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_product_id') !== -1);
            if (!ifDataExsistt) {
                yield queryRunner.createForeignKey(table, this.tableForeignKeyy);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('payment_items_archive', true);
        });
    }
}
exports.CreatePaymentItemArchive1588751245983 = CreatePaymentItemArchive1588751245983;
//# sourceMappingURL=1588751245983-CreatePaymentItemArchive.js.map