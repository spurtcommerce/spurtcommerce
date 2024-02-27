"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteFilterSectionItemTable1680168497836 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class SiteFilterSectionItemTable1680168497836 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_site_filter_section_item',
            columnNames: ['site_filter_section_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'site_filter_section',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'site_filter_section_item',
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
                        name: 'site_filter_section_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'item_name',
                        type: 'varchar',
                        length: '225',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'item_slug',
                        type: 'varchar',
                        length: '225',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('site_filter_section_item');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
                const getTable = yield queryRunner.getTable('site_filter_section_item');
                const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('site_filter_section_id') !== -1);
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
exports.SiteFilterSectionItemTable1680168497836 = SiteFilterSectionItemTable1680168497836;
//# sourceMappingURL=1680168497836-SiteFilterSectionItemTable.js.map