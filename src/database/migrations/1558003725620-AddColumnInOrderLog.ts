import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInOrderLog1558003725620 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('order_log', 'order_prefix_id');
        if (!ifExist) {
        await queryRunner.addColumn('order_log', new TableColumn({
            name: 'order_prefix_id',
            type: 'varchar',
            length: '45',
            isPrimary: false,
            isNullable: true,
             }));
       }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('order_log', 'order_prefix_id');
    }
}
