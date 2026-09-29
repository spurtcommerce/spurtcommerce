import { MigrationInterface, QueryRunner } from 'typeorm';

export class TruncateTableVendorPermissionTableModuleAndGroup1752492521165 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE vendor_permission_module
            DROP FOREIGN KEY fk_vendor_permission_module_module_group_id;
        `);

        await queryRunner.query('TRUNCATE TABLE vendor_permission_module;');
        await queryRunner.query('TRUNCATE TABLE vendor_permission_module_group;');

        await queryRunner.query(`
            ALTER TABLE vendor_permission_module
            ADD CONSTRAINT fk_vendor_permission_module_module_group_id
            FOREIGN KEY (module_group_id)
            REFERENCES vendor_permission_module_group(module_group_id)
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
