"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnInPageGroup1606204705980 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AlterColumnInPageGroup1606204705980 {
    constructor() {
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_page_page_group1',
            columnNames: ['page_group_id'],
            referencedColumnNames: ['group_id'],
            referencedTableName: 'page_group',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('page');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('page_group_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKey1);
            }
            yield queryRunner.dropTable('page_group', true);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `page_group` RENAME COLUMN `title` TO `group_name`');
            yield queryRunner.query('ALTER TABLE `page_group` RENAME COLUMN `page_group_id` TO `group_id`');
        });
    }
}
exports.AlterColumnInPageGroup1606204705980 = AlterColumnInPageGroup1606204705980;
//# sourceMappingURL=1606204705980-AlterColumnInPageGroup.js.map