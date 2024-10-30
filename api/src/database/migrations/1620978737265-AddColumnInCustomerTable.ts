import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInCustomerTable1620978737265 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist3 = await queryRunner.hasColumn('customer', 'forget_password_key');
        if (!ifExist3) {
        await queryRunner.addColumn('customer', new TableColumn({
                name: 'forget_password_key',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('customer', 'forget_password_key');
    }
}
