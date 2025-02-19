import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateProductRatingImagesTable1737091346152 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_product_rating_images_product_rating_rating_id',
        columnNames: ['rating_id'],
        referencedColumnNames: ['rating_id'],
        referencedTableName: 'product_rating',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'product_rating_images',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'file_name',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'file_path',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'rating_id',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'is_active',
                    type: 'int',
                    default: 1,
                    isNullable: true,
                },
                {
                    name: 'is_delete',
                    type: 'int',
                    default: 0,
                    isNullable: true,
                },
                {
                    name: 'file_type',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'created_date',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'modified_date',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'created_by',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'modified_by',
                    type: 'int',
                    isNullable: true,
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('product_rating_images');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const getTable = await queryRunner.getTable('product_rating_images');
        const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('rating_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
