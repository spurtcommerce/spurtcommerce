import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInProductTable1586347085190 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExistt = await queryRunner.hasColumn('product', 'height');
        if (!ifExistt) {
            await queryRunner.addColumn('product', new TableColumn({
                name: 'height',
                type: 'DECIMAL',
                length: '15,2',
                isPrimary: false,
                isNullable: true,
            }));
        }
        const ifExist1 = await queryRunner.hasColumn('product', 'weight');
        if (!ifExist1) {
            await queryRunner.addColumn('product', new TableColumn({
                name: 'weight',
                type: 'DECIMAL',
                length: '15,2',
                isPrimary: false,
                isNullable: true,
            }));
        }
        const ifExist2 = await queryRunner.hasColumn('product', 'length');
        if (!ifExist2) {
            await queryRunner.addColumn('product', new TableColumn({
                name: 'length',
                type: 'DECIMAL',
                length: '15,2',
                isPrimary: false,
                isNullable: true,
            }));
        }
        const ifExist3 = await queryRunner.hasColumn('product', 'width');
        if (!ifExist3) {
            await queryRunner.addColumn('product', new TableColumn({
                name: 'width',
                type: 'DECIMAL',
                length: '15,2',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('product', 'height');
        await queryRunner.dropColumn('product', 'weight');
        await queryRunner.dropColumn('product', 'length');
        await queryRunner.dropColumn('product', 'width');
    }

}
