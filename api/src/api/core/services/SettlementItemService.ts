/*
 * spurtcommerce API
 * version 1.0.0
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

    public findOne(data: any): Promise<any> {
        this.log.info('findOne method called');
        return this.settlementItemRepository.repository.findOne(data);
    }

    public findAll(data: any): Promise<any> {
        this.log.info('findAll method called');
        return this.settlementItemRepository.repository.find(data);
    }

    public async create(settlementItem: SettlementItem): Promise<SettlementItem> {
        this.log.info('create method called');
        return await this.settlementItemRepository.repository.save(settlementItem);
    }

    public update(id: any, settlementItem: SettlementItem): Promise<SettlementItem> {
        this.log.info('update method called');
        settlementItem.id = id;
        return this.settlementItemRepository.repository.save(settlementItem);
    }

    public list(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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

    public async delete(id: any): Promise<any> {
        this.log.info('delete method called');
        const newSettlement = await this.settlementItemRepository.repository.delete(id);
        return newSettlement;
    }
}
