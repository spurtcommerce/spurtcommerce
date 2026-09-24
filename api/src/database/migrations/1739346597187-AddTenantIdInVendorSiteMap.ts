import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddTenantIdInVendorSiteMap1739346597187 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('site_map', new TableColumn({
            name: 'tenant_id',
            type: 'int',
            default: undefined,
            isNullable: true,
        }));

        await queryRunner.createForeignKey('site_map', new TableForeignKey({
            name: 'fk_venodr_site_map_tenant_id',
            columnNames: ['tenant_id'],
            referencedTableName: 'vendor',
            referencedColumnNames: ['vendor_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
