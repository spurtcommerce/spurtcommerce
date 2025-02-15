"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteFilterCategoryTable1680164844544 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class SiteFilterCategoryTable1680164844544 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_site_filter_category',
            columnNames: ['site_filter_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'site_filter',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'site_filter_category',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        length: '11',
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isPrimary: true,
                        isNullable: false,
                    }, {
                        name: 'site_filter_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'category_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('site_filter_category');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
                const getTable = yield queryRunner.getTable('site_filter_category');
                const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('site_filter_id') !== -1);
                if (!ifDataExsist) {
                    yield queryRunner.createForeignKey(getTable, this.tableForeignKey);
                }
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.SiteFilterCategoryTable1680164844544 = SiteFilterCategoryTable1680164844544;
//# sourceMappingURL=1680164844544-SiteFilterCategoryTable.js.map