"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const AuditLog_1 = require("../models/AuditLog");
let AuditLogRepository = class AuditLogRepository extends typeorm_1.Repository {
    findAuditLogData(fromDate, toDate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(AuditLog_1.AuditLog, 'auditLog');
            query.select(['auditLog.auditLogId as auditLogId']);
            query.where('(auditLog.createdDate >= :fromDate AND auditLog.createdDate <= :toDate)', { fromDate, toDate });
            return query.getRawMany();
        });
    }
};
AuditLogRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(AuditLog_1.AuditLog)
], AuditLogRepository);
exports.AuditLogRepository = AuditLogRepository;
//# sourceMappingURL=AuditLogRepository.js.map