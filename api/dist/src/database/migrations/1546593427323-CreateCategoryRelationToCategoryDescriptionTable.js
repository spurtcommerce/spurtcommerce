"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryRelationToCategoryDescriptionTable1546593427323 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateCategoryRelationToCategoryDescriptionTable1546593427323 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_Category_CategoryDescription',
            columnNames: ['category_id'],
            referencedColumnNames: ['category_id'],
            referencedTableName: 'category',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('category_description');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('category_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('category_description');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('category_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKey);
            }
        });
    }
}
exports.CreateCategoryRelationToCategoryDescriptionTable1546593427323 = CreateCategoryRelationToCategoryDescriptionTable1546593427323;
//# sourceMappingURL=1546593427323-CreateCategoryRelationToCategoryDescriptionTable.js.map