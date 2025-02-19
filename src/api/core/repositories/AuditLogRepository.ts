import { EntityRepository, Repository } from 'typeorm';

import { AuditLog } from '../models/AuditLog';

@EntityRepository(AuditLog)
export class AuditLogRepository extends Repository<AuditLog>  {
    public async findAuditLogData(fromDate: string, toDate: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(AuditLog, 'auditLog');
        query.select(['auditLog.auditLogId as auditLogId']);
        query.where('(auditLog.createdDate >= :fromDate AND auditLog.createdDate <= :toDate)', {fromDate , toDate});
        return query.getRawMany();
    }

}
