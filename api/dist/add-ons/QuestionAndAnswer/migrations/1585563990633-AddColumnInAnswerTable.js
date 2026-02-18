"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInAnswerTable1585563990633 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInAnswerTable1585563990633 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('product_answer', 'default_answer');
            if (!ifExist) {
                yield queryRunner.addColumn('product_answer', new typeorm_1.TableColumn({
                    name: 'default_answer',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 0,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('product_answer', 'default_answer');
        });
    }
}
exports.AddColumnInAnswerTable1585563990633 = AddColumnInAnswerTable1585563990633;
//# sourceMappingURL=1585563990633-AddColumnInAnswerTable.js.map