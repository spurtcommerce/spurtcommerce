import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCollumVendorTable1722339677856 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const findColumn = await queryRunner.hasColumn('vendor', 'personalized_settings');
        if (!findColumn) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'personalized_settings',
                type: 'json',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
