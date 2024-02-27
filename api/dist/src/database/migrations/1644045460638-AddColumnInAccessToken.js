"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInAccessToken1644045460638 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInAccessToken1644045460638 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('access_token', 'user_type');
            if (!ifExist) {
                yield queryRunner.addColumn('access_token', new typeorm_1.TableColumn({
                    name: 'user_type',
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
            yield queryRunner.dropColumn('access_token', 'user_type');
        });
    }
}
exports.AddColumnInAccessToken1644045460638 = AddColumnInAccessToken1644045460638;
//# sourceMappingURL=1644045460638-AddColumnInAccessToken.js.map