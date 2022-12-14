import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInPageTable1605683473618 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('page', 'slug_name');
        if (!ifExist) {
        await queryRunner.addColumn('page', new TableColumn({
                name: 'slug_name',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('page', 'slug_name');
    }

}
