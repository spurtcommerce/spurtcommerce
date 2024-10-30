import {MigrationInterface, QueryRunner} from 'typeorm';

export class ChangeProductSpecialColumnChanges1720096496973 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE product_special CHANGE customer_group_id customer_group_id INT NULL DEFAULT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
