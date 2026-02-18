"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const tslib_1 = require("tslib");
const ChatLog_1 = require("../models/ChatLog");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let ChatRepository = class ChatRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ChatLog_1.ChatLog);
    }
};
exports.ChatRepository = ChatRepository;
exports.ChatRepository = ChatRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ChatRepository);
//# sourceMappingURL=ChatRepository.js.map