import {MigrationInterface, QueryRunner, getRepository} from 'typeorm';

export class AddVendorEmailVerification1716880934372 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const exist = await queryRunner.hasTable('email_template');
        if (exist) {
            const templateStyle = `<p>Dear {name},</p> \n<br>\n<p>Click the below link to verify your account.</p>\n<br><a href= {link}>Click Here</a>\n<p>Regards,</p>`;
            const changeMailSeed = [{
                emailTemplateId: 42,
                title: 'Vendor Email Verification',
                subject: 'Email Verification',
                dynamicFieldsRef: '{name},{link}',
                content: templateStyle,
                isActive: 1,
            },
            ];
            await getRepository('email_template').save(changeMailSeed);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
