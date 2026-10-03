import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateProductRatingTable1546580427531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'product_rating',
            columns: [
                {
                    name: 'rating_id',
                    type: 'integer',
                    length: '11',
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isPrimary: true,
                    isNullable: false,
                }, {
                    name: 'product_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'customer_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'first_name',
                    type: 'varchar',
                    length: '512',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'last_name',
                    type: 'varchar',
                    length: '512',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'email',
                    type: 'varchar',
                    length: '512',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'rating',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'review',
                    type: 'TEXT',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'image_path',
                    type: 'TEXT',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'image',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'is_active',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'modified_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default:  'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default:  'CURRENT_TIMESTAMP',
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('product_rating');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('product_rating', true);
    }
}
