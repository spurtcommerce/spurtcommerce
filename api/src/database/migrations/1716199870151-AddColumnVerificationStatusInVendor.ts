import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnVerificationStatusInVendor1716199870151 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const columnExist1 = await queryRunner.hasColumn('vendor', 'verification');

        if (!columnExist1) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'verification',
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
