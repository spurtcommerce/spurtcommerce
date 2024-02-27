"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddConstraintInBlogCategoryPath1651310850012 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddConstraintInBlogCategoryPath1651310850012 {
    constructor() {
        this.blogCategoryToBlogPathForeignKeys = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_blog_path_blog_category',
            columnNames: ['blog_category_id'],
            referencedColumnNames: ['blog_category_id'],
            referencedTableName: 'blog_category',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('blog_category_path');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('blog_category_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.blogCategoryToBlogPathForeignKeys);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('blog_category_path');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('blog_category_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.blogCategoryToBlogPathForeignKeys);
            }
        });
    }
}
exports.AddConstraintInBlogCategoryPath1651310850012 = AddConstraintInBlogCategoryPath1651310850012;
//# sourceMappingURL=1651310850012-AddConstraintInBlogCategoryPath.js.map