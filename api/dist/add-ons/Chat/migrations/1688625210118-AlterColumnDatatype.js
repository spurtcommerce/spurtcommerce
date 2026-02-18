"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnDatatype1688625210118 = void 0;
const tslib_1 = require("tslib");
class AlterColumnDatatype1688625210118 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `chat_log` CHANGE `message_id` `message_id` VARCHAR(225) DEFAULT NULL');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `chat_log` CHANGE `message_id` `message_id` VARCHAR(225) DEFAULT NULL');
        });
    }
}
exports.AlterColumnDatatype1688625210118 = AlterColumnDatatype1688625210118;
//# sourceMappingURL=1688625210118-AlterColumnDatatype.js.map