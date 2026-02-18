"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTblVendorQuotation1712991555525 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateTblVendorQuotation1712991555525 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('vendor_quotation', true);
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'vendor_quotation',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'vendor_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'quotation_product_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'quotation_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'total',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'created_date',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'int',
                        length: '11',
                        isNullable: true,
                        comment: 'MODIFIED USER ID',
                    },
                    {
                        name: 'modified_date',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        isNullable: true,
                    },
                    {
                        name: 'modified_by',
                        type: 'int',
                        length: '11',
                        isNullable: true,
                        comment: 'MODIFIED USER ID',
                    },
                ],
            }), true);
            yield queryRunner.createForeignKey('vendor_quotation', new typeorm_1.TableForeignKey({
                columnNames: ['quotation_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'quotation',
                onDelete: 'CASCADE',
            }));
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('vendor_quotation', true);
        });
    }
}
exports.CreateTblVendorQuotation1712991555525 = CreateTblVendorQuotation1712991555525;
//# sourceMappingURL=1712991555525-CreateTblVendorQuotation.js.map