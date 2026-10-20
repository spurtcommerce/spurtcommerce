import { Repository } from 'typeorm';
import { ProductRatingImages } from '../models/ProductRatingImages';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Service } from 'typedi';

@Service()
export class ProductRatingImagesRepository {
    public repository: Repository<ProductRatingImages>;
    constructor() {
        this.repository = getDataSource().getRepository(ProductRatingImages);
    }
}
