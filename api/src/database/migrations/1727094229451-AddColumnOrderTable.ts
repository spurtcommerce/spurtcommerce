import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnOrderTable1727094229451 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnCheck = await queryRunner.hasColumn('order', 'payment_mobile_number');
        if (!columnCheck) {
            await queryRunner.addColumn('order', new TableColumn(
                {
                    name: 'payment_mobile_number',
                    type: 'varchar',
                    length: '30',
                    isPrimary: false,
                    isNullable: false,
                    default: false,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
