"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogRepository = void 0;
const tslib_1 = require("tslib");
const AuditLog_1 = require("../models/AuditLog");
const typedi_1 = require("typedi");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
let AuditLogRepository = class AuditLogRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(AuditLog_1.AuditLog);
    }
    findAuditLogData(fromDate, toDate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = this.repository
                .createQueryBuilder('auditLog')
                .select(['auditLog.auditLogId as auditLogId'])
                .where('auditLog.createdDate >= :fromDate AND auditLog.createdDate <= :toDate', { fromDate, toDate });
            return query.getRawMany();
        });
    }
};
exports.AuditLogRepository = AuditLogRepository;
exports.AuditLogRepository = AuditLogRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], AuditLogRepository);
//# sourceMappingURL=AuditLogRepository.js.map