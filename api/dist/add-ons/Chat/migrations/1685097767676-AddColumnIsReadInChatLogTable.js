"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnIsReadInChatLogTable1685097767676 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnIsReadInChatLogTable1685097767676 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('chat_log', 'is_read');
            if (!columnExist) {
                yield queryRunner.addColumn('chat_log', new typeorm_1.TableColumn({
                    name: 'is_read',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
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
exports.AddColumnIsReadInChatLogTable1685097767676 = AddColumnIsReadInChatLogTable1685097767676;
//# sourceMappingURL=1685097767676-AddColumnIsReadInChatLogTable.js.map