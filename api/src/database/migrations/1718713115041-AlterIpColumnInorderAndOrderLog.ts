import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterIpColumnInorderAndOrderLog1718713115041 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const columnExistOrder = await queryRunner.hasColumn('order', 'ip');
        const columnExistOrderLog = await queryRunner.hasColumn('order_log', 'ip');

        if (columnExistOrder) {
            await queryRunner.query('Alter table `order` modify ip varchar(255)');
        }
        if (columnExistOrderLog) {
            await queryRunner.query('Alter table `order_log` modify ip varchar(255)');
        }
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        //
    }

}
