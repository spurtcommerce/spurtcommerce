import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateVendorGroupCategoryTable1652434662581 implements MigrationInterface {

    private table = new Table({
        name: 'vendor_group_category',
        columns: [
            {
                name: 'id',
                type: 'INT',
                length: '11',
                isPrimary: true,
                isGenerated: true,
                isNullable: false,
                generationStrategy: 'increment',
            }, {
                name: 'vendor_group_id',
                type: 'INT',
                length: '11',
                isPrimary: false,
                isNullable: false,
            }, {
                name: 'category_id',
                type: 'INT',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'is_active',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'created_by',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }, {
                name: 'modified_by',
                type: 'int',
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

    private table_fk = new TableForeignKey({
        name: 'fk_vendor_group_id',
        columnNames: ['vendor_group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vendor_group',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const isExist = await queryRunner.hasTable(this.table);
        if (!isExist) {
            await queryRunner.createTable(this.table);
            await queryRunner.createForeignKey(this.table, this.table_fk);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const isExist = await queryRunner.hasTable(this.table);
        if (isExist) {
            await queryRunner.dropForeignKey(this.table, this.table_fk);
            await queryRunner.dropTable(this.table);

        }
    }

}
