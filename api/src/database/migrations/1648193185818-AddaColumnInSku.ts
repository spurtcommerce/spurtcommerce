import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddaColumnInSku1648193185818 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('sku', 'vendor_id');
        if (!ifExist) {
            await queryRunner.addColumn('sku', new TableColumn({
                name: 'vendor_id',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('sku', 'vendor_id');
    }
}
