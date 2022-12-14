import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddingColumnInCustomer1644390622396 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('customer', 'forget_password_link_expires');
        if (!ifExist) {
            await queryRunner.addColumn('customer', new TableColumn({
                name: 'forget_password_link_expires',
                type: 'datetime',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('customer', 'forget_password_link_expires');
    }

}
