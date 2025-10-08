/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { SettlementItem } from '../models/SettlementItem';
import { SettlementItemRepository } from '../repositories/SettlementItemRepository';
import { Like } from 'typeorm';

@Service()
export class SettlementItemService {

    constructor(
        private settlementItemRepository: SettlementItemRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // find one condition
    public findOne(data: any): Promise<any> {
        return this.settlementItemRepository.repository.findOne(data);
    }

    // find all
    public findAll(data: any): Promise<any> {
        this.log.info('Find all');
        return this.settlementItemRepository.repository.find(data);
    }

    // list
    public list(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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
                if (operator === 'where' && item.value !== undefined) {
                    condition.where[item.name] = item.value;
                } else if (operator === 'like' && item.value !== undefined) {
                    condition.where[item.name] = Like('%' + item.value + '%');
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
            return this.settlementItemRepository.repository.count(condition);
        } else {
            return this.settlementItemRepository.repository.find(condition);
        }
    }

    // create
    public async create(settlementItem: SettlementItem): Promise<SettlementItem> {
        const newSettlement = await this.settlementItemRepository.repository.save(settlementItem);
        return newSettlement;
    }

    // update
    public update(id: any, settlementItem: SettlementItem): Promise<SettlementItem> {
        this.log.info('Update');
        settlementItem.id = id;
        return this.settlementItemRepository.repository.save(settlementItem);
    }

    // delete
    public async delete(id: any): Promise<any> {
        this.log.info('Delete');
        const newSettlement = await this.settlementItemRepository.repository.delete(id);
        return newSettlement;
    }
}
