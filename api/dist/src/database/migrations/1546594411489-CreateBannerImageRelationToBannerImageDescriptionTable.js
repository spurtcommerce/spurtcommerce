"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBannerImageRelationToBannerImageDescriptionTable1546594411489 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateBannerImageRelationToBannerImageDescriptionTable1546594411489 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_BannerImage_BannerImageDescription',
            columnNames: ['banner_image_id'],
            referencedColumnNames: ['banner_image_id'],
            referencedTableName: 'banner_image',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('banner_image_description');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('banner_image_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('banner_image_description');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('banner_image_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKey);
            }
        });
    }
}
exports.CreateBannerImageRelationToBannerImageDescriptionTable1546594411489 = CreateBannerImageRelationToBannerImageDescriptionTable1546594411489;
//# sourceMappingURL=1546594411489-CreateBannerImageRelationToBannerImageDescriptionTable.js.map