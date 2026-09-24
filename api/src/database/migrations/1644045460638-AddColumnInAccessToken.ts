import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInAccessToken1644045460638 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('access_token', 'user_type');
        if (!ifExist) {
        await queryRunner.addColumn('access_token', new TableColumn({
                name: 'user_type',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
               }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('access_token', 'user_type');
    }

}
