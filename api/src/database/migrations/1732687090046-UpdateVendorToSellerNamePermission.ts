import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateVendorToSellerNamePermission1732687090046 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE permission_module
            SET
                name = REPLACE(name, 'Vendor', 'Seller')
            WHERE
                name LIKE '%Vendor%';
        `);

        await queryRunner.query(`
            UPDATE permission_module_group
            SET
                name = REPLACE(name, 'Vendor', 'Seller')
            WHERE
                name LIKE '%Vendor%';
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
