// import { Container } from 'typedi';
// import { VendorAuditLogService } from '../services/VendorAuditLogService';
// import { VendorAuditLog } from '../models/VendorAuditLog';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
// import moment from 'moment';
// import { LessThan } from 'typeorm';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'after' })
export class VendorLoggingMiddleware implements ExpressMiddlewareInterface {
    public async use(request: any, response: any, next: any): Promise<void> {
        // if (request?.user?.vendor) {
        //     const vendorAuditLogService = Container.get<VendorAuditLogService>(VendorAuditLogService);
        //     const requestIp = require('request-ip');
        //     const routeSplit = request.url.split('/');
        //     const moduleName = routeSplit[1]?.split('?')[0] ?? undefined;
        //     if (moduleName) {
        //         // get excpet first 30 days data
        //         const auditMonth = moment().subtract(1, 'months').format('YYYY-MM-DD');
        //         const exceptOneMonthRcrd = await vendorAuditLogService.find({
        //             where: {
        //                 createdDate: LessThan(auditMonth),
        //             },
        //         });
        //         if (exceptOneMonthRcrd.length) {
        //             await vendorAuditLogService.delete(exceptOneMonthRcrd);

        //         }
        //         const vendorAuditLog = new VendorAuditLog();
        //         vendorAuditLog.vendorUserId = request.user.id;
        //         vendorAuditLog.logType = 'response';
        //         vendorAuditLog.requestUrl = request.url;
        //         vendorAuditLog.tenantId = request.user.tenantId;
        //         const source = request.headers['user-agent'];
        //         const ua = source;
        //         vendorAuditLog.browserInfo = JSON.stringify({ ip: requestIp.getClientIp(request), browser: ua });
        //         switch (request.method) {
        //             case 'POST':
        //                 vendorAuditLog.description = moduleName + ' has been created by ' + request.user.firstName;
        //                 break;
        //             case 'GET':
        //                 vendorAuditLog.description = moduleName + ' has been read by ' + request.user.firstName;
        //                 break;
        //             case 'PUT':
        //                 vendorAuditLog.description = moduleName + ' has been updated by ' + request.user.firstName;
        //                 break;
        //             case 'DELETE':
        //                 vendorAuditLog.description = moduleName + ' has been deleted by ' + request.user.firstName;
        //                 break;
        //             default:
        //                 vendorAuditLog.description = undefined;

        //         }
        //         vendorAuditLog.params = JSON.stringify(request.body);
        //         vendorAuditLog.method = request.method;
        //         vendorAuditLog.userName = request.user.firstName;
        //         vendorAuditLog.module = moduleName;
        //         await vendorAuditLogService.createOrUpdate(vendorAuditLog);

        //     }
        // }
        next();
    }
}
