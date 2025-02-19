import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { WebHookRepository } from '../repositories/WebHookRepository';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { WebHook } from '../models/WebHook';

@Service()
export class WebHookService {

    constructor(
        @OrmRepository() private webHookRepository: WebHookRepository
    ) {
        // -
    }

    public async find(condition: FindManyOptions<WebHook>): Promise<[WebHook[], number]> {
        return await this.webHookRepository.findAndCount(condition);
    }

    public async findOne(condition: FindOneOptions<WebHook>): Promise<WebHook> {
        return await this.webHookRepository.findOne(condition);
    }

    public async save(payload: WebHook): Promise<WebHook> {
        return await this.webHookRepository.save(payload);
    }
}
