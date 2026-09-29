import { Service } from 'typedi';

import { WebHookRepository } from '../repositories/WebHookRepository';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { WebHook } from '../models/WebHook';

@Service()
export class WebHookService {

    constructor(
        private webHookRepository: WebHookRepository
    ) {
        // -
    }

    public async find(condition: FindManyOptions<WebHook>): Promise<[WebHook[], number]> {
        return await this.webHookRepository.repository.findAndCount(condition);
    }

    public async findOne(condition: FindOneOptions<WebHook>): Promise<WebHook> {
        return await this.webHookRepository.repository.findOne(condition);
    }

    public async save(payload: WebHook): Promise<WebHook> {
        return await this.webHookRepository.repository.save(payload);
    }
}
