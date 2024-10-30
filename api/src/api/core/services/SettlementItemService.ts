/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { SettlementItem } from '../models/SettlementItem';
import { SettlementItemRepository } from '../repositories/SettlementItemRepository';
import { Like } from 'typeorm';

@Service()
export class SettlementItemService {

    constructor(
        @OrmRepository() private settlementItemRepository: SettlementItemRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // find one condition
    public findOne(data: any): Promise<any> {
        return this.settlementItemRepository.findOne(data);
    }

    // find all
    public findAll(data: any): Promise<any> {
        this.log.info('Find all');
        return this.settlementItemRepository.find(data);
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
            return this.settlementItemRepository.count(condition);
        } else {
            return this.settlementItemRepository.find(condition);
        }
    }

    // create
    public async create(settlementItem: SettlementItem): Promise<SettlementItem> {
        const newSettlement = await this.settlementItemRepository.save(settlementItem);
        return newSettlement;
    }

    // update
    public update(id: any, settlementItem: SettlementItem): Promise<SettlementItem> {
        this.log.info('Update');
        settlementItem.id = id;
        return this.settlementItemRepository.save(settlementItem);
    }

    // delete
    public async delete(id: any): Promise<any> {
        this.log.info('Delete');
        const newSettlement = await this.settlementItemRepository.delete(id);
        return newSettlement;
    }
}
