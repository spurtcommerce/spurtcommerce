import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddPaymentProcessInOrder1586159957544 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('order', 'payment_process');
        if (!ifExist) {
        await queryRunner.addColumn('order', new TableColumn({
                name: 'payment_process',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 1,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('order', 'payment_process');
    }

}
