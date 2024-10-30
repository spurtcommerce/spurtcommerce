import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCustomerTableColumn1721808738857 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const exist = await queryRunner.hasColumn('customer', 'pincode');
        if (exist) {
            await queryRunner.query('ALTER TABLE `customer` CHANGE `pincode` `pincode` VARCHAR(10)');
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
