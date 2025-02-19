"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBannerTable1546526076621 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateBannerTable1546526076621 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'banner',
                columns: [
                    {
                        name: 'banner_id',
                        type: 'int',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'title',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'sort_order',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'url',
                        type: 'text',
                        length: '45',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'banner_group_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'container_name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'view_page_count',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                        default: 0,
                    }, {
                        name: 'banner_group_banner_group_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'link',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'content',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'image_path',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'position',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'image',
                        type: 'TEXT',
                        isPrimary: false,
                        isNullable: true,
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
            const ifExsist = yield queryRunner.hasTable('banner');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('banner', true);
        });
    }
}
exports.CreateBannerTable1546526076621 = CreateBannerTable1546526076621;
//# sourceMappingURL=1546526076621-CreateBannerTable.js.map