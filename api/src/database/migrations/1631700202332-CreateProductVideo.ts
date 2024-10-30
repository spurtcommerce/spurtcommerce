import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateProductVideo1631700202332 implements MigrationInterface {
    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_tbl_product_tbl_product_video_foreignKey',
        columnNames: ['product_id'],
        referencedColumnNames: ['product_id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'product_video',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'product_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'path',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                },  {
                    name: 'type',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    comment: '1 -> video 2 -> embedded',
                }, {
                    name: 'created_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
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
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('product_video');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const tables = await queryRunner.getTable('product_video');
        const ifDataExsist1 = tables.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
        if (!ifDataExsist1) {
            await queryRunner.createForeignKey(tables, this.tableForeignKey1);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product_video', true);
    }

}
