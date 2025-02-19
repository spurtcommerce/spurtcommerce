"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebHookService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const WebHookRepository_1 = require("../repositories/WebHookRepository");
let WebHookService = class WebHookService {
    constructor(webHookRepository) {
        this.webHookRepository = webHookRepository;
        // -
    }
    find(condition) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.webHookRepository.findAndCount(condition);
        });
    }
    findOne(condition) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.webHookRepository.findOne(condition);
        });
    }
    save(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.webHookRepository.save(payload);
        });
    }
};
WebHookService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__metadata("design:paramtypes", [WebHookRepository_1.WebHookRepository])
], WebHookService);
exports.WebHookService = WebHookService;
//# sourceMappingURL=WebHookService.js.map