import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnRejectReasonLog1727501360353 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE vendor_product MODIFY reject_reason VARCHAR(255) null`);
        await queryRunner.query(`UPDATE vendor_product SET reject_reason = NULL`);
        await queryRunner.query(`ALTER TABLE vendor_product MODIFY reject_reason JSON`);
        await queryRunner.query(`UPDATE vendor_product SET reject_reason = '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
