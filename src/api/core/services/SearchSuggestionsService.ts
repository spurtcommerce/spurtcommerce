import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { SearchSuggestionsRepository } from '../repositories/SearchSuggestionsRepository';
import { SearchSuggestions } from '../models/SearchSuggestions';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Brackets, DeleteResult } from 'typeorm';

@Service()
export class SearchSuggestionsService {

    constructor(
        private searchSuggestionsRepository: SearchSuggestionsRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {
    }

    public async find(condition?: any): Promise<SearchSuggestions[]> {
        this.log.info('find method called');
        return this.searchSuggestionsRepository.repository.find(condition || {});
    }

    public async findOne(condition: any): Promise<SearchSuggestions | null> {
        this.log.info('findOne method called');
        return this.searchSuggestionsRepository.repository.findOne(condition);
    }

    public async create(mapping: SearchSuggestions): Promise<SearchSuggestions> {
        this.log.info('create method called');
        return this.searchSuggestionsRepository.repository.save(mapping);
    }

    public async bulkCreate(mappings: SearchSuggestions[]): Promise<SearchSuggestions[]> {
        this.log.info('bulkCreate method called');
        return this.searchSuggestionsRepository.repository.save(mappings);
    }

    public async delete(id: any): Promise<DeleteResult> {
        this.log.info('delete method called');
        return this.searchSuggestionsRepository.repository.delete(id);
    }

    public async listByQueryBuilder(
        limit: number,
        offset: number,
        select: any = [],
        whereConditions: any = [],
        searchConditions: any = [],
        relations: any = [],
        groupBy: any = [],
        sort: any = [],
        count: number | boolean = false,
        rawQuery: boolean = false
    ): Promise<SearchSuggestions[] | any> {

        const query: any = await getDataSource().getRepository(SearchSuggestions).createQueryBuilder('SearchSuggestions');

        // Select
        if (select && select.length > 0) {
            query.select(select);
        }

        // Join
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                if (joinTb.op === 'left-cond') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName, joinTb.cond);
                } else if (joinTb.op === 'left') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName);
                } else {
                    query.innerJoin(joinTb.tableName, joinTb.aliasName);
                }
            });
        }

        // Where
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any, index: number) => {
                if (item.op === 'where' && item.sign === undefined) {
                    query.where(`${item.name} = :wVal_${index}`, { [`wVal_${index}`]: item.value });
                } else if (item.op === 'and' && item.sign === undefined) {
                    query.andWhere(`${item.name} = :wVal_${index}`, { [`wVal_${index}`]: item.value });
                } else if (item.op === 'and' && item.sign !== undefined) {
                    query.andWhere(`${item.name} ${item.sign} :wVal_${index}`, { [`wVal_${index}`]: item.value });
                } else if (item.op === 'raw' && item.sign !== undefined) {
                    query.andWhere(`${item.name} ${item.sign} :wVal_${index}`, { [`wVal_${index}`]: item.value });
                } else if (item.op === 'raw' && item.sign === undefined) {
                    query.andWhere(item.name);
                } else if (item.op === 'or' && item.sign === undefined) {
                    query.orWhere(`${item.name} = :wVal_${index}`, { [`wVal_${index}`]: item.value });
                } else if (item.op === 'IN' && item.sign === undefined) {
                    const inVals = Array.isArray(item.value)
                        ? item.value
                        : typeof item.value === 'string'
                            ? item.value.split(',').map((v: string) => v.trim()).filter(Boolean)
                            : [item.value];
                    query.andWhere(`${item.name} IN (:...inVals_${index})`, { [`inVals_${index}`]: inVals });
                }
            });
        }

        // Search Conditions
        if (searchConditions && searchConditions.length > 0) {
            searchConditions.forEach((table: any) => {
                if (table.name && table.name instanceof Array && table.name.length > 0 && table.value) {
                    const namesArray = table.name;
                    const searchVal = Array.isArray(table.value) ? table.value[0] : table.value;
                    query.andWhere(new Brackets(qb => {
                        namesArray.forEach((name: string, index: number) => {
                            if (index === 0) {
                                qb.andWhere(`LOWER(${name}) LIKE :sVal`, { sVal: `%${String(searchVal).toLowerCase()}%` });
                            } else {
                                qb.orWhere(`LOWER(${name}) LIKE :sVal`, { sVal: `%${String(searchVal).toLowerCase()}%` });
                            }
                        });
                    }));
                }
            });
        }

        // GroupBy
        if (groupBy && groupBy.length > 0) {
            groupBy.forEach((item: any, i: number) => {
                if (i === 0) {
                    query.groupBy(item.name || item);
                } else {
                    query.addGroupBy(item.name || item);
                }
            });
        }

        // OrderBy
        if (sort && sort.length > 0) {
            sort.forEach((item: any) => {
                query.orderBy(item.name, item.order);
            });
        }

        // Limit & Offset
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset || 0);
        }

        if (!count) {
            if (rawQuery) {
                return query.getRawMany();
            }
            return query.getMany();
        } else {
            return query.getCount();
        }
    }

}
