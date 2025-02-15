"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddIndustryIdToCategory1733553848401 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddIndustryIdToCategory1733553848401 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const hasColumn = yield queryRunner.hasColumn('category', 'industry_id');
            if (!hasColumn) {
                // Add the 'industry_id' column to the 'category' table
                yield queryRunner.addColumn('category', new typeorm_1.TableColumn({
                    name: 'industry_id',
                    type: 'int',
                    isNullable: true, // set to false if it's required
                }));
                yield queryRunner.query(`
                UPDATE category
                SET industry_id = (
                SELECT id
                FROM industry
                WHERE slug = 'other'
                LIMIT 1
              )
              WHERE industry_id IS NULL;
            `);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddIndustryIdToCategory1733553848401 = AddIndustryIdToCategory1733553848401;
//# sourceMappingURL=1733553848401-AddIndustryIdToCategory.js.map