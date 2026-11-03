import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFeaturedProductTable1793625530300 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'featured_product',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'product_id',
                        type: 'int',
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'sort_order',
                        type: 'int',
                        default: 0,
                    },
                    {
                        name: 'is_active',
                        type: 'int',
                        default: 1,
                    },
                    {
                        name: 'tenant_id',
                        type: 'int',
                        length: '11',
                        isNullable: false,
                    },
                    {
                        name: 'created_by',
                        type: 'int',
                        length: '11',
                        isNullable: true,
                    },
                    {
                        name: 'modified_by',
                        type: 'int',
                        length: '11',
                        isNullable: true,
                    },
                    {
                        name: 'created_date',
                        type: 'datetime',
                        isNullable: false,
                    },
                    {
                        name: 'modified_date',
                        type: 'datetime',
                        isNullable: true,
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('featured_product');
    }

}
