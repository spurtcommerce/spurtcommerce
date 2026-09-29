import { MigrationInterface, QueryRunner, TableForeignKey, TableColumn } from 'typeorm';

export class AddColumnTenantIdInZoneTable1739446544526 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('zone', new TableColumn({
            name: 'tenant_id',
            type: 'int',
            default: undefined,
            isNullable: true,
        }));

        await queryRunner.createForeignKey('zone', new TableForeignKey({
            name: 'fk_zone_vendor_tenant_id',
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
