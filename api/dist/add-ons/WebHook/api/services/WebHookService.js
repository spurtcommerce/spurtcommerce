"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebHookService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const WebHookRepository_1 = require("../repositories/WebHookRepository");
let WebHookService = class WebHookService {
    constructor(webHookRepository) {
        this.webHookRepository = webHookRepository;
        // -
    }
    find(condition) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.webHookRepository.repository.findAndCount(condition);
        });
    }
    findOne(condition) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.webHookRepository.repository.findOne(condition);
        });
    }
    save(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.webHookRepository.repository.save(payload);
        });
    }
};
exports.WebHookService = WebHookService;
exports.WebHookService = WebHookService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [WebHookRepository_1.WebHookRepository])
], WebHookService);
//# sourceMappingURL=WebHookService.js.map