import { Repository } from 'typeorm';
import { AuditLog } from '../models/AuditLog';
import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';

@Service()
export class AuditLogRepository {
    public repository: Repository<AuditLog>;
    constructor() {
        this.repository = getDataSource().getRepository(AuditLog);
    }

    public async findAuditLogData(fromDate: string, toDate: string): Promise<any> {
        const query = this.repository
            .createQueryBuilder('auditLog')
            .select(['auditLog.auditLogId as auditLogId'])
            .where(
                'auditLog.createdDate >= :fromDate AND auditLog.createdDate <= :toDate',
                { fromDate, toDate }
            );
        return query.getRawMany();
    }
}
