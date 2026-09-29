import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnAvatarNamePathForVendorPlugin1744004569710 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('vendor_plugin', new TableColumn({
            name: 'plugin_avatar',
            type: 'varchar',
            isNullable: true,
        }));

        await queryRunner.addColumn('vendor_plugin', new TableColumn({
            name: 'plugin_avatar_path',
            type: 'varchar',
            isNullable: true,
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }
}
