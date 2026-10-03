import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnCustomerTaxNumber1757495134782 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'customer',
            new TableColumn({
                name: 'tax_number',
                type: 'varchar',
                length: '255',
                isNullable: true,
                default: null,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
