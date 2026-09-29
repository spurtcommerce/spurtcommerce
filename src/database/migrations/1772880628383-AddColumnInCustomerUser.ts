import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnInCustomerUser1772880628383 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            ALTER TABLE customer_users
            ADD COLUMN basic_info VARCHAR(500)
            DEFAULT 'This section focuses mainly on your basic required details such as First name, Last name, Phone number etc.'
        `);

        await queryRunner.query(`
            ALTER TABLE customer_users
            ADD COLUMN password_description VARCHAR(500)
            DEFAULT 'Change your password whenever you want for enhancing the security of your store login'
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
