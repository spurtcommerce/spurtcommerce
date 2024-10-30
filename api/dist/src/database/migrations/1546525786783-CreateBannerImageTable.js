"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBannerImageTable1546525786783 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateBannerImageTable1546525786783 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'banner_image',
                columns: [
                    {
                        name: 'banner_image_id',
                        type: 'int',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'banner_id',
                        type: 'varchar',
                        length: '32',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'link',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'image',
                        type: 'varchar',
                        length: '45',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'is_active',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'created_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    }, {
                        name: 'modified_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    }, {
                        name: 'created_by',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'modified_by',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('banner_image');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('banner_image');
        });
    }
}
exports.CreateBannerImageTable1546525786783 = CreateBannerImageTable1546525786783;
//# sourceMappingURL=1546525786783-CreateBannerImageTable.js.map