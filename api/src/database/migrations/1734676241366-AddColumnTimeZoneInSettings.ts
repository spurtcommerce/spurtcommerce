import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnTimeZoneInSettings1734676241366 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('settings', 'time_zone');
        if (!ifExist) {
            await queryRunner.addColumn('settings', new TableColumn({
                name: 'time_zone',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
                collation: 'utf8mb4_unicode_ci',
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
