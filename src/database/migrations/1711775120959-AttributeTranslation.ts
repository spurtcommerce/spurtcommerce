import { MigrationInterface, QueryRunner, TableForeignKey, Table } from 'typeorm';

export class AttributeTranslation1711775120959 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_attribute_translation_attribute_attribute_id_idx',
        columnNames: ['attribute_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'attribute',
        onDelete: 'CASCADE',
    });

    private tableForeignKey2 = new TableForeignKey({
        name: 'fk_attribute_translation_language_language_id',
        columnNames: ['language_id'],
        referencedColumnNames: ['language_id'],
        referencedTableName: 'language',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'attribute_translation',
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
                    name: 'attribute_id',
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
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'description',
                    type: 'varchar',
                    length: '512',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'label',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'section_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'default_value',
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
                {
                    name: 'created_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'modified_by',
                    type: 'integer',
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
            ],
        });
        const ifTable = await queryRunner.hasTable('attribute_translation');
        if (!ifTable) {
            await queryRunner.createTable(table);
        }

        const getTable = await queryRunner.getTable('attribute_translation');

        const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('attribute_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(getTable, this.tableForeignKey);
        }

        const ifDataExsist2 = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('language_id') !== -1);
        if (!ifDataExsist2) {
            await queryRunner.createForeignKey(getTable, this.tableForeignKey2);
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
