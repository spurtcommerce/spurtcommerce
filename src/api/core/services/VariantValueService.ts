/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { VariantValue } from '../models/VariantValue';
import { VariantValueRepository } from '../repositories/VariantValueRepository';
import { FindOptionsWhere, FindManyOptions, FindOneOptions } from 'typeorm';

@Service()
export class VariantValueService {
    constructor(
        private variantValueRepository: VariantValueRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async create(Data: any): Promise<VariantValue> {
        this.log.info('create a data');
        return this.variantValueRepository.repository.save(Data);
    }

    public findOne(id: FindOneOptions<VariantValue>): Promise<VariantValue> {
        this.log.info('Find a data');
        return this.variantValueRepository.repository.findOne(id);
    }

    public findOneData(data: any): Promise<VariantValue> {
        this.log.info('Find a data');
        return this.variantValueRepository.repository.findOne(data);
    }

    public find(option: FindManyOptions<VariantValue>): Promise<VariantValue[]> {
        return this.variantValueRepository.repository.find(option);
    }

    public async delete(id: any): Promise<any> {
        this.log.info('Delete a VariantValue');
        await this.variantValueRepository.repository.delete(id);
        return;
    }

    public async bulkDelete(payload: FindOptionsWhere<VariantValue>): Promise<any> {
        this.log.info('Delete a VariantValue');
        return await this.variantValueRepository.repository.delete(payload);
    }
}
