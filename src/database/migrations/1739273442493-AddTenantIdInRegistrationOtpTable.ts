import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTenantIdInRegistrationOtpTable1739273442493 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('registration_user_otp', new TableColumn({
            name: 'tenant_id',
            type: 'int',
            default: undefined,
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('registration_user_otp', 'tenant_id');
    }
}
