import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInUser1565682493625 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('users', 'delete_flag');
        if (!ifExist) {
            await queryRunner.addColumn('users', new TableColumn({
                name: 'delete_flag',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
               }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('users', 'delete_flag');
    }

}
