import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInPluginTable1665122641263 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('plugins', 'slug_name');
        if (!ifExist) {
        await queryRunner.addColumn('plugins', new TableColumn({
                name: 'slug_name',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
               }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('plugins', 'slug_name');
    }

}
