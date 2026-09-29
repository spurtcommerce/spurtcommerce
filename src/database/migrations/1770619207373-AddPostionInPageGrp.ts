import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPostionInPageGrp1770619207373 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('page_group');

        const positionColumn = table?.findColumnByName('position');
        if (!positionColumn) {
            await queryRunner.addColumn(
                'page_group',
                new TableColumn({
                    name: 'position',
                    type: 'int',
                    isNullable: true,
                    default: 0,
                })
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
