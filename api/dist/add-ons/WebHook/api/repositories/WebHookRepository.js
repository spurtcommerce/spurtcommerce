"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebHookRepository = void 0;
const tslib_1 = require("tslib");
const WebHook_1 = require("../models/WebHook");
const typeormLoader_1 = require("../../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let WebHookRepository = class WebHookRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(WebHook_1.WebHook);
    }
};
exports.WebHookRepository = WebHookRepository;
exports.WebHookRepository = WebHookRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], WebHookRepository);
//# sourceMappingURL=WebHookRepository.js.map