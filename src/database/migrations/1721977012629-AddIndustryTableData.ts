import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class AddIndustryTableData1721977012629 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const exist = await queryRunner.hasTable('industry');
        if (exist) {
            const data = [
                {
                    id: undefined,
                    name: 'Pharma',
                    slug: 'pharma',
                    isActive: 1,
                    isDelete: 0,
                },
                {
                    id: undefined,
                    name: 'Retail',
                    slug: 'retail',
                    isActive: 1,
                    isDelete: 0,
                },
                {
                    id: undefined,
                    name: 'Clothing & Textile',
                    slug: 'clothing-textile',
                    isActive: 1,
                    isDelete: 0,
                },
                {
                    id: undefined,
                    name: 'Other',
                    slug: 'other',
                    isActive: 1,
                    isDelete: 0,
                },
            ];
            await getRepository('industry').save(data);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
