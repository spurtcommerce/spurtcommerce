import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class SiteFilterSectionItemTable1680168497836 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_site_filter_section_item',
        columnNames: ['site_filter_section_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'site_filter_section',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'site_filter_section_item',
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
                    name: 'site_filter_section_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'item_name',
                    type: 'varchar',
                    length: '225',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'item_slug',
                    type: 'varchar',
                    length: '225',
                    isPrimary: false,
                    isNullable: true,
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('site_filter_section_item');
        if (!ifExsist) {
            await queryRunner.createTable(table);
            const getTable = await queryRunner.getTable('site_filter_section_item');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('site_filter_section_id') !== -1);
            if (!ifDataExsist) {
                await queryRunner.createForeignKey(getTable, this.tableForeignKey);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
