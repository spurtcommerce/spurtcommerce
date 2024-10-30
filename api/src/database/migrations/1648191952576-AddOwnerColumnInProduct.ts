import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddOwnerColumnInProduct1648191952576 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('product', 'owner');
        if (!ifExist) {
            await queryRunner.addColumn('product', new TableColumn({
                name: 'owner',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 0,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('product', 'owner');
    }

}
