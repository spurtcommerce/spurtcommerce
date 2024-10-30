import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreatePaymentArchive1588751152380 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_payment_archive_tbl_order_foreignKey',
        columnNames: ['order_id'],
        referencedColumnNames: ['order_id'],
        referencedTableName: 'order',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'payment_archive',
            columns: [
                {
                    name: 'payment_archive_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'order_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'paid_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'payment_number',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'payment_information',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'payment_amount',
                    type: 'DECIMAL',
                    length: '10,2',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'payment_commission_amount',
                    type: 'DECIMAL',
                    length: '10,2',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'modified_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('payment_archive');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('payment_archive', true);
    }

}
