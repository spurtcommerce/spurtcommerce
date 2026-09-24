import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class UpdateIndustryTable1754310785180 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const industryRepo = getDataSource().getRepository('Industry');

        const retailIndustry: any = await industryRepo.findOne({ where: { slug: 'retail' } });
        if (retailIndustry) {
            retailIndustry.name = 'Leather';
            retailIndustry.slug = 'leather';
            await industryRepo.update(retailIndustry.id, retailIndustry);
        }
        const clothIndustry: any = await industryRepo.findOne({ where: { slug: 'clothing-textile' } });
        if (clothIndustry) {
            clothIndustry.name = 'Furniture';
            clothIndustry.slug = 'furniture';
            await industryRepo.update(clothIndustry.id, clothIndustry);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
