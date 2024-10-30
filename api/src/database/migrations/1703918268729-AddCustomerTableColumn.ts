import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddCustomerTableColumn1703918268729 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const findColumn = await queryRunner.hasColumn('customer', 'site_id');
        if (!findColumn) {
            await queryRunner.addColumn('customer', new TableColumn({
                name: 'site_id',
                type: 'INT',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
