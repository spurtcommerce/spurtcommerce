import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnVendorTable1717148588331 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('vendor', 'mail_otp');
        if (!columnExist) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'mail_otp',
                type: 'int',
                length: '11',
                comment: 'VENDOR MAIL OTP',
                isPrimary: false,
                isNullable: true,
            }));
        }
        const columnExist2 = await queryRunner.hasColumn('vendor', 'login_otp_expire_time');
        if (!columnExist2) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'login_otp_expire_time',
                type: 'datetime',
                comment: 'VENDOR MAIL OTP EXPIRE TIME',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
