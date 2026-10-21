import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../../src/decorators/Logger';
import { SuggestionKeywordRepository } from '../../core/repositories/SuggestionKeywordRepository';
import { SuggestionKeyword } from '../../core/models/SuggestionKeyword';
import { Like } from 'typeorm';

@Service()
export class SuggestionKeywordService {

    constructor(
        private suggestionKeywordRepository: SuggestionKeywordRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public findOne(condition: any): Promise<any> {
        this.log.info('findOne method called');
        return this.suggestionKeywordRepository.repository.findOne(condition);
    }
    public find(condition: any): Promise<any> {
        this.log.info('find method called');
        return this.suggestionKeywordRepository.repository.find(condition);
    }
    public list(limit: number, offset: number, select: any = [], whereConditions: any = [], search: any = [], count: number | boolean = false): Promise<any> {
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

        if (limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return this.suggestionKeywordRepository.repository.count(condition);
        }

        return this.suggestionKeywordRepository.repository.find(condition);
    }

    public async bulkCreate(suggestionKeyword: SuggestionKeyword[]): Promise<SuggestionKeyword[]> {
        return this.suggestionKeywordRepository.repository.save(suggestionKeyword);
    }
    public async update(id: number, suggestionKeyword: SuggestionKeyword): Promise<SuggestionKeyword> {
        this.log.info('update method called');
        suggestionKeyword.id = id;

        return this.suggestionKeywordRepository.repository.save(suggestionKeyword);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');

        await this.suggestionKeywordRepository.repository.delete(id);

        return;
    }
}
