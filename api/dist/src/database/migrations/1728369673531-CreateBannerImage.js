"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBannerImage1728369673531 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateBannerImage1728369673531 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_banner_images_banner_banner_id',
            columnNames: ['banner_id'],
            referencedColumnNames: ['banner_id'],
            referencedTableName: 'banner',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'banner_images',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'image_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'image_path',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'is_primary',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'banner_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'is_active',
                        type: 'int',
                        default: 1,
                        isNullable: true,
                    },
                    {
                        name: 'is_delete',
                        type: 'int',
                        default: 0,
                        isNullable: true,
                    },
                    {
                        name: 'created_date',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'modified_date',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'modified_by',
                        type: 'int',
                        isNullable: true,
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('banner_images');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const getTable = yield queryRunner.getTable('banner_images');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('banner_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.CreateBannerImage1728369673531 = CreateBannerImage1728369673531;
//# sourceMappingURL=1728369673531-CreateBannerImage.js.map