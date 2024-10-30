import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddingColumnInBanner1644837174266 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('banner', 'link_type');
        if (!ifExist) {
            await queryRunner.addColumn('banner', new TableColumn({
                name: 'link_type',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 0,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('banner', 'link_type');
    }

}
