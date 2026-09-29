import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumCustomerTable1715925455569 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('customer', 'address2');
        if (!columnExist) {
            await queryRunner.addColumn('customer', new TableColumn({
                name: 'address2',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const columnExist2 = await queryRunner.hasColumn('customer', 'landmark');
        if (!columnExist2) {
            await queryRunner.addColumn('customer', new TableColumn({
                name: 'landmark',
                type: 'varchar',
                length: '100',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
