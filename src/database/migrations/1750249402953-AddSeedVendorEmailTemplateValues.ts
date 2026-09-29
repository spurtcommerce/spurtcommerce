import { MigrationInterface, QueryRunner, In } from 'typeorm';
import { EmailTemplate } from '../../api/core/models/EmailTemplate';
import { VendorEmailTemplate } from '../../api/core/models/VendorEmailTemplate';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddSeedVendorEmailTemplateValues1750249402953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const vendorEmailTemplateRepository = getDataSource().getRepository(VendorEmailTemplate);
        const emailTemplateRepository = getDataSource().getRepository(EmailTemplate);

        const emailTemplates: EmailTemplate[] = await emailTemplateRepository.find({ select: ['title', 'emailTemplateId'], where: { isActive: 1, emailTemplateId: In([5, 6, 7, 9, 8, 25, 48, 17, 18, 19, 57, 3, 31, 32, 1, 40, 41]) } });
        if (emailTemplates.length) {
            const newVendorEmailTemplateArr = [];
            for (const emailTemplate of emailTemplates) {
                const newVendorEmailTemplate = new VendorEmailTemplate();
                newVendorEmailTemplate.title = emailTemplate.title;
                newVendorEmailTemplate.isActive = 1;
                newVendorEmailTemplate.tenantId = 11;
                newVendorEmailTemplate.emailTemplateId = emailTemplate.emailTemplateId;
                newVendorEmailTemplate.isDefault = 1;
                newVendorEmailTemplateArr.push(newVendorEmailTemplate);
            }
            await vendorEmailTemplateRepository.save(newVendorEmailTemplateArr);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
