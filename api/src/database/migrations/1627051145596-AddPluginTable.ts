import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreatePluginTable1627051145596 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'plugins',
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
                    name: 'plugin_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'plugin_avatar',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'plugin_avatar_path',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'plugin_type',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'plugin_additional_info',
                    type: 'mediumtext',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'plugin_status',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
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
                }, {
                    name: 'plugin_form_info',
                    type: 'text',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'slug_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'is_editable',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 0,
                }, {
                    name: 'routes',
                    type: 'text',
                    isPrimary: false,
                    isNullable: true,
                },
            ],
        });
        const ifExist = await queryRunner.hasTable('plugins');
        if (!ifExist) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('plugins', true);
    }

}
