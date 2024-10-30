import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateSettlementItemTable1604489717068 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_settlement_constraint_tbl_settlement_item',
        columnNames: ['settlement_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'settlement',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'settlement_item',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'vendor_order_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'vendor_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'company_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'settlement_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'order_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'order_product_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'order_product_prefix_id',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'total',
                    type: 'DECIMAL',
                    length: '10,2',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'commission',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'commission_amount',
                    type: 'DECIMAL',
                    length: '10,2',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'net_amount',
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
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('settlement_item');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('settlement_id') !== -1);
        if (!ifDataExsist1) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('settlement_item', true);
    }

}
