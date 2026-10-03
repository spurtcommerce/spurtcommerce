import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddColumnTenantIdInCurrencyTable1739448850669 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('currency', new TableColumn({
            name: 'tenant_id',
            type: 'int',
            default: undefined,
            isNullable: true,
        }));

        await queryRunner.createForeignKey('currency', new TableForeignKey({
            name: 'fk_currency_vendor_tenant_id',
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
