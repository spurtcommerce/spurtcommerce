import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInOrderProductTable1582207440112 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExistt = await queryRunner.hasColumn('product', 'order_product_prefix_id');
        if (!ifExistt) {
            await queryRunner.addColumn('product', new TableColumn({
                name: 'order_product_prefix_id',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('product', 'order_product_prefix_id');
    }

}
