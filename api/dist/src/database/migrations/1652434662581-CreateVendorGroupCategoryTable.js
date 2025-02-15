"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVendorGroupCategoryTable1652434662581 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateVendorGroupCategoryTable1652434662581 {
    constructor() {
        this.table = new typeorm_1.Table({
            name: 'vendor_group_category',
            columns: [
                {
                    name: 'id',
                    type: 'INT',
                    length: '11',
                    isPrimary: true,
                    isGenerated: true,
                    isNullable: false,
                    generationStrategy: 'increment',
                }, {
                    name: 'vendor_group_id',
                    type: 'INT',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'category_id',
                    type: 'INT',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'is_active',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
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
                }, {
                    name: 'created_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        });
        this.table_fk = new typeorm_1.TableForeignKey({
            name: 'fk_vendor_group_id',
            columnNames: ['vendor_group_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'vendor_group',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isExist = yield queryRunner.hasTable(this.table);
            if (!isExist) {
                yield queryRunner.createTable(this.table);
                yield queryRunner.createForeignKey(this.table, this.table_fk);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isExist = yield queryRunner.hasTable(this.table);
            if (isExist) {
                yield queryRunner.dropForeignKey(this.table, this.table_fk);
                yield queryRunner.dropTable(this.table);
            }
        });
    }
}
exports.CreateVendorGroupCategoryTable1652434662581 = CreateVendorGroupCategoryTable1652434662581;
//# sourceMappingURL=1652434662581-CreateVendorGroupCategoryTable.js.map