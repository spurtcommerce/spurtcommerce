"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingMiddleware = void 0;
const tslib_1 = require("tslib");
const AuditLog_1 = require("../models/AuditLog");
const typedi_1 = require("typedi");
const AuditLogService_1 = require("../services/AuditLogService");
const path = tslib_1.__importStar(require("path"));
const routing_controllers_1 = require("routing-controllers");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeorm_1 = require("typeorm");
let LoggingMiddleware = class LoggingMiddleware {
    use(request, response, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (request && request.user) {
                const auditLogService = typedi_1.Container.get(AuditLogService_1.AuditLogService);
                const requestIp = require('request-ip');
                const actionJson = path.join(process.cwd(), 'views' + '/' + 'admin_actions.json');
                const actionData = require(actionJson);
                const withoutRouteArray = ['add-category', 'update-category', 'delete-category', 'categorylist', 'category-list-intree',
                    'update-category-slug', 'category-count', 'category-detail'];
                const routeSplit = request.url.split('/');
                const findParamApi = routeSplit.indexOf('api') ? routeSplit.indexOf('api') : 1;
                const moduleName = routeSplit[findParamApi + 1];
                const routeTwo = (routeSplit && routeSplit[2]) ? (routeSplit[2].includes('?') ? routeSplit[2].substr(0, routeSplit[2].indexOf('?')) : routeSplit[2]) : '';
                const routeThree = (routeSplit && routeSplit[3]) ? (routeSplit[3].includes('?') ? routeSplit[3].substr(0, routeSplit[3].indexOf('?')) : routeSplit[3]) : '';
                const isRoute = (routeSplit && routeSplit[2] && !withoutRouteArray[2].includes(routeSplit[2])) ? true : false;
                const filterByFunc = function filterBy(list, criteria) {
                    return list.filter(candidate => Object.keys(criteria).every(key => candidate[key] === criteria[key]));
                };
                const val = yield actionData.actions[actionData.actions.map((item) => {
                    return item.action;
                }).indexOf(routeTwo)];
                const actionValue = isRoute ? filterByFunc(actionData.actions, { action: routeThree, route: routeTwo }) : val;
                const keyObject = isRoute ? actionValue[0] : actionValue;
                if (keyObject) {
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
                            auditLog.description = keyObject.value + ' has been created by ' + request.user.firstName;
                            break;
                        case 'GET':
                            auditLog.description = keyObject.value + ' has been read by ' + request.user.firstName;
                            break;
                        case 'PUT':
                            auditLog.description = keyObject.value + ' has been updated by ' + request.user.firstName;
                            break;
                        case 'DELETE':
                            auditLog.description = keyObject.value + ' has been deleted by ' + request.user.firstName;
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