import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInProductTable1605507026632 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('product', 'attribute_keyword');
        if (!ifExist) {
        await queryRunner.addColumn('product', new TableColumn({
                name: 'attribute_keyword',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
        const ifExist1 = await queryRunner.hasColumn('product', 'hsn');
        if (!ifExist1) {
        await queryRunner.addColumn('product', new TableColumn({
                name: 'hsn',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('product', 'attribute_keyword');
        await queryRunner.dropColumn('product', 'hsn');
    }

}
