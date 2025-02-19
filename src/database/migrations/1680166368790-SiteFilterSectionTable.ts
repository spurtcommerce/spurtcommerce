import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class SiteFilterSectionTable1680166368790 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_site_filter_section',
        columnNames: ['site_filter_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'site_filter',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'site_filter_section',
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
                    name: 'site_filter_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'section_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'section_name',
                    type: 'varchar',
                    length: '225',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'section_type',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'section_slug',
                    type: 'varchar',
                    length: '225',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'sequence',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('site_filter_section');
        if (!ifExsist) {
            await queryRunner.createTable(table);
            const getTable = await queryRunner.getTable('site_filter_section');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('site_filter_id') !== -1);
            if (!ifDataExsist) {
                await queryRunner.createForeignKey(getTable, this.tableForeignKey);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
