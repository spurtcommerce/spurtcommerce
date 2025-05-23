import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddCollumnCategoryTable1747824069232 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('category', 'family_id');

        if (!columnExist) {
            await queryRunner.addColumn('category', new TableColumn({
                name: 'family_id',
                type: 'int',
                default: 0,
                isPrimary: false,
                isNullable: false,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
