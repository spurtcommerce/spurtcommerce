import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInPluginTable1666091900094 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('plugins', 'is_editable');
        if (!ifExist) {
        await queryRunner.addColumn('plugins', new TableColumn({
                name: 'is_editable',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 0,
               }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
