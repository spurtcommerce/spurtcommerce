import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddServiceChargesColumnInProduct1581679252934 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('product', 'service_charges');
        if (!ifExist) {
            await queryRunner.addColumn('product', new TableColumn({
                name: 'service_charges',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
        const ifExist1 = await queryRunner.hasColumn('product', 'product_slug');
        if (!ifExist1) {
            await queryRunner.addColumn('product', new TableColumn({
                name: 'product_slug',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
        const ifExist2 = await queryRunner.hasColumn('product', 'service_charges');
        if (!ifExist2) {
            await queryRunner.addColumn('product', new TableColumn({
                name: 'service_charges',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        // --
    }

}
