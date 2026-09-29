/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Like } from 'typeorm/index';
import { EmailTemplateRepository } from '../repositories/EmailTemplateRepository';

@Service()
export class EmailTemplateService {
    constructor(
        private emailTemplateRepository: EmailTemplateRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(emailTemplate: any): Promise<any> {
        this.log.info('create method called');
        return this.emailTemplateRepository.repository.create(emailTemplate);
    }

    public async save(emailTemplate: any): Promise<any> {
        this.log.info('create method called');
        return this.emailTemplateRepository.repository.save(emailTemplate);
    }

    public findOne(emailTemplate: any): Promise<any> {
        this.log.info('findOne method called');
        return this.emailTemplateRepository.repository.findOne(emailTemplate);
    }

    public find(emailTemplate: any): Promise<any> {
        this.log.info('find method called');
        return this.emailTemplateRepository.repository.find(emailTemplate);
    }

    public update(id: any, emailTemplate: any): Promise<any> {
        this.log.info('update method called');
        return this.emailTemplateRepository.repository.update(id, emailTemplate);
    }

    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        this.log.info('list method called');
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
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== '') {
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
            return this.emailTemplateRepository.repository.count(condition);
        } else {
            return this.emailTemplateRepository.repository.find(condition);
        }
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        return await this.emailTemplateRepository.repository.delete(id);
    }
}
