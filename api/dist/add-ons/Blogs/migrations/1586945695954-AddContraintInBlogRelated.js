"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddContraintInBlogRelated1586945695954 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddContraintInBlogRelated1586945695954 {
    constructor() {
        this.RelatedBlogToBlogForeignKeys = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_related_blog_id_tbl_blog',
            columnNames: ['related_blog_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'blog',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('blog_related');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('related_blog_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.RelatedBlogToBlogForeignKeys);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('blog_related');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('related_blog_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.RelatedBlogToBlogForeignKeys);
            }
        });
    }
}
exports.AddContraintInBlogRelated1586945695954 = AddContraintInBlogRelated1586945695954;
//# sourceMappingURL=1586945695954-AddContraintInBlogRelated.js.map