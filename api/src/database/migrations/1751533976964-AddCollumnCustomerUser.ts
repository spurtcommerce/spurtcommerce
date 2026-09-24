import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCollumnCustomerUser1751533976964 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('customer_users', new TableColumn({
            name: 'mail_otp',
            type: 'int',
            isNullable: true,
        }));

        await queryRunner.addColumn('customer_users', new TableColumn({
            name: 'mail_otp_expire_time',
            type: 'datetime',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
