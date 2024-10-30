import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnIsDeleteInVendorDocument1716363600120 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist1 = await queryRunner.hasColumn('vendor_document', 'is_delete');

        if (!columnExist1) {
            await queryRunner.addColumn('vendor_document', new TableColumn({
                name: 'is_delete',
                type: 'int',
                isPrimary: false,
                isNullable: false,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
