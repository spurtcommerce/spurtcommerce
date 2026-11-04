import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnBannerTable1793709986496 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'banner',
            new TableColumn({
                name: 'is_mini_banner',
                type: 'int',
                default: 0,
                isNullable: false,
            })
        );

        await queryRunner.addColumn(
            'banner',
            new TableColumn({
                name: 'image_type',
                type: 'int',
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
