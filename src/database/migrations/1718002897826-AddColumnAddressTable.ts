import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnAddressTable1718002897826 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('address', 'is_default');
        if (!columnExist) {
            await queryRunner.addColumn('address', new TableColumn({
                name: 'is_default',
                type: 'tinyint',
                default: 0,
                isPrimary: false,
                isNullable: true,
            }));
        }
        await queryRunner.query('UPDATE `address` SET `is_default` = 0 WHERE `is_default` IS NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
