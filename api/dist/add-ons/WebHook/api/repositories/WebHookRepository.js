"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebHookRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const WebHook_1 = require("../models/WebHook");
let WebHookRepository = class WebHookRepository extends typeorm_1.Repository {
};
WebHookRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(WebHook_1.WebHook)
], WebHookRepository);
exports.WebHookRepository = WebHookRepository;
//# sourceMappingURL=WebHookRepository.js.map