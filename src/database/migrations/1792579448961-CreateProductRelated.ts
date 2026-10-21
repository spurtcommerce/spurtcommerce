import { MigrationInterface, QueryRunner, TableForeignKey, Table } from 'typeorm';
export class CreateProductRelated1792579448961 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExist = await queryRunner.hasTable('product_related');
        if (!tableExist) {
            await queryRunner.createTable(
                new Table({
                    name: 'product_related',
                    columns: [
                        {
                            name: 'related_id',
                            type: 'int',
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: 'increment',
                        },
                        {
                            name: 'product_id',
                            type: 'int',
                            isNullable: false,
                        },
                        {
                            name: 'related_product_id',
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
                            name: 'created_by',
                            type: 'int',
                            isNullable: true,
                        },
                        {
                            name: 'modified_by',
                            type: 'int',
                            isNullable: true,
                        },
                        {
                            name: 'created_date',
                            type: 'datetime',
                            default: 'CURRENT_TIMESTAMP',
                            isNullable: true,
                        },
                        {
                            name: 'modified_date',
                            type: 'datetime',
                            default: 'CURRENT_TIMESTAMP',
                            isNullable: true,
                        },
                    ],
                }),
                true
            );
            await queryRunner.createForeignKey(
                'product_related',
                new TableForeignKey({
                    name: 'fk_product_related_product1',
                    columnNames: ['product_id'],
                    referencedTableName: 'product',
                    referencedColumnNames: ['product_id'],
                    onDelete: 'CASCADE',
                })
            );
            await queryRunner.createForeignKey(
                'product_related',
                new TableForeignKey({
                    name: 'fk_tbl_product_related_tbl_product_foreignKey',
                    columnNames: ['related_product_id'],
                    referencedTableName: 'product',
                    referencedColumnNames: ['product_id'],
                    onDelete: 'CASCADE',
                })
            );
        }
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product_related', true);
    }
}
