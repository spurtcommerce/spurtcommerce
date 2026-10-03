import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTenantIdInRegistrationOtpTable1738133353516 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('registration_user_otp', new TableColumn({
            name: 'tenant_id',
            type: 'int',
            isNullable: false, // Set to `false` if it's a required field
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('registration_user_otp', 'tenant_id');
    }
}
