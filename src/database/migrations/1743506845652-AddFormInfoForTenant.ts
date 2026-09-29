import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddFormInfoForTenant1743506845652 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnSellerLog2PathExist = await queryRunner.hasColumn('vendor_plugin', 'plugin_form_info');

        if (!columnSellerLog2PathExist) {
            await queryRunner.addColumn('vendor_plugin', new TableColumn(
                {
                    name: 'plugin_form_info',
                    type: 'text',
                    length: '255',
                    isNullable: true,
                }
            ));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
