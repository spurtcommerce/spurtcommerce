import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class AttributeValueTranslation1711776174354 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_attribute_val_translation_attribute_val_attribute_val_id_idx',
        columnNames: ['attribute_value_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'attribute_value',
        onDelete: 'CASCADE',
    });

    private tableForeignKey2 = new TableForeignKey({
        name: 'fk_attribute_value_translation_language_language_id',
        columnNames: ['language_id'],
        referencedColumnNames: ['language_id'],
        referencedTableName: 'language',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'attribute_value_translation',
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
                    name: 'attribute_value_id',
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
                    name: 'attribute_value',
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
        const ifTable = await queryRunner.hasTable('attribute_value_translation');
        if (!ifTable) {
            await queryRunner.createTable(table);
        }

        const getTable = await queryRunner.getTable('attribute_value_translation');

        const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('attribute_value_id') !== -1);
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
