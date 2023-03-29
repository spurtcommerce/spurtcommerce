import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInCategory1581680192125 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('category', 'category_slug');
        if (!ifExist) {
            await queryRunner.addColumn('category', new TableColumn({
                name: 'category_slug',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('category', 'category_slug');
    }

}
