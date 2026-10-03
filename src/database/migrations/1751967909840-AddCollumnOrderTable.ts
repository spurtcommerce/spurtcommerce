import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCollumnOrderTable1751967909840 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('order', new TableColumn({
            name: 'payment_term_id',
            type: 'int',
            isNullable: true,
        }));

        await queryRunner.addColumn('order', new TableColumn({
            name: 'shipping_cost_override',
            type: 'decimal',
            isNullable: false,
            precision: 10,
            scale: 2,
            default: '0.00',
        }));

        await queryRunner.addColumn('order', new TableColumn({
            name: 'order_source',
            type: 'enum',
            enum: ['quote', 'rfq', 'shoppingCart', 'quick-order'],
            isNullable: true,
        }));

        await queryRunner.addColumn('order', new TableColumn({
            name: 'created_by_type',
            type: 'enum',
            enum: ['buyer', 'seller'],
            isNullable: true,
        }));

        await queryRunner.addColumn('order_log', new TableColumn({
            name: 'payment_term_id',
            type: 'int',
            isNullable: true,
        }));

        await queryRunner.addColumn('order_log', new TableColumn({
            name: 'shipping_cost_override',
            type: 'decimal',
            isNullable: false,
            precision: 10,
            scale: 2,
            default: '0.00',
        }));

        await queryRunner.addColumn('order_log', new TableColumn({
            name: 'order_source',
            type: 'enum',
            enum: ['quote', 'rfq', 'shopping-cart', 'quick-order'],
            isNullable: true,
        }));

        await queryRunner.addColumn('order_log', new TableColumn({
            name: 'created_by_type',
            type: 'enum',
            enum: ['buyer', 'seller'],
            isNullable: true,
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
