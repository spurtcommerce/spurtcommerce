import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AdddefaultLanguageInsettingTable1711168757035 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const tableForeignKey = new TableForeignKey({
            name: 'fk_tbl_settings_lanaguge_language_id',
            columnNames: ['default_language_id'],
            referencedColumnNames: ['language_id'],
            referencedTableName: 'language',
            onDelete: 'RESTRICT',
        });

        const columnExist = await queryRunner.hasColumn('settings', 'default_language_id');

        if (!columnExist) {
            await queryRunner.addColumn('settings', new TableColumn({
                name: 'default_language_id',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const getTable = await queryRunner.getTable('settings');
        const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('default_language_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(getTable, tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
