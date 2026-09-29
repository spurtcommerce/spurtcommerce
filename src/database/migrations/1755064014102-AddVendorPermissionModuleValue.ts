import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVendorPermissionModuleValue1755064014102 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          INSERT INTO vendor_permission_module_group (name, slug_name, sort_order, created_date)
          VALUES ('Contacts', 'contacts', 35, NOW()),('Sales Report', 'sales-report', 36, NOW()),('Export Data','export-data',37, NOW());`);

    const contactsGroup = await queryRunner.query(`
          SELECT module_group_id FROM vendor_permission_module_group WHERE slug_name = 'contacts';`);

    const salesReportGroup = await queryRunner.query(`
            SELECT module_group_id FROM vendor_permission_module_group WHERE slug_name = 'sales-report';`);

    const sexportData = await queryRunner.query(`
              SELECT module_group_id FROM vendor_permission_module_group WHERE slug_name = 'export-data';`);

    const contactsGroupGroupId = contactsGroup[0]?.module_group_id;
    const salesReportGroupId = salesReportGroup[0]?.module_group_id;
    const exportDataId = sexportData[0]?.module_group_id;

    await queryRunner.query(`
          INSERT INTO vendor_permission_module (name, slug_name, sort_order, module_group_id, is_listed, created_date)
          VALUES
            ('List Contacts', 'list-contacts', 1, ${contactsGroupGroupId}, 1, NOW()),
            ('Create Contacts', 'create-contacts', 2, ${contactsGroupGroupId}, 0, NOW()),
            ('Edit Contacts', 'edit-contacts', 3, ${contactsGroupGroupId}, 0, NOW()),
            ('Delete Contacts', 'delete-contacts', 4, ${contactsGroupGroupId}, 0, NOW()),
            ('List Sales Report', 'list-sales-report', 1, ${salesReportGroupId}, 1, NOW()),
            ('List Export Data', 'list-export-data', 1, ${exportDataId}, 1, NOW()),
            ('Create Export Data', 'create-export-data', 1, ${exportDataId}, 0, NOW());`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // --
  }

}
