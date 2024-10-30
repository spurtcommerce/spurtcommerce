import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreatePageGroupTable1606228347336 implements MigrationInterface {
    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_tbl_page_related_tbl_page_group_foreignKey',
        columnNames: ['page_group_id'],
        referencedColumnNames: ['group_id'],
        referencedTableName: 'page_group',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'page_group',
            columns: [
                {
                    name: 'group_id',
                    type: 'int',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'group_name',
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
                },  {
                    name: 'created_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'created_by',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'modified_by',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('page_group');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const tables = await queryRunner.getTable('page');
        const ifDataExsist1 = tables.foreignKeys.find(fk => fk.columnNames.indexOf('page_group_id') !== -1);
        if (!ifDataExsist1) {
            await queryRunner.createForeignKey(tables, this.tableForeignKey1);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('page_group', true);
    }

}
