import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddPluginColumns1666936841928 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifColumn = await queryRunner.hasColumn('plugins', 'is_editable');
        if (!ifColumn) {
            await queryRunner.addColumn('plugins', new TableColumn({
                name: 'is_editable',
                type: 'integer',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const ifRoutes = await queryRunner.hasColumn('plugins', 'routes');
        if (!ifRoutes) {
            await queryRunner.addColumn('plugins', new TableColumn({
                name: 'routes',
                type: 'text',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('plugins', 'is_editable');
        await queryRunner.dropColumn('plugins', 'routes');
    }

}
