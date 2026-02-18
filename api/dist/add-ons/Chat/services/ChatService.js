"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const ChatRepository_1 = require("../repositories/ChatRepository");
const ChatLog_1 = require("../models/ChatLog");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
let ChatService = class ChatService {
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
        // --
    }
    create(chatLog) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.chatRepository.repository.save(chatLog);
        });
    }
    find(condtion) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.chatRepository.repository.find(condtion ? condtion : {});
        });
    }
    findOne(condtion) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.chatRepository.repository.findOne(condtion);
        });
    }
    update(chatLog, condition) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.chatRepository.repository.update(condition ? condition : {}, chatLog);
        });
    }
    delete(condition) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.chatRepository.repository.delete(condition);
        });
    }
    getLastMessageDate(senderId, vendorId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield (0, typeormLoader_1.getDataSource)().getRepository(ChatLog_1.ChatLog).createQueryBuilder('chat_log');
            query.select('Max(chat_log.createdDate) AS maxDate');
            query.where('chat_log.senderId = :senderId', { senderId });
            query.andWhere('chat_log.receiverId = :vendorId', { vendorId });
            return query.getRawOne();
        });
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [ChatRepository_1.ChatRepository])
], ChatService);
//# sourceMappingURL=ChatService.js.map