/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { VendorInvoiceItem } from '../models/VendorInvoiceItem';
import { VendorInvoiceItemRepository } from '../repositories/VendorInvoiceItemRepository';
import { Like } from 'typeorm';

@Service()
export class VendorInvoiceItemService {

    constructor(
        private vendorInvoiceItemRepository: VendorInvoiceItemRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public findOne(findCondition: any): Promise<any> {
        this.log.info('findOne method called');
        return this.vendorInvoiceItemRepository.repository.findOne(findCondition);
    }

    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        this.log.info('list method called');
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return this.vendorInvoiceItemRepository.repository.count(condition);
        }
        return this.vendorInvoiceItemRepository.repository.find(condition);
    }

    public async create(vendorInvoiceItem: VendorInvoiceItem): Promise<VendorInvoiceItem> {
        this.log.info('create method called');
        return await this.vendorInvoiceItemRepository.repository.save(vendorInvoiceItem);
    }

    public update(id: any, vendorInvoiceItem: VendorInvoiceItem): Promise<VendorInvoiceItem> {
        this.log.info('update method called');
        vendorInvoiceItem.vendorInvoiceItemId = id;
        return this.vendorInvoiceItemRepository.repository.save(vendorInvoiceItem);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        const deleteVendorInvoiceItem = await this.vendorInvoiceItemRepository.repository.delete(id);
        return deleteVendorInvoiceItem;
    }

    public findAll(data: any): Promise<any> {
        this.log.info('findAll method called');
        return this.vendorInvoiceItemRepository.repository.find(data);
    }
}
