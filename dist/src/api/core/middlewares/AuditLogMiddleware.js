"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingMiddleware = void 0;
const tslib_1 = require("tslib");
const AuditLog_1 = require("../models/AuditLog");
const typedi_1 = require("typedi");
const AuditLogService_1 = require("../services/AuditLogService");
const routing_controllers_1 = require("routing-controllers");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeorm_1 = require("typeorm");
let LoggingMiddleware = class LoggingMiddleware {
    use(request, response, next) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (request && request.user && request.user.userId) {
                const auditLogService = typedi_1.Container.get(AuditLogService_1.AuditLogService);
                const requestIp = require('request-ip');
                const routeSplit = request.url.split('/');
                const moduleName = (_b = (_a = routeSplit[1]) === null || _a === void 0 ? void 0 : _a.split('?')[0]) !== null && _b !== void 0 ? _b : undefined;
                if (moduleName) {
                    // get excpet first 30 days data
                    const auditMonth = (0, moment_1.default)().subtract(1, 'months').format('YYYY-MM-DD');
                    const exceptOneMonthRcrd = yield auditLogService.find({
                        where: {
                            createdDate: (0, typeorm_1.LessThan)(auditMonth),
                        },
                    });
                    if (exceptOneMonthRcrd.length) {
                        yield auditLogService.delete(exceptOneMonthRcrd);
                    }
                    const auditLog = new AuditLog_1.AuditLog();
                    auditLog.userId = request.user.userId;
                    auditLog.logType = 'response';
                    auditLog.requestUrl = request.url;
                    const source = request.headers['user-agent'];
                    const ua = source;
                    auditLog.browserInfo = JSON.stringify({ ip: requestIp.getClientIp(request), browser: ua });
                    switch (request.method) {
                        case 'POST':
                            auditLog.description = moduleName + ' has been created by ' + request.user.firstName;
                            break;
                        case 'GET':
                            auditLog.description = moduleName + ' has been read by ' + request.user.firstName;
                            break;
                        case 'PUT':
                            auditLog.description = moduleName + ' has been updated by ' + request.user.firstName;
                            break;
                        case 'DELETE':
                            auditLog.description = moduleName + ' has been deleted by ' + request.user.firstName;
                            break;
                        default:
                            auditLog.description = undefined;
                    }
                    auditLog.params = JSON.stringify(request.body);
                    auditLog.method = request.method;
                    auditLog.userName = request.user.firstName;
                    auditLog.module = moduleName;
                    yield auditLogService.createOrUpdate(auditLog);
                }
            }
            next();
        });
    }
};
LoggingMiddleware = tslib_1.__decorate([
    (0, routing_controllers_1.Middleware)({ type: 'after' })
], LoggingMiddleware);
exports.LoggingMiddleware = LoggingMiddleware;
//# sourceMappingURL=AuditLogMiddleware.js.map