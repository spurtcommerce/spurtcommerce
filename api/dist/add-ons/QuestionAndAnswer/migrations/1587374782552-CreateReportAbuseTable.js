"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReportAbuseTable1587374782552 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateReportAbuseTable1587374782552 {
    constructor() {
        this.questionForeignKeys = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_question_tbl_report_abuse',
            columnNames: ['question_id'],
            referencedColumnNames: ['question_id'],
            referencedTableName: 'product_question',
            onDelete: 'CASCADE',
        });
        this.answerForeignKeys = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_answer_tbl_report_abuse',
            columnNames: ['answer_id'],
            referencedColumnNames: ['answer_id'],
            referencedTableName: 'product_answer',
            onDelete: 'CASCADE',
        });
        this.customerForeignKeys = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_customer_tbl_report_abuse',
            columnNames: ['customer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customer',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'answer_report_abuse',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'customer_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'question_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'answer_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'reason_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'remark',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'is_active',
                        type: 'integer',
                        length: '11',
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
            const ifExsist = yield queryRunner.hasTable('answer_report_abuse');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const getTable = yield queryRunner.getTable('answer_report_abuse');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('question_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.questionForeignKeys);
            }
            const ifDataExsist1 = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('answer_id') !== -1);
            if (!ifDataExsist1) {
                yield queryRunner.createForeignKey(table, this.answerForeignKeys);
            }
            const ifDataExsist2 = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('customer_id') !== -1);
            if (!ifDataExsist2) {
                yield queryRunner.createForeignKey(table, this.customerForeignKeys);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('answer_report_abuse', true);
        });
    }
}
exports.CreateReportAbuseTable1587374782552 = CreateReportAbuseTable1587374782552;
//# sourceMappingURL=1587374782552-CreateReportAbuseTable.js.map