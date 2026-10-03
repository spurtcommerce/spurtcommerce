import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateProductHasStockStatus1759473324949 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`UPDATE product SET has_stock = 0;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
