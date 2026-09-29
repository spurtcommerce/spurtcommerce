import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInCustomerTable1620989942663 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist3 = await queryRunner.hasColumn('customer', 'locked_on');
        if (!ifExist3) {
        await queryRunner.addColumn('customer', new TableColumn({
                name: 'locked_on',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('customer', 'locked_on');
    }
}
