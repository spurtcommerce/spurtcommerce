"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePermissionModule1584083115669 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreatePermissionModule1584083115669 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_permission_module_group_Related_tbl_permission_group',
            columnNames: ['module_group_id'],
            referencedColumnNames: ['module_group_id'],
            referencedTableName: 'permission_module_group',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'permission_module',
                columns: [
                    {
                        name: 'module_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'slug_name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'sort_order',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'module_group_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'created_by',
                        type: 'integer',
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
                        name: 'modified_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'modified_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('permission_module');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('module_group_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('permission_module', true);
        });
    }
}
exports.CreatePermissionModule1584083115669 = CreatePermissionModule1584083115669;
//# sourceMappingURL=1584083115669-CreatePermissionModule.js.map