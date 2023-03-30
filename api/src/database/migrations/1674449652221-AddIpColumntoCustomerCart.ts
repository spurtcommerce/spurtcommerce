import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddIpColumntoCustomerCart1674449652221 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('customer_cart', 'ip');
        if (!ifExist) {
        await queryRunner.addColumn('customer_cart', new TableColumn({
                name: 'ip',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
        }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
