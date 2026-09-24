/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';
import { VendorAuditLog } from '../models/VendorAuditLog';

@Service()
export class VendorAuditLogRepository {
    public repository: Repository<VendorAuditLog>;
    constructor() {
        this.repository = getDataSource().getRepository(VendorAuditLog);
    }
    public async findAuditLogData(fromDate: string, toDate: string, tenantId: number): Promise<any> {
        const query: any = await this.repository.manager.createQueryBuilder(VendorAuditLog, 'vendorAuditLog');
        query.select(['vendorAuditLog.auditLogId as auditLogId']);
        query.where('(vendorAuditLog.createdDate >= :fromDate AND vendorAuditLog.createdDate <= :toDate)', { fromDate, toDate });
        query.andWhere('(vendorAuditLog.tenantId = :tenantId )', { tenantId });
        return query.getRawMany();
    }
}
