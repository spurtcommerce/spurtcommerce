import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreatePaymentRuleTable1750138557474 implements MigrationInterface {

    private paymentMethodForeignKey = new TableForeignKey({
        name: 'fk_pm_rule_pm_id',
        columnNames: ['payment_method_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'payment_method',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'payment_rule',
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
                    name: 'instructions',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
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
                {
                    name: 'payment_method_id',
                    type: 'int',
                    isNullable: true,
                },
            ],
        });

        const ifExist = await queryRunner.hasTable('payment_rule');
        if (!ifExist) {
            await queryRunner.createTable(table);
        }

        await queryRunner.createForeignKey('payment_rule', this.paymentMethodForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
