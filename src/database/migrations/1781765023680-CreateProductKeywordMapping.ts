import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateProductKeywordMapping1781765023680 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

         await queryRunner.createTable(
            new Table({
                name: 'product_keyword_mapping',
                columns:
                [
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
                    },
                    {
                        name: 'keyword_id',
                        type: 'int',
                    },
                    {
                        name: 'created_date',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_date',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            'product_keyword_mapping',
            new TableForeignKey({
                columnNames: ['product_id'],
                referencedTableName: 'product',
                referencedColumnNames: ['product_id'],
                onDelete: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'product_keyword_mapping',
            new TableForeignKey({
                columnNames: ['keyword_id'],
                referencedTableName: 'search_suggestions',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.dropTable('product_keyword_mapping');
    }

}
