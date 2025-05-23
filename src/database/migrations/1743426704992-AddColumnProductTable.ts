import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnProductTable1743426704992 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const isCancellableColumnExist = await queryRunner.hasColumn('product', 'is_cancellable');
        if (!isCancellableColumnExist) {
            await queryRunner.addColumn('product', new TableColumn({
                name: 'is_cancellable',
                type: 'tinyint',
                isPrimary: false,
                default: 0,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
