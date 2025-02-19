import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropForignKeyColumnOrderTable1718254680960 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('order');
        if (table) {
            await queryRunner.query(`ALTER TABLE \`order\` DROP INDEX fk_order_customer1`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
