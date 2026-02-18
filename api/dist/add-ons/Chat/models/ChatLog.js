"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatLog = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeorm_1 = require("typeorm");
let ChatLog = class ChatLog {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
exports.ChatLog = ChatLog;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], ChatLog.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sender_id' }),
    tslib_1.__metadata("design:type", Number)
], ChatLog.prototype, "senderId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'receiver_id' }),
    tslib_1.__metadata("design:type", Number)
], ChatLog.prototype, "receiverId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'message' }),
    tslib_1.__metadata("design:type", String)
], ChatLog.prototype, "message", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'message_id' }),
    tslib_1.__metadata("design:type", String)
], ChatLog.prototype, "messageId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_read' }),
    tslib_1.__metadata("design:type", Number)
], ChatLog.prototype, "isRead", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'created_date' }),
    tslib_1.__metadata("design:type", String)
], ChatLog.prototype, "createdDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ChatLog.prototype, "createDetails", null);
exports.ChatLog = ChatLog = tslib_1.__decorate([
    (0, typeorm_1.Entity)('chat_log')
], ChatLog);
//# sourceMappingURL=ChatLog.js.map