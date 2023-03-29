/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import ejs from 'ejs';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import { mail } from '../env';
export class MAILService {
    // sendMail API
    public static sendMail(templateContentDetails: any, recipientMailId: string | any, mailSubject: string, bcc: boolean = false, isAttachment: boolean = false, attachmentDetails: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport(smtpTransport({
                host: mail.HOST,
                port: mail.PORT,
                secure: mail.SECURE,
                auth: {
                    user: mail.AUTH.user,
                    pass: mail.AUTH.pass,
                },
            }));
            ejs.renderFile('./views/emailTemplate.ejs', templateContentDetails, (err, data) => {
                if (err) {
                    throw err;
                } else {
                    let mailOptions: any;
                    const attachment = [];
                    if (isAttachment && attachmentDetails && attachmentDetails.length > 0) {
                        attachmentDetails.forEach(element => {
                            attachment.push({   // file on disk as an attachment
                                filename: element.name,
                                path: element.path, // stream this file
                            });
                        });
                    }
                    if (bcc) {
                        mailOptions = {
                            from: '"Spurtcommerce" <' + mail.FROM + '>',
                            bcc: recipientMailId,
                            cc: templateContentDetails.ccEmail ? templateContentDetails.ccEmail : '',
                            subject: mailSubject,
                            html: data,
                            // An array of attachments
                            attachments: attachment,
                        };
                    } else {
                        mailOptions = {
                            from: '"Spurtcommerce" <' + mail.FROM + '>',
                            to: recipientMailId,
                            cc: templateContentDetails.ccEmail ? templateContentDetails.ccEmail : '',
                            subject: mailSubject,
                            html: data,
                            // An array of attachments
                            attachments: attachment,
                        };
                    }
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
}
