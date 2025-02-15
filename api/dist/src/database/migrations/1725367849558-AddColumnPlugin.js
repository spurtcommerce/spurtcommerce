"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnPlugin1725367849558 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnPlugin1725367849558 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('plugins', 'display_name');
            if (!columnExist) {
                yield queryRunner.addColumn('plugins', new typeorm_1.TableColumn({
                    name: 'display_name',
                    type: 'varchar',
                    isPrimary: false,
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
exports.AddColumnPlugin1725367849558 = AddColumnPlugin1725367849558;
//# sourceMappingURL=1725367849558-AddColumnPlugin.js.map