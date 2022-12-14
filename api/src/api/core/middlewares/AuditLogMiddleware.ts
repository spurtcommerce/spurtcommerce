import { AuditLog } from '../models/AuditLog';
import { Container } from 'typedi';
import { AuditLogService } from '../services/AuditLogService';
import * as path from 'path';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import moment from 'moment';
import { LessThan } from 'typeorm';
@Middleware({ type: 'after' })

export class LoggingMiddleware implements ExpressMiddlewareInterface {
  public async use(request: any, response: any, next: any): Promise<void> {
    if (request && request.user) {
      const auditLogService = Container.get<AuditLogService>(AuditLogService);
      const requestIp = require('request-ip');
      const actionJson = path.join(process.cwd(), 'views' + '/' + 'admin_actions.json');
      const actionData = require(actionJson);
      const withoutRouteArray = ['add-category', 'update-category', 'delete-category', 'categorylist', 'category-list-intree'
        , 'update-category-slug', 'category-count', 'category-detail'];
      const routeSplit = request.url.split('/');
      const findParamApi = routeSplit.indexOf('api') ? routeSplit.indexOf('api') : 1;
      const moduleName = routeSplit[findParamApi + 1];
      const routeTwo = (routeSplit && routeSplit[2]) ? (routeSplit[2].includes('?') ? routeSplit[2].substr(0, routeSplit[2].indexOf('?')) : routeSplit[2]) : '';
      const routeThree = (routeSplit && routeSplit[3]) ? (routeSplit[3].includes('?') ? routeSplit[3].substr(0, routeSplit[3].indexOf('?')) : routeSplit[3]) : '';
      const isRoute = (routeSplit && routeSplit[2] && !withoutRouteArray[2].includes(routeSplit[2])) ? true : false;
      const filterByFunc = function filterBy(list: any, criteria: any): any {
        return list.filter(candidate =>
          Object.keys(criteria).every(key =>
            candidate[key] === criteria[key]
          )
        );
      };
      const val = await actionData.actions[actionData.actions.map((item: any): any => {
        return item.action;
      }).indexOf(routeTwo)];
      const actionValue = isRoute ? filterByFunc(actionData.actions, { action: routeThree, route: routeTwo }) : val;
      const keyObject = isRoute ? actionValue[0] : actionValue;
      if (keyObject) {
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
        await auditLogService.createOrUpdate(auditLog);

      }
    }
    next();
  }
}
