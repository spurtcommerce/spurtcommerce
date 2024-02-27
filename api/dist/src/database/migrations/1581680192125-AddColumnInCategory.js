"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInCategory1581680192125 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInCategory1581680192125 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('category', 'category_slug');
            if (!ifExist) {
                yield queryRunner.addColumn('category', new typeorm_1.TableColumn({
                    name: 'category_slug',
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
            yield queryRunner.dropColumn('category', 'category_slug');
        });
    }
}
exports.AddColumnInCategory1581680192125 = AddColumnInCategory1581680192125;
//# sourceMappingURL=1581680192125-AddColumnInCategory.js.map