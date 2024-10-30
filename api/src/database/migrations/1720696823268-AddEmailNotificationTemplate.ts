import { EmailTemplate } from '../../api/core/models/EmailTemplate';
import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class AddEmailNotificationTemplate1720696823268 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const emailTemplateService = await getRepository(EmailTemplate);
        const newEmailTemplate = new EmailTemplate();
        newEmailTemplate.emailTemplateId = 46;
        newEmailTemplate.title = 'Notify Inventory';
        newEmailTemplate.subject = 'Immediate Action Required: Product Running Low',
            newEmailTemplate.content = `<p>Dear {name},</p>

                                        <p>We wanted to inform you that your product, <b>{productName}</b>, is nearing the end of its available stock. To avoid any potential stockouts and to ensure continuous availability to our customers, we recommend replenishing your stock at the earliest..</p>`;
        newEmailTemplate.isActive = 1;
        newEmailTemplate.dynamicFieldsRef = `{name},{productName}`;
        await emailTemplateService.save(newEmailTemplate);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
