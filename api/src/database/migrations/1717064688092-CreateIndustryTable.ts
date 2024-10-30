import { MigrationInterface, QueryRunner, Table, getRepository } from 'typeorm';

export class CreateIndustryTable1717064688092 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'industry',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'slug',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'is_active',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'is_delete',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('industry');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }

        const exist = await queryRunner.hasTable('industry');
        if (exist) {
            const data = [{
                name: 'Fashion & Beauty & Personal Care',
                slug: 'fashion-beauty-personal-care',
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
