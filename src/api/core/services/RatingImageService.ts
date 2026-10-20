import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { ProductRatingImagesRepository } from '../repositories/RatingImageRepository';

@Service()
export class ProductRatingImagesService {
    constructor(
        private productRatingImagesRepository: ProductRatingImagesRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create bannerImages
    public async create(productRatingImages: any): Promise<any> {
        this.log.info('Create a new product rating images ');
        return this.productRatingImagesRepository.repository.save(productRatingImages);
    }

    // findOne bannerImages
    public async findOne(productRatingImages: any): Promise<any> {
        this.log.info('find one product rating images ');
        return this.productRatingImagesRepository.repository.findOne(productRatingImages);
    }

    // find bannerImages
    public async find(productRatingImages: any): Promise<any> {
        this.log.info('find a product rating images');
        return this.productRatingImagesRepository.repository.find(productRatingImages);
    }

    // delete bannerImages
    public async delete(productRatingImages: any): Promise<any> {
        this.log.info('delete product rating images ');
        return this.productRatingImagesRepository.repository.delete(productRatingImages);
    }

    // update bannerImages
    public async update(productRatingImages: any): Promise<any> {
        this.log.info('Update a product rating images ');
        return this.productRatingImagesRepository.repository.save(productRatingImages);
    }
}
