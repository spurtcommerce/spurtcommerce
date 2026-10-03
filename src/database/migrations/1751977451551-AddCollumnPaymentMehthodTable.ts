import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCollumnPaymentMehthodTable1751977451551 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('payment_method', new TableColumn({
            name: 'created_by',
            type: 'int',
            length: '11',
            isPrimary: false,
            isNullable: true,
        }));

        await queryRunner.addColumn('payment_method', new TableColumn({
            name: 'modified_by',
            type: 'int',
            length: '11',
            isPrimary: false,
            isNullable: true,
        }));

        await queryRunner.addColumn('payment_method', new TableColumn({
            name: 'modified_date',
            type: 'DATETIME',
            isPrimary: false,
            isNullable: true,
            default: 'CURRENT_TIMESTAMP',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
