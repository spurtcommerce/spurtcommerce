"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnCreatedAndModifiedDateIndustryTable1729081065564 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnCreatedAndModifiedDateIndustryTable1729081065564 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnCreatedDateExist = yield queryRunner.hasColumn('industry', 'created_date');
            if (!columnCreatedDateExist) {
                yield queryRunner.addColumn('industry', new typeorm_1.TableColumn({
                    name: 'created_date',
                    type: 'timestamp',
                    isNullable: true,
                }));
            }
            const columnModifiedDateExist = yield queryRunner.hasColumn('industry', 'modified_date');
            if (!columnModifiedDateExist) {
                yield queryRunner.addColumn('industry', new typeorm_1.TableColumn({
                    name: 'modified_date',
                    type: 'timestamp',
                    isNullable: true,
                }));
            }
            const columnCreatedByExist = yield queryRunner.hasColumn('industry', 'created_by');
            if (!columnCreatedByExist) {
                yield queryRunner.addColumn('industry', new typeorm_1.TableColumn({
                    name: 'created_by',
                    type: 'int',
                    isNullable: true,
                }));
            }
            const columnModifiedByExist = yield queryRunner.hasColumn('industry', 'modified_by');
            if (!columnModifiedByExist) {
                yield queryRunner.addColumn('industry', new typeorm_1.TableColumn({
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
exports.AddColumnCreatedAndModifiedDateIndustryTable1729081065564 = AddColumnCreatedAndModifiedDateIndustryTable1729081065564;
//# sourceMappingURL=1729081065564-AddColumnCreatedAndModifiedDateIndustryTable.js.map