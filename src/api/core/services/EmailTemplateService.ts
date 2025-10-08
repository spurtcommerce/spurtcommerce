/*
 * spurtcommerce API
 * version 5.2.0
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

    // Create emailTemplate
    public async create(emailTemplate: any): Promise<any> {
        this.log.info('Create a new emailTemplate ');
        return this.emailTemplateRepository.repository.save(emailTemplate);
    }

    // Find Condition
    public findOne(emailTemplate: any): Promise<any> {
        return this.emailTemplateRepository.repository.findOne(emailTemplate);
    }

    // Update EmailTemplate
    public update(id: any, emailTemplate: any): Promise<any> {
        emailTemplate.id = id;
        return this.emailTemplateRepository.repository.save(emailTemplate);
    }

    // EmailTemplate List
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

    // Delete EmailTemplate
    public async delete(id: number): Promise<any> {
        return await this.emailTemplateRepository.repository.delete(id);
    }
}
