import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddExpiryColumnOtpTable1761889605215 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('registration_user_otp', 'expires_at');
        if (!columnExist) {
            await queryRunner.addColumn('registration_user_otp', new TableColumn({
                name: 'expires_at',
                type: 'datetime',
                isNullable: true,
            }));
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //
    }

}
