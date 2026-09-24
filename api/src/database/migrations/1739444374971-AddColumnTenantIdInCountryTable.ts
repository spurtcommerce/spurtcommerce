import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddColumnTenantIdInCountryTable1739444374971 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('country', new TableColumn({
            name: 'tenant_id',
            type: 'int',
            default: undefined,
            isNullable: true,
        }));

        await queryRunner.createForeignKey('country', new TableForeignKey({
            name: 'fk_country_vendor_tenant_id',
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
