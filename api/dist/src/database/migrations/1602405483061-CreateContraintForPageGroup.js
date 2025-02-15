"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContraintForPageGroup1602405483061 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateContraintForPageGroup1602405483061 {
    constructor() {
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_page_related_tbl_page_group_foreignKey',
            columnNames: ['page_group_id'],
            referencedColumnNames: ['group_id'],
            referencedTableName: 'page_group',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('page');
            const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('page_group_id') !== -1);
            if (!ifDataExsist1) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('page');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('page_group_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey1);
            }
        });
    }
}
exports.CreateContraintForPageGroup1602405483061 = CreateContraintForPageGroup1602405483061;
//# sourceMappingURL=1602405483061-CreateContraintForPageGroup.js.map