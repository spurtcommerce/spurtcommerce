import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRowCustomerWordToBuyerInPermmisionModules1732273657099 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE permission_module
            SET
                name = REPLACE(name, 'Customer', 'Buyer'),
                slug_name = REPLACE(slug_name, 'customer', 'buyer')
            WHERE
                name LIKE '%Customer%' OR
                slug_name LIKE '%customer%';
        `);

        await queryRunner.query(`
            UPDATE permission_module_group
            SET
                name = REPLACE(name, 'Customer', 'Buyer'),
                slug_name = REPLACE(slug_name, 'customer', 'buyer')
            WHERE
                name LIKE '%Customer%' OR
                slug_name LIKE '%customer%';
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
