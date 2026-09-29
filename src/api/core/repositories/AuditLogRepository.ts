import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { AuditLog } from '../models/AuditLog';
import { getDataSource } from '../../../loaders/typeormLoader'; // adjust path as needed

@Service()
export class AuditLogRepository {
  public repository: Repository<AuditLog>;

  constructor() {
    this.repository = getDataSource().getRepository(AuditLog);
  }

  public async findAuditLogData(fromDate: string, toDate: string): Promise<any[]> {
    return this.repository
      .createQueryBuilder('auditLog')
      .select(['auditLog.auditLogId AS auditLogId'])
      .where('auditLog.createdDate >= :fromDate AND auditLog.createdDate <= :toDate', { fromDate, toDate }).getRawMany();
  }
}
