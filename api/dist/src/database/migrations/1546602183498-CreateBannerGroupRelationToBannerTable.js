"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBannerGroupRelationToBannerTable1546602183498 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateBannerGroupRelationToBannerTable1546602183498 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_BannerGroup_Banner',
            columnNames: ['banner_group_id'],
            referencedColumnNames: ['banner_group_id'],
            referencedTableName: 'banner_group',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('banner');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('banner_group_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('banner');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('banner_group_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKey);
            }
        });
    }
}
exports.CreateBannerGroupRelationToBannerTable1546602183498 = CreateBannerGroupRelationToBannerTable1546602183498;
//# sourceMappingURL=1546602183498-CreateBannerGroupRelationToBannerTable.js.map