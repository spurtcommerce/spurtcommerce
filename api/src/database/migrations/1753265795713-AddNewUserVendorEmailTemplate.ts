import { EmailTemplate, Vendor, VendorEmailTemplate } from '../../common/entities-index';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddNewUserVendorEmailTemplate1753265795713 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const vendorEmailTemplateRepository = getDataSource().getRepository(VendorEmailTemplate);
        const emailTemplateRepository = getDataSource().getRepository(EmailTemplate);
        const vendorServiceRepository = getDataSource().getRepository(Vendor);

        await queryRunner.query('TRUNCATE TABLE vendor_email_template;');

        const vendorDetail = await vendorServiceRepository.findOne({ select: ['vendorId'], where: { appId: 'sp_124e507c3c4d46e69413' } });
        if (vendorDetail) {
            const emailTemplates: EmailTemplate[] = await emailTemplateRepository.find({});
            if (emailTemplates.length) {
                const newVendorEmailTemplateArr = [];
                for (const emailTemplate of emailTemplates) {
                    const newVendorEmailTemplate = new VendorEmailTemplate();
                    newVendorEmailTemplate.title = emailTemplate.title;
                    newVendorEmailTemplate.isActive = 1;
                    newVendorEmailTemplate.tenantId = vendorDetail.vendorId;
                    newVendorEmailTemplate.emailTemplateId = emailTemplate.emailTemplateId;
                    newVendorEmailTemplate.isDefault = 1;
                    newVendorEmailTemplateArr.push(newVendorEmailTemplate);
                }
                await vendorEmailTemplateRepository.save(newVendorEmailTemplateArr);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
