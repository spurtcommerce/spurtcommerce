import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnProductTable1760620102289 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'product',
            new TableColumn({
                name: 'tax_id',
                type: 'int',
                isNullable: true,
                default: null,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
