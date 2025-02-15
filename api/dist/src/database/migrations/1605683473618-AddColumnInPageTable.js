"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInPageTable1605683473618 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInPageTable1605683473618 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('page', 'slug_name');
            if (!ifExist) {
                yield queryRunner.addColumn('page', new typeorm_1.TableColumn({
                    name: 'slug_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('page', 'slug_name');
        });
    }
}
exports.AddColumnInPageTable1605683473618 = AddColumnInPageTable1605683473618;
//# sourceMappingURL=1605683473618-AddColumnInPageTable.js.map