import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateEmailTemplateContent1765201656818 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraint to prevent CASCADE DELETE issues
        const table = await queryRunner.getTable('vendor_email_template');
        const foreignKey = table?.foreignKeys.find(fk => fk.name === 'FK_email_template_vendor_email_template_id');

        if (foreignKey) {
            await queryRunner.dropForeignKey('vendor_email_template', foreignKey);
        }

        // Now truncate email_template table
        await queryRunner.query(`TRUNCATE TABLE email_template`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
