import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInUser1644063579528 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('users', 'forget_password_link_expires');
        if (!ifExist) {
            await queryRunner.addColumn('users', new TableColumn({
                name: 'forget_password_link_expires',
                type: 'datetime',
                isPrimary: false,
                isNullable: true,
            }));
        }
        const ifExist1 = await queryRunner.hasColumn('users', 'forget_password_key');
        if (!ifExist1) {
            await queryRunner.addColumn('users', new TableColumn({
                name: 'forget_password_key',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'forget_password_link_expires');
        await queryRunner.dropColumn('users', 'forget_password_key');
    }

}
