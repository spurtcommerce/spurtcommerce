import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from 'typeorm';

export class AddColumnTenantIdInLanguageTable1739442184090 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('language', new TableColumn({
            name: 'tenant_id',
            type: 'int',
            default: undefined,
            isNullable: true,
        }));

        await queryRunner.createForeignKey('language', new TableForeignKey({
            name: 'fk_language_vendor_tenant_id',
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
