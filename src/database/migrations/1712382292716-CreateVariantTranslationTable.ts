import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateVariantTranslationTable1712382292716 implements MigrationInterface {

    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_variant_translation_variant_variant_id',
        columnNames: ['variant_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'variant',
        onDelete: 'CASCADE',
    });

    private tableForeignKey2 = new TableForeignKey({
        name: 'fk_variant_translation_language_language_id',
        columnNames: ['language_id'],
        referencedColumnNames: ['language_id'],
        referencedTableName: 'language',
        onDelete: 'CASCADE',
    });

    private tableForeignKey3 = new TableForeignKey({
        name: 'fk_variant_value_translation_variant_value_variant_value_id',
        columnNames: ['variant_value_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'variant_value',
        onDelete: 'CASCADE',
    });

    private tableForeignKey4 = new TableForeignKey({
        name: 'fk_variant_value_translation_language_language_id',
        columnNames: ['language_id'],
        referencedColumnNames: ['language_id'],
        referencedTableName: 'language',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'variant_translation',
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
                    type: 'VARCHAR',
                    length: '255',
                    isPrimary: false,
                },
                {
                    name: 'language_id',
                    type: 'int',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'variant_id',
                    type: 'int',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'is_active',
                    type: 'TINYINT',
                    isPrimary: false,
                    default: 1,
                },
                {
                    name: 'is_delete',
                    type: 'TINYINT',
                    isPrimary: false,
                    default: 0,
                },
                {
                    name: 'created_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'created_by',
                    type: 'INT',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
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
                    type: 'INT',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
            ],
        });

        const ifTable = await queryRunner.hasTable('variant_translation');
        if (!ifTable) {
            await queryRunner.createTable(table);
        }

        const getTable = await queryRunner.getTable('variant_translation');
        const ifDataExsist1 = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('variant_id') !== -1);
        if (!ifDataExsist1) {
            await queryRunner.createForeignKey(getTable, this.tableForeignKey1);
        }

        const ifDataExsist2 = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('language_id') !== -1);
        if (!ifDataExsist2) {
            await queryRunner.createForeignKey(getTable, this.tableForeignKey2);
        }

        const table2 = new Table({
            name: 'variant_value_translation',
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
                    name: 'value',
                    type: 'VARCHAR',
                    length: '255',
                    isPrimary: false,
                },
                {
                    name: 'language_id',
                    type: 'int',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'variant_value_id',
                    type: 'int',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'is_active',
                    type: 'TINYINT',
                    isPrimary: false,
                    default: 1,
                },
                {
                    name: 'is_delete',
                    type: 'TINYINT',
                    isPrimary: false,
                    default: 0,
                },
                {
                    name: 'created_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'created_by',
                    type: 'INT',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
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
                    type: 'INT',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
            ],
        });

        const ifTable2 = await queryRunner.hasTable('variant_value_translation');
        if (!ifTable2) {
            await queryRunner.createTable(table2);
        }

        const getTable2 = await queryRunner.getTable('variant_value_translation');
        const ifDataExsist3 = getTable2.foreignKeys.find(fk => fk.columnNames.indexOf('variant_value_id') !== -1);
        if (!ifDataExsist3) {
            await queryRunner.createForeignKey(getTable2, this.tableForeignKey3);
        }

        const ifDataExsist4 = getTable2.foreignKeys.find(fk => fk.columnNames.indexOf('language_id') !== -1);
        if (!ifDataExsist4) {
            await queryRunner.createForeignKey(getTable2, this.tableForeignKey4);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
