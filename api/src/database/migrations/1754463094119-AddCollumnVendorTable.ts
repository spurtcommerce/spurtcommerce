import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCollumnVendorTable1754463094119 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('vendor', new TableColumn({
            name: 'selling_types',
            type: 'json',
            isNullable: true,
        }));
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
