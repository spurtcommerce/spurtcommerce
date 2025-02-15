import { EntityRepository, Repository } from 'typeorm';
import { BannerImage } from '../models/BannerImage';

@EntityRepository(BannerImage)
export class BannerImageRepository extends Repository<BannerImage> {

}
