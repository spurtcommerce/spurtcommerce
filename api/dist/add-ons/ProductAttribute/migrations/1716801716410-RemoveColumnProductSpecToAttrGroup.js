"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveColumnProductSpecToAttrGroup1716801716410 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class RemoveColumnProductSpecToAttrGroup1716801716410 {
    constructor() {
        this.tableForeignKeyy = new typeorm_1.TableForeignKey({
            name: 'fk_prd_spec_to_attr_grp_attr_grp_attribute_group_id',
            columnNames: ['attribute_group_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'attribute_group',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('product_spec_to_attribute_group');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('attribute_group_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKeyy);
            }
            yield queryRunner.query('ALTER TABLE `product_spec_to_attribute_group` DROP COLUMN `attribute_group_id`');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.RemoveColumnProductSpecToAttrGroup1716801716410 = RemoveColumnProductSpecToAttrGroup1716801716410;
//# sourceMappingURL=1716801716410-RemoveColumnProductSpecToAttrGroup.js.map