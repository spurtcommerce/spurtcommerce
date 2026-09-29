import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnVendorTable1717572990987 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('vendor', 'preferred_shipping_method');
        if (!columnExist) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'preferred_shipping_method',
                type: 'varchar',
                length: '50',
                comment: 'CUSTOMER SHIPMENT MODE',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
