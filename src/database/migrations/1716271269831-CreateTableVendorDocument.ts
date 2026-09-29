import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateTableVendorDocument1716271269831 implements MigrationInterface {

    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_vendor_document_vendor_vendor_id',
        columnNames: ['vendor_id'],
        referencedColumnNames: ['vendor_id'],
        referencedTableName: 'vendor',
        onDelete: 'CASCADE',
    });

    private tableForeignKey2 = new TableForeignKey({
        name: 'fk_vendor_document_document_document_id',
        columnNames: ['document_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'document',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'vendor_document',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'vendor_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'document_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'file_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'file_path',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'created_by',
                    type: 'INT',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'created_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'modified_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'modified_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('vendor_document');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }

        const getTable = await queryRunner.getTable('vendor_document');

        const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(getTable, this.tableForeignKey1);
        }

        const ifDataExsist1 = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('document_id') !== -1);
        if (!ifDataExsist1) {
            await queryRunner.createForeignKey(getTable, this.tableForeignKey2);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
