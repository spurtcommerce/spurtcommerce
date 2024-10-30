import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddTrackingColumnInOrderTable1578990577479 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('order', 'tracking_url');
        const ifExistt = await queryRunner.hasColumn('order', 'tracking_no');
        const ifExit = await queryRunner.hasColumn('order', 'payment_status');
        if (!ifExist) {
            await queryRunner.addColumn('order', new TableColumn({
                name: 'tracking_url',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
               }));
        }

        if (!ifExistt) {
            await queryRunner.addColumn('order', new TableColumn({
                name: 'tracking_no',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
               }));
        }

        if (!ifExit) {
            await queryRunner.addColumn('order', new TableColumn({
                name: 'payment_status',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 0,
               }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('order', 'tracking_url');
        await queryRunner.dropColumn('order', 'tracking_no');
    }

}
