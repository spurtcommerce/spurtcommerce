"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserRelationToUserGroupTable1546521833384 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateUserRelationToUserGroupTable1546521833384 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_users_usergroup',
            columnNames: ['user_group_id'],
            referencedColumnNames: ['group_id'],
            referencedTableName: 'user_group',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('users');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('user_group_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('users');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('user_group_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKey);
            }
        });
    }
}
exports.CreateUserRelationToUserGroupTable1546521833384 = CreateUserRelationToUserGroupTable1546521833384;
//# sourceMappingURL=1546521833384-CreateUserRelationToUserGroupTable.js.map