"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatebannerRelationToBannerImageDescriptionTable1546594100673 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreatebannerRelationToBannerImageDescriptionTable1546594100673 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_Banner_BannerImageDescription',
            columnNames: ['banner_id'],
            referencedColumnNames: ['banner_id'],
            referencedTableName: 'banner',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('banner_image_description');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('banner_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('banner_image_description');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('banner_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKey);
            }
        });
    }
}
exports.CreatebannerRelationToBannerImageDescriptionTable1546594100673 = CreatebannerRelationToBannerImageDescriptionTable1546594100673;
//# sourceMappingURL=1546594100673-CreatebannerRelationToBannerImageDescriptionTable.js.map