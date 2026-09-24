/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { VendorSettingsRepository } from '../repositories/VendorSettingsRepository';
import { Like } from 'typeorm';
import { VendorSettings } from '../models/VendorSettings';
// import { VendorSettingsDomainService } from './VendorSettingsDomainService';
// import { env } from '../../../env';
@Service()
export class VendorSettingsService {

    constructor(
        private vendorSettingsRepository: VendorSettingsRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(settings: VendorSettings): Promise<VendorSettings> {
        this.log.info('create method called');
        const newSettings = await this.vendorSettingsRepository.repository.save(settings);
        return newSettings;
    }

    public async save(vendorSettings: any): Promise<any> {
        this.log.info('save method called');
        return this.vendorSettingsRepository.repository.save(vendorSettings);
    }

    public async find(vendorSettings: any): Promise<any> {
        this.log.info('find method called');
        return this.vendorSettingsRepository.repository.find(vendorSettings);
    }

    public findOne(vendorSettings: any): Promise<any> {
        this.log.info('findOne method called');
        return this.vendorSettingsRepository.repository.findOne(vendorSettings);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        return await this.vendorSettingsRepository.repository.delete(id);
    }

    public list(limit: number, select: any = [], relation: any = [], whereConditions: any = []): Promise<any> {
        this.log.info('list method called');
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        if (relation && relation.length > 0) {
            condition.relations = relation;
        }

        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                const operator: string = item.op;
                if (operator === 'where' && item.value !== '') {
                    condition.where[item.name] = item.value;
                } else if (operator === 'like' && item.value !== '') {
                    condition.where[item.name] = Like('%' + item.value + '%');
                }
            });
        }

        if (limit && limit > 0) {
            condition.take = limit;

        }
        return this.vendorSettingsRepository.repository.find(condition);
    }

    public async getVendorDomainOrDefault(vendorId: number, host: string): Promise<any> {
        try {
            // if (env.app.type === 'cloud') {
            //     const { TenantSubscriptionService } = require('../../../../add-ons/SaasSubscription/services/TenantSubscriptionService');
            //     const tenantSubscriptionService: any = Container.get(TenantSubscriptionService);
            //     const vendorSettingsDomainService = Container.get<VendorSettingsDomainService>(VendorSettingsDomainService);

            //     const tenantSubscriptions = await tenantSubscriptionService.getTenantSubscription();
            //     const hasValidSubscription = tenantSubscriptions?.some((sub: any) =>
            //         sub.tenantId === vendorId &&
            //         // sub.status === 'Active' &&
            //         ['prime', 'basic plan', 'premium plan'].includes(sub.mstSubscription?.name?.toLowerCase()) &&
            //         (!sub.expiredOn || new Date(sub.expiredOn) > new Date())
            //     );
            //     if (hasValidSubscription) {
            //         const vendorDomain = await vendorSettingsDomainService.findOne({
            //             where: {
            //                 vendorId,
            //                 domainName: host,
            //                 isActive: 1,
            //                 isDelete: 0,
            //             },
            //         });
            //         if (vendorDomain) { return vendorDomain.domainName || null; }
            //     }
            // }
            const vendorSettings = await this.vendorSettingsRepository.repository.findOne({ where: { vendorId } });
            return vendorSettings?.storeUrl || null;

        } catch (error: any) {
            console.error('Error fetching vendor domain:', error);
            return null;
        }
    }

}
