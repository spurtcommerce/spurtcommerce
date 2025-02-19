"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebHook = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let WebHook = class WebHook {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], WebHook.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], WebHook.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'slug' }),
    tslib_1.__metadata("design:type", String)
], WebHook.prototype, "slug", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'url' }),
    tslib_1.__metadata("design:type", String)
], WebHook.prototype, "url", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], WebHook.prototype, "isActive", void 0);
WebHook = tslib_1.__decorate([
    (0, typeorm_1.Entity)('webhook')
], WebHook);
exports.WebHook = WebHook;
//# sourceMappingURL=WebHook.js.map