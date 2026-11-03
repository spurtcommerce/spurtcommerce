import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnIsActiveInPluings1648018102672 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('plugins');

        if (!table?.findColumnByName('is_active')) {
            await queryRunner.addColumn(
                'plugins',
                new TableColumn({
                    name: 'is_active',
                    type: 'int',
                    default: 1,
                    isNullable: true,
                })
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('plugins');

        if (table?.findColumnByName('is_active')) {
            await queryRunner.dropColumn('plugins', 'is_active');
        }
    }
}
