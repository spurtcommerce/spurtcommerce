import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { getDataSource } from '../../../../src/loaders/typeormLoader';
import { ProductKeywordMapping } from '../models/ProductKeywordMapping';

@Service()

export class ProductKeywordRepository  {
    public repository: Repository<ProductKeywordMapping>;
    constructor() {
        this.repository = getDataSource().getRepository(ProductKeywordMapping);
    }
}
