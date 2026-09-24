import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateColumnOrderLogIdInOrderArchiveLog1759750988904 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('order_archive_log', new TableColumn({
            name: 'order_log_id',
            type: 'int',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
