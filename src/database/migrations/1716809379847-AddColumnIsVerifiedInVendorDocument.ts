import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnIsVerifiedInVendorDocument1716809379847 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist1 = await queryRunner.hasColumn('vendor_document', 'is_verified');

        if (!columnExist1) {
            await queryRunner.addColumn('vendor_document', new TableColumn({
                name: 'is_verified',
                type: 'int',
                isPrimary: false,
                isNullable: false,
                default: 0,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
