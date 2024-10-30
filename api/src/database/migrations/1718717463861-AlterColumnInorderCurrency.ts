import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnInorderCurrency1718717463861 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExistOrder = await queryRunner.hasColumn('order', 'currency_id');
        if (columnExistOrder) {
            await queryRunner.query('Alter table `order` modify currency_id int null');
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
