import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInCustomerGroup1571735617882 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('customer_group', 'color_code');
        if (!ifExist) {
            await queryRunner.addColumn('customer_group', new TableColumn({
                name: 'color_code',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
               }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('customer_group', 'color_code');
    }

}
