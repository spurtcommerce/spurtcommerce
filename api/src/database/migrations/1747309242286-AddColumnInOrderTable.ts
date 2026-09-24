import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnInOrderTable1747309242286 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('order', [
            new TableColumn({
                name: 'po_number',
                type: 'varchar',
                isNullable: false,
            }),
            new TableColumn({
                name: 'must_ship_before',
                type: 'date',
                isNullable: false,
            }),
            new TableColumn({
                name: 'notes',
                type: 'text',
                isNullable: false,
            }),
        ]);

        await queryRunner.addColumns('order_log', [
            new TableColumn({
                name: 'po_number',
                type: 'varchar',
                isNullable: false,
            }),
            new TableColumn({
                name: 'must_ship_before',
                type: 'date',
                isNullable: false,
            }),
            new TableColumn({
                name: 'notes',
                type: 'text',
                isNullable: false,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
