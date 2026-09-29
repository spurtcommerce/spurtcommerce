import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePaymentTermTable1750055934650 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'payment_term',
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
                    isNullable: true,
                },
                {
                    name: 'slug',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'term_days',
                    type: 'int',
                    isNullable: true,
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
                    name: 'created_by',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'created_date',
                    type: 'datetime',
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'modified_by',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'modified_date',
                    type: 'datetime',
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'tenant_id',
                    type: 'int',
                    isNullable: true,
                },
            ],
        });

        const ifExist = await queryRunner.hasTable('payment_term');
        if (!ifExist) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
