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
import { MSeoMetaRepository } from '../repositories/MSeoMetaRepository';

@Service()
export class MSeoMetaService {

    constructor(
        private mSeoMetaRepository: MSeoMetaRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public async create(seo: any): Promise<any> {
        this.log.info('Create a new seo ');
        return this.mSeoMetaRepository.repository.save(seo);
    }

    public findOne(seo: any): Promise<any> {
        return this.mSeoMetaRepository.repository.findOne(seo);
    }

    public update(id: number, seo: any): Promise<any> {
        this.log.info('Update a Seo');
        seo.SeoId = id;
        return this.mSeoMetaRepository.repository.save(seo);
    }

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

        condition.order = {};

        if (count) {
            return this.mSeoMetaRepository.repository.count(condition);
        } else {
            return this.mSeoMetaRepository.repository.find(condition);
        }
    }

    public async delete(id: number): Promise<any> {
        return await this.mSeoMetaRepository.repository.delete(id);
    }

    public async escapeChar(data: string): Promise<string> {
        const val = data
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/,/g, '&sbquo;')
            .replace(/=/g, '&#61;')
            .replace(/-/g, '&#45;')
            .replace(/…/g, '&hellip;')
            .replace(/@/g, '&commat;')
            .replace(/©/g, '&copy;')
            .replace(/#/g, '&#35;')
            .replace(/“/g, '&ldquo;')
            .replace(/’/g, '&rsquo;')
            .replace(/‘/g, '&lsquo;')
            .replace(/™/g, '&trade;')
            .replace(/®/g, '&reg;')
            .replace(/–/g, '&ndash;')
            .replace(/é/g, '&eacute;')
            .replace(/€/g, '&euro;')
            .replace(/£/g, '&pound;');
        return val;
    }
}
