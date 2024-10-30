import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInProduct1603107735535 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('product', 'is_simplified');
        if (!ifExist) {
        await queryRunner.addColumn('product', new TableColumn({
                name: 'is_simplified',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('product', 'is_simplified');
    }

}
