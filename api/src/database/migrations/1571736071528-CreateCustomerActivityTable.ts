import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateCustomerActivityTable1571736071528 implements MigrationInterface {
    private CustomerActivityToCustomerForeignKeys = new TableForeignKey({
        name: 'fk_tbl_customer_activity_tbl_customer',
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customer',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'customer_activity',
            columns: [
                {
                    name: 'customer_activity_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'activity_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'customer_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'product_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'modified_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        });

        const ifExsist = await queryRunner.hasTable('customer_activity');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('customer_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.CustomerActivityToCustomerForeignKeys);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('customer_activity', true);
    }

}
