import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnOrderProductTag1727258601223 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('order_product', 'tags');

        if (!columnExist) {
            await queryRunner.addColumn('order_product', new TableColumn(
                {
                    name: 'tags',
                    type: 'text',
                    isNullable: true,
                }
            ));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
