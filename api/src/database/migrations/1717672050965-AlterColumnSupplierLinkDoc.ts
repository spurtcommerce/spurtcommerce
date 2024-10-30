import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnSupplierLinkDoc1717672050965 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('supplier_link_doc', 'document_id');
        if (columnExist) {
            await queryRunner.query(`ALTER TABLE supplier_link_doc MODIFY document_id INT NULL;`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
