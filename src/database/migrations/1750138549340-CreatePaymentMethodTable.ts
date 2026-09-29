import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePaymentMethodTable1750138549340 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'payment_method',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isNullable: false,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'slug',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'sort_order',
                    type: 'int',
                    default: 0,
                },
                {
                    name: 'is_active',
                    type: 'tinyint',
                    isNullable: true,
                    default: 1,
                },
                {
                    name: 'is_delete',
                    type: 'tinyint',
                    isNullable: true,
                    default: 0,
                },
                {
                    name: 'created_date',
                    type: 'datetime',
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        });

        const ifExist = await queryRunner.hasTable('payment_method');
        if (!ifExist) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
