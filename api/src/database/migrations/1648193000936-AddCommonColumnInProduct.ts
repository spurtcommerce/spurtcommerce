import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddCommonColumnInProduct1648193000936 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('product', 'is_common');
        if (!ifExist) {
            await queryRunner.addColumn('product', new TableColumn({
                name: 'is_common',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 0,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('product', 'is_common');
    }
}
