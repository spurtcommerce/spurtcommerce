import { AuditLog } from '../models/AuditLog';
import { Container } from 'typedi';
import { AuditLogService } from '../services/AuditLogService';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import moment from 'moment';
import { LessThan } from 'typeorm';
@Middleware({ type: 'after' })
export class LoggingMiddleware implements ExpressMiddlewareInterface {
  public async use(request: any, response: any, next: any): Promise<void> {
    if (request && request.user && request.user.userId) {
      const auditLogService = Container.get<AuditLogService>(AuditLogService);
      const requestIp = require('request-ip');
      const routeSplit = request.url.split('/');
      const moduleName = routeSplit[1]?.split('?')[0] ?? undefined;
      if (moduleName) {
        // get excpet first 30 days data
        const auditMonth = moment().subtract(1, 'months').format('YYYY-MM-DD');
        const exceptOneMonthRcrd = await auditLogService.find({
          where: {
            createdDate: LessThan(auditMonth),
          },
        });
        if (exceptOneMonthRcrd.length) {
          await auditLogService.delete(exceptOneMonthRcrd);

        }
        const auditLog = new AuditLog();
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
        await auditLogService.createOrUpdate(auditLog);

      }
    }
    next();
  }
}
