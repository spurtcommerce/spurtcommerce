import { Service } from 'typedi';
import { Brackets, getConnection } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { AuditLog } from '../models/AuditLog';
import { AuditLogRepository } from '../repositories/AuditLogRepository';

@Service()
export class AuditLogService {

    constructor(
        @OrmRepository() private auditLogRepository: AuditLogRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async createOrUpdate(object: AuditLog): Promise<AuditLog> {
        const addedData = await this.auditLogRepository.save(object);
        return addedData;
    }
    public async QueryBuilder(limit: number, offset: number, whereCondition: any = [], relations: any = [],
                              search: any = [], count: number | boolean, order: any): Promise<any> {
    this.log.info('list');
                                const queryConditions: any = await this.auditLogRepository.createQueryBuilder('AuditLog');
      if (relations && relations.length > 0) {
          relations.forEach((joinTb: any) => {
              if (joinTb.val === 1) {
                  queryConditions.leftJoinAndSelect(joinTb.property, joinTb.alias, joinTb.condition);
              }
          });
      }
      if (whereCondition && whereCondition.length > 0) {
          whereCondition.forEach((item: any) => {
              if (item.op === 'And') {
                  queryConditions.andWhere(item.name + ' = ' + item.value);
              } else if (item.op === 'AndOr') {
                queryConditions.andWhere('(' + item.name1 + ' = ' + item.value1 + ' OR ' +  item.name2 + ' = ' + item.value2 + ')' );
            }
          });
      }
      if (search && search.length > 0) {
          search.forEach((table: any) => {
              if (table.op === 'and') {
                  queryConditions.andWhere( '( ' + table.name + ' LIKE ' +  "\'%" + table.value  + "%\'" + table.symbol);
              } else if (table.op === 'or') {
                  queryConditions.orWhere( table.name + ' LIKE ' +  "\'%" + table.value  + "%\'"  + table.symbol);
              }
          });
      }
      if (order && order > 0) {
          queryConditions.orderBy(
              'AuditLog.auditLogId', ( (order === 1 ? 'ASC' : 'DESC'))
          );
      }
      if (limit && limit > 0) {
          queryConditions.skip(offset);
          queryConditions.take(limit);
      }
      if (count) {
          return queryConditions.getCount();
      } else {
          return queryConditions.getMany();
      }
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
        rawQuery: boolean = false)
        : Promise<AuditLog[] | number> {

        const query: any = await getConnection().getRepository(AuditLog).createQueryBuilder();
        // Select
        if (select && select.length > 0) {
            query.select(select);
        }
        // Join
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                if (joinTb.op === 'left') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName);
                } else {
                    query.innerJoin(joinTb.tableName, joinTb.aliasName);
                }
            });
        }
        // Where
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                if (item.op === 'where' && item.sign === undefined) {
                    query.where(item.name + ' = ' + item.value);
                } else if (item.op === 'and' && item.sign === undefined) {
                    query.andWhere(item.name + ' = ' + item.value);
                } else if (item.op === 'and' && item.sign !== undefined) {
                    query.andWhere(' \'' + item.name + '\'' + ' ' + item.sign + ' \'' + item.value + '\'');
                } else if (item.op === 'raw' && item.sign !== undefined) {
                    query.andWhere(item.name + ' ' + item.sign + ' \'' + item.value + '\'');
                } else if (item.op === 'or' && item.sign === undefined) {
                    query.orWhere(item.name + ' = ' + item.value);
                } else if (item.op === 'IN' && item.sign === undefined) {
                    query.andWhere(item.name + ' IN (' + item.value + ')');
                }  else if (item.op === 'moreThan' && item.sign === undefined) {
                    query.andWhere(item.name + ' > ' + ' \'' + item.value + '\'' );
                }  else if (item.op === 'LIKE' && item.sign === undefined) {
                    query.andWhere(item.name + ' LIKE ' +  ' \'' + item.value + '\'');
                }
            });
        }
        // Keyword Search
        if (searchConditions && searchConditions.length > 0) {
            searchConditions.forEach((table: any) => {
                if ((table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
                    const namesArray = table.name;
                    namesArray.forEach((name: string, index: number) => {
                        query.andWhere(new Brackets(qb => {
                            const valuesArray = table.value;
                            valuesArray.forEach((value: string | number, subIndex: number) => {
                                if (subIndex === 0) {
                                    qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                    return;
                                }
                                qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                            });
                        }));
                    });
                } else if (table.name && table.name instanceof Array && table.name.length > 0) {
                    query.andWhere(new Brackets(qb => {
                        const namesArray = table.name;
                        namesArray.forEach((name: string, index: number) => {
                            if (index === 0) {
                                qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                                return;
                            }
                            qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                        });
                    }));
                } else if (table.value && table.value instanceof Array && table.value.length > 0) {
                    query.andWhere(new Brackets(qb => {
                        const valuesArray = table.value;
                        valuesArray.forEach((value: string | number, index: number) => {
                            if (index === 0) {
                                qb.andWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                return;
                            }
                            qb.orWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                        });
                    }));
                }
            });
        }
        // GroupBy
        if (groupBy && groupBy.length > 0) {
            let i = 0;
            groupBy.forEach((item: any) => {
                if ( i === 0) {
                    query.groupBy(item.name);
                } else {
                    query.addGroupBy(item.name);
                }
                i++;
            });
        }
        // orderBy
        if (sort && sort.length > 0) {
            sort.forEach((item: any) => {
                query.orderBy('' + item.name + '', '' + item.order + '');
            });
        }
        // Limit & Offset
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset);
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

    public find(condition: any): Promise<any> {
        return this.auditLogRepository.find(condition);
    }

    public async delete(data: any): Promise<any> {
        await this.auditLogRepository.delete(data);
        return;
    }

    // find One category level
    public findAuditLogData(fromDate: string, toDate: string): Promise<any> {
        return this.auditLogRepository.findAuditLogData(fromDate, toDate);
    }
}
