"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnCreatedAndModifiedDateCountryTable1729079210120 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnCreatedAndModifiedDateCountryTable1729079210120 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnCreatedDateExist = yield queryRunner.hasColumn('country', 'created_date');
            if (!columnCreatedDateExist) {
                yield queryRunner.addColumn('country', new typeorm_1.TableColumn({
                    name: 'created_date',
                    type: 'timestamp',
                    isNullable: true,
                }));
            }
            const columnModifiedDateExist = yield queryRunner.hasColumn('country', 'modified_date');
            if (!columnModifiedDateExist) {
                yield queryRunner.addColumn('country', new typeorm_1.TableColumn({
                    name: 'modified_date',
                    type: 'timestamp',
                    isNullable: true,
                }));
            }
            const columnCreatedByExist = yield queryRunner.hasColumn('country', 'created_by');
            if (!columnCreatedByExist) {
                yield queryRunner.addColumn('country', new typeorm_1.TableColumn({
                    name: 'created_by',
                    type: 'int',
                    isNullable: true,
                }));
            }
            const columnModifiedByExist = yield queryRunner.hasColumn('country', 'modified_by');
            if (!columnModifiedByExist) {
                yield queryRunner.addColumn('country', new typeorm_1.TableColumn({
                    name: 'modified_by',
                    type: 'int',
                    isNullable: true,
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
exports.AddColumnCreatedAndModifiedDateCountryTable1729079210120 = AddColumnCreatedAndModifiedDateCountryTable1729079210120;
//# sourceMappingURL=1729079210120-AddColumnCreatedAndModifiedDateCountryTable.js.map