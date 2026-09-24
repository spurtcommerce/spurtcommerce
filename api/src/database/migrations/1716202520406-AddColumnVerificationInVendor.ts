import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnVerificationInVendor1716202520406 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const columnExist2 = await queryRunner.hasColumn('vendor', 'verification_comment');

        if (!columnExist2) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'verification_comment',
                type: 'json',
                isPrimary: false,
                isNullable: false,
            }));
        }

        const columnExist3 = await queryRunner.hasColumn('vendor', 'verification_detail_comment');

        if (!columnExist3) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'verification_detail_comment',
                type: 'json',
                isPrimary: false,
                isNullable: false,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
