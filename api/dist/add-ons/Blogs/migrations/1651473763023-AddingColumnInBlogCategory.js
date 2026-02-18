"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddingColumnInBlogCategory1651473763023 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddingColumnInBlogCategory1651473763023 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('blog_category', 'category_slug');
            if (!ifExist) {
                yield queryRunner.addColumn('blog_category', new typeorm_1.TableColumn({
                    name: 'category_slug',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExists = yield queryRunner.hasColumn('blog_category', 'category_description');
            if (!ifExists) {
                yield queryRunner.addColumn('blog_category', new typeorm_1.TableColumn({
                    name: 'category_description',
                    type: 'text',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('blog_category', 'category_description');
        });
    }
}
exports.AddingColumnInBlogCategory1651473763023 = AddingColumnInBlogCategory1651473763023;
//# sourceMappingURL=1651473763023-AddingColumnInBlogCategory.js.map