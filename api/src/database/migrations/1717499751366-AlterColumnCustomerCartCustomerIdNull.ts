import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnCustomerCartCustomerIdNull1717499751366 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('customer_cart', 'customer_id');
        if (columnExist) {
            await queryRunner.query(`ALTER TABLE customer_cart MODIFY customer_id INT NULL;`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
