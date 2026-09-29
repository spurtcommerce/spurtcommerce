import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateExportLogColum1762150585222 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = 'export_log';
        const hasColumn = await queryRunner.hasColumn(table, 'record_ids');
        if (!hasColumn) {
            await queryRunner.addColumn(
                table,
                new TableColumn({
                    name: 'record_ids',
                    type: 'text',
                    isNullable: true,
                })
            );
        }
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        //
    }
}
