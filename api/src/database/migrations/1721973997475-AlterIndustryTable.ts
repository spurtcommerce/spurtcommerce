import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class AlterIndustryTable1721973997475 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const industryInfo: any = await getRepository('industry').findOne({ where: { slug: 'fashion-beauty-personal-care' } });
        if (industryInfo) {
            industryInfo.name = 'Electronics';
            industryInfo.slug = 'electronics';
            await getRepository('industry').save(industryInfo);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
