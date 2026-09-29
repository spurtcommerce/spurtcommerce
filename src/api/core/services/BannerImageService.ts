import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { BannerImageRepository } from '../repositories/BannerImageRepository';

@Service()
export class BannerImageService {
    constructor(
        private bannerImageRepository: BannerImageRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async create(bannerImage: any): Promise<any> {
        this.log.info('create method called');
        return this.bannerImageRepository.repository.save(bannerImage);
    }

    public async findOne(bannerImage: any): Promise<any> {
        this.log.info('findOne method called');
        return this.bannerImageRepository.repository.findOne(bannerImage);
    }

    public async find(bannerImage: any): Promise<any> {
        this.log.info('find method called');
        return this.bannerImageRepository.repository.find(bannerImage);
    }

    public async delete(bannerImage: any): Promise<any> {
        this.log.info('delete method called');
        return this.bannerImageRepository.repository.delete(bannerImage);
    }

    public async update(bannerImage: any): Promise<any> {
        this.log.info('update method called');
        return this.bannerImageRepository.repository.save(bannerImage);
    }
}
