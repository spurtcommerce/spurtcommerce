"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInUser1565682493625 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInUser1565682493625 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('users', 'delete_flag');
            if (!ifExist) {
                yield queryRunner.addColumn('users', new typeorm_1.TableColumn({
                    name: 'delete_flag',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('users', 'delete_flag');
        });
    }
}
exports.AddColumnInUser1565682493625 = AddColumnInUser1565682493625;
//# sourceMappingURL=1565682493625-AddColumnInUser.js.map