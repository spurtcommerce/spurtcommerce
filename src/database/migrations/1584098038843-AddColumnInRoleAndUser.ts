import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInRoleAndUser1584098038843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('user_group', 'permission');
        if (!ifExist) {
        await queryRunner.addColumn('user_group', new TableColumn({
                name: 'permission',
                type: 'text',
                isPrimary: false,
                isNullable: true,
                }));
        }

        const ifExist1 = await queryRunner.hasColumn('users', 'permission');
        if (!ifExist1) {
        await queryRunner.addColumn('users', new TableColumn({
                name: 'permission',
                type: 'text',
                isPrimary: false,
                isNullable: true,
                }));
        }

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('users', 'permission');
        await queryRunner.dropColumn('user_group', 'permission');
    }

}
