"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductRatingImagesTable1737091346152 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateProductRatingImagesTable1737091346152 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_product_rating_images_product_rating_rating_id',
            columnNames: ['rating_id'],
            referencedColumnNames: ['rating_id'],
            referencedTableName: 'product_rating',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'product_rating_images',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'file_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'file_path',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'rating_id',
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
                        name: 'file_type',
                        type: 'varchar',
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
            const ifExsist = yield queryRunner.hasTable('product_rating_images');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const getTable = yield queryRunner.getTable('product_rating_images');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('rating_id') !== -1);
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
exports.CreateProductRatingImagesTable1737091346152 = CreateProductRatingImagesTable1737091346152;
//# sourceMappingURL=1737091346152-CreateProductRatingImagesTable.js.map