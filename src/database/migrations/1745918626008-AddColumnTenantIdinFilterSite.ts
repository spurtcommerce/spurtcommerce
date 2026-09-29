import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnTenantIdinFilterSite1745918626008 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('site_filter', new TableColumn({
            name: 'tenant_id',
            type: 'int',
            isNullable: false,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
