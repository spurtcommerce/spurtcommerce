/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../src/decorators/Logger';
import { Like } from 'typeorm/index';
import { WidgetItemRepository } from '../repositories/WidgetItemRepository';

@Service()
export class WidgetItemService {

    constructor(
        @OrmRepository() private widgetItemRepository: WidgetItemRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create Widget Item
    public async create(widgetItem: any): Promise<any> {
        this.log.info('Create a new widget Item ');
        return this.widgetItemRepository.save(widgetItem);
    }

    // findOne Condition
    public findOne(widgetItem: any): Promise<any> {
        return this.widgetItemRepository.findOne(widgetItem);
    }

    // find Condition
    public find(data: any): Promise<any> {
        return this.widgetItemRepository.find(data);
    }

    // update Widget Item
    public update(data: any): Promise<any> {
        return this.widgetItemRepository.save(data);
    }

    // Widget Item List
    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }

        if (search && search.length > 0) {
            search.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (count) {
            return this.widgetItemRepository.count(condition);
        } else {
            return this.widgetItemRepository.find(condition);
        }
    }

    // delete Widget Item
    public async delete(id: any): Promise<any> {
        return await this.widgetItemRepository.delete(id);
    }

    // findProduct Condition
    public async findProduct(productId: number): Promise<any> {
        return await this.widgetItemRepository.findProduct(productId);
    }

    // findCategory Condition
    public async findCategory(categoryId: number): Promise<any> {
        return await this.widgetItemRepository.findCategory(categoryId);
    }

}
