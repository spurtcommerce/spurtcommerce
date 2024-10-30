import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInOrder1555507207067 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('order', 'order_prefix_id');
        if (!ifExist) {
        await queryRunner.addColumn('order', new TableColumn({
                name: 'order_prefix_id',
                type: 'varchar',
                length: '45',
                isPrimary: false,
                isNullable: true,
               }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('order', 'order_prefix_id');
    }
}
