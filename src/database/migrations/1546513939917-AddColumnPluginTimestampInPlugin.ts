import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnPluginTimestampInPlugin1546513939917 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('plugins', 'plugin_timestamp');
        if (!ifExist) {
            await queryRunner.addColumn('plugins', new TableColumn({
                name: 'plugin_timestamp',
                type: 'bigint',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
