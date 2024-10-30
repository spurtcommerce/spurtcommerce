import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { BannerImageRepository } from '../repositories/BannerImageRepository';

@Service()
export class BannerImageService {
    constructor(
        @OrmRepository() private bannerImageRepository: BannerImageRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // create bannerImages
    public async create(bannerImage: any): Promise<any> {
        this.log.info('Create a new banner ');
        return this.bannerImageRepository.save(bannerImage);
    }

    // findOne bannerImages
    public async findOne(bannerImage: any): Promise<any> {
        this.log.info('Create a new banner ');
        return this.bannerImageRepository.findOne(bannerImage);
    }

    // find bannerImages
    public async find(bannerImage: any): Promise<any> {
        this.log.info('find a banner images');
        return this.bannerImageRepository.find(bannerImage);
    }

    // delete bannerImages
    public async delete(bannerImage: any): Promise<any> {
        this.log.info('delete banner images ');
        return this.bannerImageRepository.delete(bannerImage);
    }

    // update bannerImages
    public async update(bannerImage: any): Promise<any> {
        this.log.info('Create a new banner ');
        return this.bannerImageRepository.save(bannerImage);
    }
}
