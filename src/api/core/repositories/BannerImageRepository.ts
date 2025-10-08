import { Repository } from 'typeorm';
import { BannerImage } from '../models/BannerImage';
import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';

@Service()
export class BannerImageRepository {
    public repository: Repository<BannerImage>;
    constructor() {
        this.repository = getDataSource().getRepository(BannerImage);
    }
}
