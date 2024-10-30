import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInProduct1594112639974 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('vendor_product', 'quotation_available');
        if (!ifExist) {
        await queryRunner.addColumn('vendor_product', new TableColumn({
                name: 'quotation_available',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 0,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('vendor_product', 'quotation_available');
    }

}
