import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveTenantIdInRegistrationUserOtp1738838656742 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('registration_user_otp', 'tenant_id');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
