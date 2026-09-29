import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddForignKeyForVendorEmailTemplate1750250440954 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('vendor_email_template', new TableForeignKey({
            columnNames: ['email_template_id'],
            referencedTableName: 'email_template',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            name: 'FK_email_template_vendor_email_template_id',
        })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
