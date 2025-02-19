import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddingColumnInProductTable1654338253531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('product', 'setted_as_common_on');
        if (!ifExist) {
            await queryRunner.addColumn('product', new TableColumn({
                name: 'setted_as_common_on',
                type: 'DATETIME',
                isPrimary: false,
                isNullable: true,
                default: 'NULL',
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('product', 'setted_as_common_on');
    }
}
