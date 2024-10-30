import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumntoVendorGroup1652418662962 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const column = new TableColumn({
            name: 'vendor_group_commission',
            type: 'Decimal',
            length: '10,2',
            isPrimary: false,
            isNullable: false,
        });

        const table = await queryRunner.getTable('vendor_group');

        if (table) {
            await queryRunner.addColumn(table, column);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('vendor_group', 'vendor_group_commission');
    }

}
