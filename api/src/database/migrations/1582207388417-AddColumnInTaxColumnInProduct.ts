import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInTaxColumnInProduct1582207388417 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExistt = await queryRunner.hasColumn('product', 'tax_type');
        if (!ifExistt) {
            await queryRunner.addColumn('product', new TableColumn({
                name: 'tax_type',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }));
        }
        const ifExisttt = await queryRunner.hasColumn('product', 'tax_value');
        if (!ifExisttt) {
            await queryRunner.addColumn('product', new TableColumn({
                name: 'tax_value',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('product', 'tax_type');
        await queryRunner.dropColumn('product', 'tax_value');
    }

}
