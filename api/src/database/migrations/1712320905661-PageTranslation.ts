import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class PageTranslation1712320905661 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_page_translation_page_page_id_idx',
        columnNames: ['page_id'],
        referencedColumnNames: ['page_id'],
        referencedTableName: 'page',
        onDelete: 'CASCADE',
    });

    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_page_translation_language_language_id_idx',
        columnNames: ['language_id'],
        referencedColumnNames: ['language_id'],
        referencedTableName: 'language',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'page_translation',
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
                    name: 'page_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'language_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'title',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'content',
                    type: 'text',
                    length: '512',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'created_by',
                    type: 'int  ',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'created_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'modified_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'modified_by',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
            ],
        });
        const ifTable = await queryRunner.hasTable('page_translation');
        if (!ifTable) {
            await queryRunner.createTable(table);
        }

        const getTable = await queryRunner.getTable('page_translation');

        const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('page_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(getTable, this.tableForeignKey);
        }

        const ifDataExsist1 = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('language_id') !== -1);
        if (!ifDataExsist1) {
            await queryRunner.createForeignKey(getTable, this.tableForeignKey1);
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
