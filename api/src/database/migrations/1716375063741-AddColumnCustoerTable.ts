import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnCustoerTable1716375063741 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('customer', 'mail_otp');
        if (!columnExist) {
            await queryRunner.addColumn('customer', new TableColumn({
                name: 'mail_otp',
                type: 'int',
                length: '11',
                comment: 'BUYER MAIL CHANGE OTP',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const columnExist2 = await queryRunner.hasColumn('customer', 'mail_otp_expire_time');
        if (!columnExist2) {
            await queryRunner.addColumn('customer', new TableColumn({
                name: 'mail_otp_expire_time',
                type: 'datetime',
                comment: 'BUYER MAIL CHANGE OTP EXPIRE TIME',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
