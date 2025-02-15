"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddIndustryIdInVendorTable1717065236250 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddIndustryIdInVendorTable1717065236250 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_vendor_industry_industry_id',
            columnNames: ['industry_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'industry',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('vendor', 'industry_id');
            if (!ifExist) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'industry_id',
                    type: 'int',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            yield queryRunner.query('UPDATE vendor SET industry_id = 1');
            yield queryRunner.query('ALTER TABLE `vendor` MODIFY COLUMN `industry_id` int not null');
            const getTable = yield queryRunner.getTable('vendor');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('industry_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(getTable, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddIndustryIdInVendorTable1717065236250 = AddIndustryIdInVendorTable1717065236250;
//# sourceMappingURL=1717065236250-AddIndustryIdInVendorTable.js.map