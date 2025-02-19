"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddForeignKeyToPermissionModule1733402679634 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddForeignKeyToPermissionModule1733402679634 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('permission_module');
            // Check if the foreign key already exists
            const existingForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('module_group_id') !== -1);
            // If the foreign key doesn't exist, create it
            if (!existingForeignKey) {
                yield queryRunner.query(`
                DELETE FROM permission_module
                WHERE module_group_id NOT IN (
                  SELECT module_group_id
                  FROM permission_module_group
                );
              `);
                yield queryRunner.createForeignKey('permission_module', // Name of the child table
                new typeorm_1.TableForeignKey({
                    columnNames: ['module_group_id'],
                    referencedTableName: 'permission_module_group',
                    referencedColumnNames: ['module_group_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE', // Optional: Define the action on update (e.g., CASCADE)
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddForeignKeyToPermissionModule1733402679634 = AddForeignKeyToPermissionModule1733402679634;
//# sourceMappingURL=1733402679634-AddForeignKeyToPermissionModule.js.map