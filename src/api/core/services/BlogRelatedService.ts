/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Like } from 'typeorm/index';
import { BlogRelatedRepository } from '../repositories/BlogRelatedRepository';

@Service()
export class BlogRelatedService {

    constructor(
        private blogRelatedRepository: BlogRelatedRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(blogRelated: any): Promise<any> {
        this.log.info('Create a new blog related ');
        return this.blogRelatedRepository.repository.save(blogRelated);
    }

    public findOne(blogRelated: any): Promise<any> {
        return this.blogRelatedRepository.repository.findOne(blogRelated);
    }

    public findAll(blogRelated: any): Promise<any> {
        return this.blogRelatedRepository.repository.find(blogRelated);
    }

    public update(blogRelated: any): Promise<any> {
        return this.blogRelatedRepository.repository.save(blogRelated);
    }

    public async list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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
        if (count) {
            return this.blogRelatedRepository.repository.count(condition);
        } else {
            return this.blogRelatedRepository.repository.find(condition);
        }
    }

    public async delete(id: any): Promise<any> {
        return await this.blogRelatedRepository.repository.delete(id);
    }
}
