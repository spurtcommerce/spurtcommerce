import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class AlterContactUsTemplate1726470749931 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const emailData: any = await getRepository('email_template').findOne({ where: { emailTemplateId: 3 } });
        if (emailData) {
            emailData.content = `<p>Dear Admin,</p><br/><br/>
            <p style='margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px'>
             You have received a new enquiry. Here are the details: <br> Details: </p><br>
             <p><b>Name :</b> {name},<br>
             <b>bEmail:</b> {email}, <br>
             <b>Phone Number :</b> {phoneNumber}, <br>
             <b>Message :<>/b {message}.  </p><br>
             <p>Please review and respond as necessary.</p>`;
            emailData.dynamicFieldsRef = '{name},{phoneNumber},{email},{message}';
            emailData.subject = `A new enquiry through 'Contact Us'`;

            await getRepository('email_template').save(emailData);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
