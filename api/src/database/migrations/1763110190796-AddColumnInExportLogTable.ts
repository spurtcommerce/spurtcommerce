import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnInExportLogTable1763110190796 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('export_log', [
            new TableColumn({
                name: 'title',
                type: 'varchar',
                length: '255',
                isNullable: true,
            }),
            new TableColumn({
                name: 'product_type',
                type: 'int',
                isNullable: true,
            }),
            new TableColumn({
                name: 'export_id',
                type: 'varchar',
                length: '100',
                isNullable: true,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
