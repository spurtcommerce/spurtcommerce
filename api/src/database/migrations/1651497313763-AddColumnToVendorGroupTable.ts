import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnToVendorGroupTable1651497313763 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('vendor_group', 'color_code');
        if (!ifExist) {
            await queryRunner.addColumn('vendor_group', new TableColumn({
                name: 'color_code',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
               }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('vendor_group', 'color_code');
    }

}
