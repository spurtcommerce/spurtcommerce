import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnNameVendor1717141959627 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const exist = await queryRunner.hasColumn('vendor', 'cheque_payee_name');
        if (exist) {
            await queryRunner.renameColumn('vendor', 'cheque_payee_name', 'business_segment');
        }
        const exist2 = await queryRunner.hasColumn('vendor', 'paypal_email_account');
        if (exist2) {
            await queryRunner.renameColumn('vendor', 'paypal_email_account', 'business_type');
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
