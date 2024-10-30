import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInCategory1642745785011 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('category', 'category_description');
        if (!ifExist) {
        await queryRunner.addColumn('category', new TableColumn({
                name: 'category_description',
                type: 'text',
                isPrimary: false,
                isNullable: true,
               }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('category', 'category_descrpition');
    }
}
