import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddVendorColumn1697697385554 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('vendor', 'whatsapp');
        if (!ifExist) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'whatsapp',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const ifExistColumn = await queryRunner.hasColumn('vendor', 'ifsc_code');
        if (!ifExistColumn) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'ifsc_code',
                type: 'VARCHAR',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('vendor', 'whatsapp');
        await queryRunner.dropColumn('vendor', 'ifsc_code');
    }

}
