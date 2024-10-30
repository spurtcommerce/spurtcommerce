import {MigrationInterface, QueryRunner, getRepository} from 'typeorm';

export class CreateContatcSellerEmailTemplate1717150824531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const content = `<td style="padding: 40px 0;border-bottom: 1px solid #D8DEE3;">
        <table width=" 100%" cellpadding="0" cellspacing="0"
            role="presentation">
            <tbody>
                <tr>
                    <td style="padding-bottom: 40px;">
                        <h1
                            style="font-size: 24px;line-height: 29px;font-weight: 600;color: #1F2328;margin:0 0 12px 0;">
                            Hi
                            {firstName} {lastName},</h1>
                        <p
                            style="font-size: 16px;line-height: 24px;color: #1F2328;font-weight: normal;margin: 0;">
                            I hope this message finds you well.</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p
                            style="font-size: 14px;line-height: 24px;font-weight: normal;color: #262626;margin:0 0 20px 0 ;">
                            I am writing to inquire about purchasing some products/services from your esteemed company. Below are my detailed requirements:</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 0 0 40px 0;">
                        <table cellpadding="0" cellspacing="0"
                            role="presentation">
                            <tbody>
                                <tr>
                                    <th
                                        style="color: #262626;font-size: 14px;line-height: normal; font-weight: 600;text-align: left;padding: 4px 16px 4px 0;">
                                        Full Name:</th>
                                    <td
                                        style="font-size: 14px;line-height: normal;font-weight: normal;color: #262626;padding: 4px 0 4px 16px ;">
                                        {firstName} {lastName}
                                    </td>
                                </tr>
                                <tr>
                                    <th
                                        style="color: #262626;font-size: 14px;line-height: normal; font-weight: 600;text-align: left;padding: 4px 16px 4px 0;">
                                        Email ID:</th>
                                    <td
                                        style="font-size: 14px;line-height: normal;font-weight: normal;color: #262626;padding: 4px 0 4px 16px ;">
                                        {emailId}
                                    </td>
                                </tr>
                                <tr>
                                    <th
                                        style="color: #262626;font-size: 14px;line-height: normal; font-weight: 600;text-align: left;padding: 4px 16px 4px 0;">
                                        Phone:</th>
                                    <td
                                        style="font-size: 14px;line-height: normal;font-weight: normal;color: #262626;padding: 4px 0 4px 16px ;">
                                        {mobileNo}
                                    </td>
                                </tr>
                                <tr>
                                    <th
                                        style="color: #262626;font-size: 14px;line-height: normal; font-weight: 600;text-align: left;padding: 4px 16px 4px 0;">
                                        Pincode:</th>
                                    <td
                                        style="font-size: 14px;line-height: normal;font-weight: normal;color: #262626;padding: 4px 0 4px 16px ;">
                                        {pincode}</td>
                                </tr>
                                <tr>
                                    <th
                                        style="color: #262626;font-size: 14px;line-height: normal; font-weight: 600;text-align: left;padding: 4px 16px 4px 0;">
                                        City:</th>
                                    <td
                                        style="font-size: 14px;line-height: normal;font-weight: normal;color: #262626;padding: 4px 0 4px 16px ;">
                                        {city}</td>
                                </tr>
                                <tr>
                                    <th
                                        style="color: #262626;font-size: 14px;line-height: normal; font-weight: 600;text-align: left;padding: 4px 16px 4px 0;">
                                        State:</th>
                                    <td
                                        style="font-size: 14px;line-height: normal;font-weight: normal;color: #262626;padding: 4px 0 4px 16px ;">
                                        {state}</td>
                                </tr>
                                <tr>
                                    <th
                                        style="color: #262626;font-size: 14px;line-height: normal; font-weight: 600;text-align: left;padding: 4px 16px 4px 0;">
                                        Country:</th>
                                    <td
                                        style="font-size: 14px;line-height: normal;font-weight: normal;color: #262626;padding: 4px 0 4px 16px ;">
                                        {country}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="background-color: #F9F9FC;padding: 16px;">
                        <h2
                            style="font-size: 14px;line-height: 24px;color: #1F2328;font-weight: 600;margin:0 0 8px 0;">
                            DETAILED REQUIREMENTS:</h2>
                        <p
                            style="margin:0; color: #262626;font-size: 14px;line-height: 18px;font-weight: normal;">
                            {userRequirements}</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </td>`;
        const exist = await queryRunner.query('SELECT * FROM `email_template` WHERE `id` = ' + '"44"' );
        if (exist.length === 0) {
            const QuestionAndAnswerEmailSeed = [
                {
                    emailTemplateId: 44,
                    title: 'Seller Contact',
                    subject: 'Inquiry Regarding Purchase Requirements',
                    content,
                    isActive: 1,
                },
            ];
            await getRepository('EmailTemplate').save(QuestionAndAnswerEmailSeed);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
