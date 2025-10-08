import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { BannerImageRepository } from '../repositories/BannerImageRepository';

@Service()
export class BannerImageService {
    constructor(
        private bannerImageRepository: BannerImageRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // create bannerImages
    public async create(bannerImage: any): Promise<any> {
        this.log.info('Create a new banner ');
        return this.bannerImageRepository.repository.save(bannerImage);
    }

    // findOne bannerImages
    public async findOne(bannerImage: any): Promise<any> {
        this.log.info('Create a new banner ');
        return this.bannerImageRepository.repository.findOne(bannerImage);
    }

    // find bannerImages
    public async find(bannerImage: any): Promise<any> {
        this.log.info('find a banner images');
        return this.bannerImageRepository.repository.find(bannerImage);
    }

    // delete bannerImages
    public async delete(bannerImage: any): Promise<any> {
        this.log.info('delete banner images ');
        return this.bannerImageRepository.repository.delete(bannerImage);
    }

    // update bannerImages
    public async update(bannerImage: any): Promise<any> {
        this.log.info('Create a new banner ');
        return this.bannerImageRepository.repository.save(bannerImage);
    }
}
