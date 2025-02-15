import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AlterColumnInProductPriceLog1582888041707 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('product_price_log', 'price_update_file_log_id');
        if (!ifExist) {
            await queryRunner.addColumn('product_price_log', new TableColumn({
                name: 'price_update_file_log_id',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('product_price_log', true);
    }

}
