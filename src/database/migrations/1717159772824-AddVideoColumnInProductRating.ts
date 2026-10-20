import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddVideoColumnInProductRating1717159772824 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('product_rating', 'video');

        if (!columnExist) {
            await queryRunner.addColumn('product_rating', new TableColumn({
                name: 'video',
                type: 'varchar',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const columnExist1 = await queryRunner.hasColumn('product_rating', 'video_path');

        if (!columnExist1) {
            await queryRunner.addColumn('product_rating', new TableColumn({
                name: 'video_path',
                type: 'text',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
