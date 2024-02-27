"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddConstraintInBlogTable1651491997947 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddConstraintInBlogTable1651491997947 {
    constructor() {
        this.tableForeignKeys = new typeorm_1.TableForeignKey({
            name: 'fk_blog_category',
            columnNames: ['category_id'],
            referencedColumnNames: ['category_id'],
            referencedTableName: 'category',
            onDelete: 'CASCADE',
        });
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_blog_blog_category',
            columnNames: ['blog_category_id'],
            referencedColumnNames: ['blog_category_id'],
            referencedTableName: 'blog_category',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('blog');
            const ifDataExsists = table.foreignKeys.find(fk => fk.columnNames.indexOf('category_id') !== -1);
            if (ifDataExsists) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKeys);
            }
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('blog_category_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('blog');
            const ifDataExsists = table.foreignKeys.find(fk => fk.columnNames.indexOf('category_id') !== -1);
            if (ifDataExsists) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKey);
            }
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('blog_category_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKey);
            }
        });
    }
}
exports.AddConstraintInBlogTable1651491997947 = AddConstraintInBlogTable1651491997947;
//# sourceMappingURL=1651491997947-AddConstraintInBlogTable.js.map