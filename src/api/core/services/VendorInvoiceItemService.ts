/*
 * spurtcommerce API
 * version 5.2.0
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

    // find
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find role');
        return this.vendorInvoiceItemRepository.repository.findOne(findCondition);
    }
    // list
    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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

    // create
    public async create(vendorInvoiceItem: VendorInvoiceItem): Promise<VendorInvoiceItem> {
        const newvendorInvoiceItem = await this.vendorInvoiceItemRepository.repository.save(vendorInvoiceItem);
        return newvendorInvoiceItem;
    }

    // update
    public update(id: any, vendorInvoiceItem: VendorInvoiceItem): Promise<VendorInvoiceItem> {
        this.log.info('Update a vendorInvoiceItem');
        vendorInvoiceItem.vendorInvoiceItemId = id;
        return this.vendorInvoiceItemRepository.repository.save(vendorInvoiceItem);
    }

    // delete
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a vendorOrders');
        const deleteVendorInvoiceItem = await this.vendorInvoiceItemRepository.repository.delete(id);
        return deleteVendorInvoiceItem;
    }

    // find Services
    public findAll(data: any): Promise<any> {
        return this.vendorInvoiceItemRepository.repository.find(data);
    }

}
