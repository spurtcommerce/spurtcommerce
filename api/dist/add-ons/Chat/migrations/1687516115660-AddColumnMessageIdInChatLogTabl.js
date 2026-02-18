"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnMessageIdInChatLogTabl1687516115660 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnMessageIdInChatLogTabl1687516115660 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('chat_log', 'message_id');
            if (!ifExist) {
                yield queryRunner.addColumn('chat_log', new typeorm_1.TableColumn({
                    name: 'message_id',
                    type: 'INTEGER',
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
exports.AddColumnMessageIdInChatLogTabl1687516115660 = AddColumnMessageIdInChatLogTabl1687516115660;
//# sourceMappingURL=1687516115660-AddColumnMessageIdInChatLogTabl.js.map