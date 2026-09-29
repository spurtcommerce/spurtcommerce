import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnToVendorTable1651483780710 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('vendor', 'vendor_group_id');
        if (!ifExist) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'vendor_group_id',
                type: 'INT',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('vendor', 'vendor_group_id');
    }

}
