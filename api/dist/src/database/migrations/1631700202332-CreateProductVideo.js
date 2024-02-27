"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductVideo1631700202332 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateProductVideo1631700202332 {
    constructor() {
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_product_tbl_product_video_foreignKey',
            columnNames: ['product_id'],
            referencedColumnNames: ['product_id'],
            referencedTableName: 'product',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'product_video',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'product_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'path',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'type',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                        comment: '1 -> video 2 -> embedded',
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
            const ifExsist = yield queryRunner.hasTable('product_video');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const tables = yield queryRunner.getTable('product_video');
            const ifDataExsist1 = tables.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
            if (!ifDataExsist1) {
                yield queryRunner.createForeignKey(tables, this.tableForeignKey1);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('product_video', true);
        });
    }
}
exports.CreateProductVideo1631700202332 = CreateProductVideo1631700202332;
//# sourceMappingURL=1631700202332-CreateProductVideo.js.map