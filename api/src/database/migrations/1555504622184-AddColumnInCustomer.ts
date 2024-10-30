import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInCustomer1555504622184 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('customer', 'local');
        if (!ifExist) {
            await queryRunner.addColumn('customer', new TableColumn({
                name: 'local',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
        const ifExistColumn = await queryRunner.hasColumn('customer', 'oauth_data');
        if (!ifExistColumn) {
        await queryRunner.addColumn('customer', new TableColumn({
            name: 'oauth_data',
            type: 'varchar',
            length: '255',
            isPrimary: false,
            isNullable: true,
        }));
    }
}
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('customer', 'local');
        await queryRunner.dropColumn('customer', 'oauth_data');
    }

}
