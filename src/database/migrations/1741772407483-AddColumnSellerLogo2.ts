import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnSellerLogo21741772407483 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnSellerLog2Exist = await queryRunner.hasColumn('vendor_settings', 'seller_logo2');

        if (!columnSellerLog2Exist) {
            await queryRunner.addColumn('vendor_settings', new TableColumn(
                {
                    name: 'seller_logo2',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                }
            ));
        }

        const columnSellerLog2PathExist = await queryRunner.hasColumn('vendor_settings', 'seller_logo2_path');

        if (!columnSellerLog2PathExist) {
            await queryRunner.addColumn('vendor_settings', new TableColumn(
                {
                    name: 'seller_logo2_path',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                }
            ));
        }

        const columnZoneIdExist = await queryRunner.hasColumn('vendor_settings', 'zone_id');

        if (!columnZoneIdExist) {
            await queryRunner.addColumn('vendor_settings', new TableColumn(
                {
                    name: 'zone_id',
                    type: 'int',
                    length: '11',
                    isNullable: true,
                }
            ));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
