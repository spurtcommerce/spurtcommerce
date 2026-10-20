import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateVarientValueTable1601550886508 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_variant_related_tbl_variant_value',
        columnNames: ['variant_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'variant',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'variant_value',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    length: '11',
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isPrimary: true,
                    isNullable: false,
                }, {
                    name: 'variant_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'value_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'sort_order',
                    type: 'int',
                    length: '11',
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
        const ifExsist = await queryRunner.hasTable('variant_value');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const getTable = await queryRunner.getTable('variant_value');
        const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('variant_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('varients_value', true);
    }

}
