/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Like } from 'typeorm/index';
import { CustomerDocumentRepository } from '../repositories/CustomerDocumentRepository';

@Service()
export class CustomerDocumentService {

    constructor(@OrmRepository() private customerDocumentRepository: CustomerDocumentRepository,
                @Logger(__filename) private log: LoggerInterface) {
    }

    // create customer document
    public async create(customerDocument: any): Promise<any> {
        this.log.info('Create a new customer document ');
        return this.customerDocumentRepository.save(customerDocument);
    }

    // find Condition
    public findOne(customerDocument: any): Promise<any> {
        return this.customerDocumentRepository.findOne(customerDocument);
    }

    // find Condition
    public findAll(): Promise<any> {
        return this.customerDocumentRepository.find();
    }

    // update customer document
    public update(id: any, customerDocument: any): Promise<any> {
        customerDocument.customerDocumentId = id;
        return this.customerDocumentRepository.save(customerDocument);
    }
    // customer document List
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
            return this.customerDocumentRepository.count(condition);
        } else {
            return this.customerDocumentRepository.find(condition);
        }
    }
    // delete customer document
    public async delete(id: number): Promise<any> {
        return await this.customerDocumentRepository.delete(id);
    }
}
