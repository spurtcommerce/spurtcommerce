"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInProductAnswer1585290132090 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInProductAnswer1585290132090 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('product_answer', 'likes');
            if (!ifExist) {
                yield queryRunner.addColumn('product_answer', new typeorm_1.TableColumn({
                    name: 'likes',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 0,
                }));
            }
            const ifExistt = yield queryRunner.hasColumn('product_answer', 'dislikes');
            if (!ifExistt) {
                yield queryRunner.addColumn('product_answer', new typeorm_1.TableColumn({
                    name: 'dislikes',
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
            yield queryRunner.dropColumn('product_answer', 'likes');
            yield queryRunner.dropColumn('product_answer', 'unlikes');
        });
    }
}
exports.AddColumnInProductAnswer1585290132090 = AddColumnInProductAnswer1585290132090;
//# sourceMappingURL=1585290132090-AddColumnInProductAnswer.js.map