import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnSupplierDocTable1717756512442 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const exist = await queryRunner.hasColumn('supplier_link_doc', 'is_active');
        if (exist) {
            await queryRunner.query('UPDATE `supplier_link_doc` SET `is_active` = 1 WHERE `is_active` IS NULL');
            await queryRunner.query('ALTER TABLE `supplier_link_doc` MODIFY `is_active` tinyint DEFAULT 1 NOT NULL');
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
