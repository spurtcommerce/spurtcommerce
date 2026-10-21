import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../../src/decorators/Logger';
import { ProductKeywordRepository } from '../../core/repositories/ProductKeywordMappingRepository';
import { ProductKeywordMapping } from '../../core/models/ProductKeywordMapping';

@Service()
export class ProductKeywordMappingService {

    constructor(
        private productKeywordMappingRepository: ProductKeywordRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {
    }

    public find(condition: any): Promise<any> {
          this.log.info('findOne method called');
        return this.productKeywordMappingRepository.repository.find(condition);
    }

    public findOne(condition: any): Promise<any> {
        return this.productKeywordMappingRepository.repository.findOne(condition);
    }

    public async create(mapping: ProductKeywordMapping): Promise<ProductKeywordMapping> {
        return this.productKeywordMappingRepository.repository.save(mapping);
    }

    public async bulkCreate(mappings: ProductKeywordMapping[]): Promise<ProductKeywordMapping[]> {
        return this.productKeywordMappingRepository.repository.save(mappings);
    }

    public async delete(id: number): Promise<any> {
        return this.productKeywordMappingRepository.repository.delete(id);
    }
}
