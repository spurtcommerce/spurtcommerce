"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLog = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment_1 = tslib_1.__importDefault(require("moment"));
const BaseModel_1 = require("./BaseModel");
const User_1 = require("./User");
let AuditLog = class AuditLog extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], AuditLog.prototype, "auditLogId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    tslib_1.__metadata("design:type", Number)
], AuditLog.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'user_name' }),
    tslib_1.__metadata("design:type", String)
], AuditLog.prototype, "userName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'method' }),
    tslib_1.__metadata("design:type", String)
], AuditLog.prototype, "method", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'request_url' }),
    tslib_1.__metadata("design:type", String)
], AuditLog.prototype, "requestUrl", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'object' }),
    tslib_1.__metadata("design:type", String)
], AuditLog.prototype, "object", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'log_type' }),
    tslib_1.__metadata("design:type", String)
], AuditLog.prototype, "logType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'description' }),
    tslib_1.__metadata("design:type", String)
], AuditLog.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'params' }),
    tslib_1.__metadata("design:type", String)
], AuditLog.prototype, "params", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'browser_info' }),
    tslib_1.__metadata("design:type", String)
], AuditLog.prototype, "browserInfo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'module' }),
    tslib_1.__metadata("design:type", String)
], AuditLog.prototype, "module", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => User_1.User, user => user.auditLog),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    tslib_1.__metadata("design:type", Array)
], AuditLog.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AuditLog.prototype, "createDetails", null);
AuditLog = tslib_1.__decorate([
    (0, typeorm_1.Entity)('audit_log')
], AuditLog);
exports.AuditLog = AuditLog;
//# sourceMappingURL=AuditLog.js.map