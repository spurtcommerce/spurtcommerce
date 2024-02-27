"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationToServiceTable1560773355102 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddRelationToServiceTable1560773355102 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_service_to_category_tbl_service_category',
            columnNames: ['service_category_id'],
            referencedColumnNames: ['service_category_id'],
            referencedTableName: 'service_category',
            onDelete: 'CASCADE',
        });
        this.tableForeignKeys = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_service_to_category_tbl_service',
            columnNames: ['service_id'],
            referencedColumnNames: ['service_id'],
            referencedTableName: 'service',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('service_to_category');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('service_category_id') !== -1);
            const ifTableExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('service_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
            if (!ifTableExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKeys);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('service_to_category');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('service_category_id') !== -1);
            const ifTableExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('service_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKey);
            }
            if (ifTableExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKeys);
            }
        });
    }
}
exports.AddRelationToServiceTable1560773355102 = AddRelationToServiceTable1560773355102;
//# sourceMappingURL=1560773355102-AddRelationToServiceTable.js.map