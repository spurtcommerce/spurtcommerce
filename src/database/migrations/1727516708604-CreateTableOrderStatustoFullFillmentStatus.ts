import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableOrderStatustoFullFillmentStatus1727516708604 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'order_status_to_fulfillment',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'order_status_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'order_fulfillment_status_id',
                        type: 'int',
                        isNullable: false,
                    },
                ],
            }),
            true
        );

        // Add foreign key for order_status_id
        await queryRunner.createForeignKey(
            'order_status_to_fulfillment',
            new TableForeignKey({
                columnNames: ['order_status_id'],
                referencedColumnNames: ['order_status_id'],
                referencedTableName: 'order_status',
                onDelete: 'CASCADE',
            })
        );

        // Add foreign key for order_fulfillment_status_id
        await queryRunner.createForeignKey(
            'order_status_to_fulfillment',
            new TableForeignKey({
                columnNames: ['order_fulfillment_status_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'order_fulfillment_status',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
