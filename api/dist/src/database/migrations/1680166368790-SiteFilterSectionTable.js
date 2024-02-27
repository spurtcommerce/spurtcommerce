"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteFilterSectionTable1680166368790 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class SiteFilterSectionTable1680166368790 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_site_filter_section',
            columnNames: ['site_filter_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'site_filter',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'site_filter_section',
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
                        name: 'section_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'section_name',
                        type: 'varchar',
                        length: '225',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'section_type',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'section_slug',
                        type: 'varchar',
                        length: '225',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'sequence',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('site_filter_section');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
                const getTable = yield queryRunner.getTable('site_filter_section');
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
exports.SiteFilterSectionTable1680166368790 = SiteFilterSectionTable1680166368790;
//# sourceMappingURL=1680166368790-SiteFilterSectionTable.js.map