import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInOrder1581674795492 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('order', 'payment_type');
        if (!ifExist) {
            await queryRunner.addColumn('order', new TableColumn({
                name: 'payment_type',
                type: 'varchar',
                length: '45',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const ifExisttt = await queryRunner.hasColumn('order', 'payment_details');
        if (!ifExisttt) {
            await queryRunner.addColumn('order', new TableColumn({
                name: 'payment_details',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('order', 'payment_type');
        await queryRunner.dropColumn('order', 'payment_details');
    }

}
