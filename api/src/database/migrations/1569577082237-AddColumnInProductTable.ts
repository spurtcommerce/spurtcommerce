import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInProductTable1569577082237 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('product', 'keywords');
        if (!ifExist) {
            await queryRunner.addColumn('product', new TableColumn({
                name: 'keywords',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
               }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('product', 'keywords');
    }

}
