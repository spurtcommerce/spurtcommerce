import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInOrderTable1605506261235 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist3 = await queryRunner.hasColumn('order', 'customer_gst_no');
        if (!ifExist3) {
        await queryRunner.addColumn('order', new TableColumn({
                name: 'customer_gst_no',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.dropColumn('order', 'customer_gst_no');
    }

}
