import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTblProductTranslation1711542154784 implements MigrationInterface {

    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_product_translation_product_product_id',
        columnNames: ['product_id'],
        referencedColumnNames: ['product_id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
    });

    private tableForeignKey2 = new TableForeignKey({
        name: 'fk_product_translation_language_language_id',
        columnNames: ['language_id'],
        referencedColumnNames: ['language_id'],
        referencedTableName: 'language',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'product_translation',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'product_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'language_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'name',
                    type: 'varchar',
                    length: '512',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'description',
                    type: 'text',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'meta_info',
                    type: 'varchar',
                    length: '512',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_by',
                    type: 'int',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'modified_by',
                    type: 'int',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('product_translation');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }

        const productTable = await queryRunner.getTable('product_translation');
        const ifDataExsist1 = productTable.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
        if (!ifDataExsist1) {
            await queryRunner.createForeignKey(productTable, this.tableForeignKey1);
        }

        const ifDataExsist2 = productTable.foreignKeys.find(fk => fk.columnNames.indexOf('language_id') !== -1);
        if (!ifDataExsist2) {
            await queryRunner.createForeignKey(productTable, this.tableForeignKey2);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
