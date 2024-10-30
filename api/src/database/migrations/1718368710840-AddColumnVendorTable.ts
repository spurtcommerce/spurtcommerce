import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnVendorTable1718368710840 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('vendor', 'is_email_verify');
        if (!columnExist) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'is_email_verify',
                type: 'tinyint',
                default: 0,
                isPrimary: false,
                isNullable: false,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
