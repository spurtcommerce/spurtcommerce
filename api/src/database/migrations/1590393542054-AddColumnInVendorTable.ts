import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInVendorTable1590393542054 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('vendor', 'vendor_slug_name');
        if (!ifExist) {
        await queryRunner.addColumn('vendor', new TableColumn({
                name: 'vendor_slug_name',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('vendor', 'vendor_slug_name');
    }

}
