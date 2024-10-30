import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInProduct1630918993171 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExistCreatedDate = await queryRunner.hasColumn('product', 'quotation_available');
        if (!ifExistCreatedDate) {
            await queryRunner.addColumn('product', new TableColumn({
                name: 'quotation_available',
                type: 'integer',
                length: '11',
                default : 0,
                isPrimary: false,
                isNullable: false,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('product', 'quotation_available');
    }

}
