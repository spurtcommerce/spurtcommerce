import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnSupplierDocLinkTable1717756673947 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const exist = await queryRunner.hasColumn('supplier_link_doc', 'is_approved');
        if (exist) {
            await queryRunner.query('UPDATE `supplier_link_doc` SET `is_approved` = 0 WHERE `is_approved` IS NULL');
            await queryRunner.query('ALTER TABLE `supplier_link_doc` MODIFY `is_approved` tinyint DEFAULT 0 NOT NULL');
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
