import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnSupplierTable1717672342264 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const exist = await queryRunner.hasColumn('supplier', 'tax_id');
        if (exist) {
            await queryRunner.query(`ALTER TABLE supplier MODIFY tax_id varchar(30)`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
