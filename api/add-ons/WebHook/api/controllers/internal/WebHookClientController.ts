import { Body, JsonController, Post, Res, UseBefore } from 'routing-controllers';
import { WebHookAuthChecker } from '../../../auth/WebHookAuthChecker';
import ejs from 'ejs';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import { env, mail, awsMailSes } from '../../../../../src/env';
import * as path from 'path';
import fs = require('fs');
import Container from 'typedi';
import { CountryService } from '../../../../../src/api/core/services/CountryService';
import { VendorCountryService } from '../../../../../src/api/core/services/VendorCountryService';
import { Service } from 'typedi';
import { SettingService } from '../../../../../src/api/core/services/SettingService';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({
    region: awsMailSes.sesAwsRegion,
    credentials: {
        accessKeyId: awsMailSes.sesAwsAccessKeyId,
        secretAccessKey: awsMailSes.sesAwsSecretAccessKey,
    },
});

@Service()
@JsonController('/webhook-client')
export class WebHookClientController {
    constructor() {
        // --
    }
    //  WebHook client API
    /**
     * @api {Post} /api/webhook-client Client API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} templateContentDetails urls
     * @apiParam (Request body) {String} event event
     * @apiParam (Request body) {String} recipientMailId recipientMailId
     * @apiParam (Request body) {Number} mailSubject mailSubject
     * @apiParam (Request body) {String} event event
     * @apiParam (Request body) {Number} isAttachment isAttachment
     * @apiParam (Request body) {String} attachmentDetails attachmentDetails
     * @apiParam (Request body) {String} bcc bcc
     * @apiSampleRequest /api/webhook-event/:id
     * @apiErrorExample {json} web HookUpdate error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @UseBefore(WebHookAuthChecker)
    public async webHookClient(@Res() response: any, @Body({ validate: true }) payload: { event: string, params: any }): Promise<any> {
        const { templateContentDetails, recipientMailId, mailSubject, bcc, isAttachment, attachmentDetails } = payload.params;
        if (!recipientMailId || !mailSubject || !templateContentDetails) {
            return response.status(400).send('Missing required parameters: recipientMailId, mailSubject, or templateContentDetails');
        }

        const setting = templateContentDetails?.setting || {};
        const hasValidSmtp =
            setting.mailDriver === 'smtp' &&
            !!setting.mailHost &&
            !!setting.mailUsername &&
            !!setting.mailPassword &&
            !!setting.mailPort &&
            !!setting.mailSecure &&
            !!setting.mailEncryption &&
            !!setting.mailFrom;
        const useVendorMail = templateContentDetails?.setting?.vendorId && templateContentDetails?.setting?.featureAccess?.custom_email_name && hasValidSmtp;
        let sendMail;
        if (useVendorMail) {
            sendMail = await this.sendMailVendor(templateContentDetails, recipientMailId, mailSubject, bcc, isAttachment, attachmentDetails);
        } else if (templateContentDetails?.setting?.vendorId && env.app.type === 'cloud') {
            sendMail = await this.sendAwsMailAdminAsVendor(templateContentDetails, recipientMailId, mailSubject);
        } else {
            sendMail = await this.sendMail(templateContentDetails, recipientMailId, mailSubject, bcc, isAttachment, attachmentDetails);
        }
        if (sendMail) {
            if (attachmentDetails.length > 0) {
                attachmentDetails.map(file => {
                    return fs.unlinkSync(file.path);
                });
            }
            return response.status(200).send('EVENT OK');
        }
    }

    public async sendMail(templateContentDetails: any, recipientMailId: string | any, mailSubject: string, bcc: boolean = false, isAttachment: boolean = false, attachmentDetails: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const transporter = nodemailer.createTransport(smtpTransport({
                host: mail.HOST,
                port: mail.PORT,
                secure: mail.SECURE,
                auth: {
                    user: mail.AUTH.user,
                    pass: mail.AUTH.pass,
                },
            }));
            function getBaseUrl(url: string): string {
                const urlObj = new URL(url);
                return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname.split('/').slice(0, -1).join('/')}`;
            }

            bcc = bcc ? true : Array.isArray(recipientMailId);
            const adminSettings = Container.get<SettingService>(SettingService);
            // const logo = await this.settingService.findOne({ where: { isActive: 1 } });
            templateContentDetails.settings = await adminSettings.findOne({ where: { isActive: 1 } });
            templateContentDetails.baseUrl = env.baseUrl;
            templateContentDetails.productInfo = templateContentDetails.productInfo ?? [];
            const countryService = Container.get<CountryService>(CountryService);
            const country = await countryService.findOne({ where: { countryId: templateContentDetails.settings.countryId } });
            templateContentDetails.settings.countryName = country?.name ?? '';
            templateContentDetails.logoBaseUrl = getBaseUrl(env.baseUrl);
            templateContentDetails.regardsRequired = templateContentDetails.regardsRequired === 0 ? 0 : 1;
            const emailPath = path.join(process.cwd(), 'views', templateContentDetails.templateName === 'invoice-order' ? 'invoice-order.ejs' : 'storeTemplate.ejs');
            const templatPath = templateContentDetails.templateName === 'abandonedCartTemplate.ejs' ? path.join(process.cwd(), 'views', 'abandonedCartTemplate.ejs') : emailPath;
            ejs.renderFile(templatPath, templateContentDetails, (err, data) => {
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
                            from: mail.FROM,
                            to: Array.isArray(recipientMailId) ? recipientMailId[0] : undefined,
                            bcc: recipientMailId,
                            cc: templateContentDetails.ccEmail ? templateContentDetails.ccEmail : '',
                            subject: mailSubject,
                            html: data,
                            // An array of attachments
                            attachments: attachment,
                        };
                    } else {
                        mailOptions = {
                            from: mail.FROM,
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

    public async sendMailVendor(templateContentDetails: any, recipientMailId: string | any, mailSubject: string, bcc: boolean = false, isAttachment: boolean = false, attachmentDetails: any): Promise<any> {
        return new Promise(async (resolve, reject) => {

            const { mailHost: host, mailPort: port, mailSecure: secure, mailUsername: user, mailPassword: pass, emailLogoName: emailLogo, storeAddressLine1: storeAddress1, storeAddressLine2: storeAddress2, companyCountryId: countryId } = templateContentDetails.setting;

            templateContentDetails.setting = { ...templateContentDetails.setting, emailLogo, storeAddress1, storeAddress2, countryId };

            const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });

            function getBaseUrl(url: string): string {
                const urlObj = new URL(url);
                return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname.split('/').slice(0, -1).join('/')}`;
            }

            bcc = bcc ? true : Array.isArray(recipientMailId);

            templateContentDetails.baseUrl = env.baseUrl;
            templateContentDetails.productInfo = templateContentDetails.productInfo ?? [];
            const vendorCountryService = Container.get<VendorCountryService>(VendorCountryService);
            const vendorCountry = await vendorCountryService.findOne({ where: { id: templateContentDetails.setting?.defaultCountry }, relations: ['country'] });
            templateContentDetails.setting.countryName = vendorCountry?.country?.name ?? '';
            templateContentDetails.logoBaseUrl = getBaseUrl(env.baseUrl);
            templateContentDetails.regardsRequired = templateContentDetails.regardsRequired === 0 ? 0 : 1;
            const emailPath = path.join(process.cwd(), 'views', templateContentDetails.templateName === 'invoice-order' ? 'invoice-order.ejs' : 'emailTemplates.ejs');
            const templatPath = templateContentDetails.templateName === 'abandonedCartTemplate.ejs' ? path.join(process.cwd(), 'views', 'abandonedCartTemplate.ejs') : emailPath;

            ejs.renderFile(templatPath, templateContentDetails, (err, data) => {
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
                            from: mail.FROM,
                            to: Array.isArray(recipientMailId) ? recipientMailId[0] : undefined,
                            bcc: recipientMailId,
                            cc: templateContentDetails.ccEmail ? templateContentDetails.ccEmail : '',
                            subject: mailSubject,
                            html: data,
                            // An array of attachments
                            attachments: attachment,
                        };
                    } else {
                        mailOptions = {
                            from: mail.FROM,
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

    public async sendAwsMailAdminAsVendor(templateContentDetails: any, recipientMailId: string | string[], mailSubject: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { emailLogoName: emailLogo, storeAddressLine1: storeAddress1, storeAddressLine2: storeAddress2, companyCountryId: countryId } = templateContentDetails.setting;

                templateContentDetails.setting = { ...templateContentDetails.setting, emailLogo, storeAddress1, storeAddress2, countryId };

                function getBaseUrl(url: string): string {
                    const urlObj = new URL(url);
                    return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname.split('/').slice(0, -1).join('/')}`;
                }

                templateContentDetails.baseUrl = env.baseUrl;
                templateContentDetails.productInfo = templateContentDetails?.productInfo ?? [];
                const vendorCountryService = Container.get<VendorCountryService>(VendorCountryService);
                const vendorCountry = await vendorCountryService.findOne({ where: { id: templateContentDetails.setting?.defaultCountry }, relations: ['country'] });
                templateContentDetails.setting.countryName = vendorCountry?.country?.name ?? '';
                templateContentDetails.logoBaseUrl = getBaseUrl(env.baseUrl);
                templateContentDetails.regardsRequired = templateContentDetails.regardsRequired === 0 ? 0 : 1;

                const emailPath = path.join(process.cwd(), 'views', templateContentDetails.templateName === 'invoice-order' ? 'invoice-order.ejs' : 'emailTemplates.ejs');
                const templatPath = templateContentDetails.templateName === 'abandonedCartTemplate.ejs' ? path.join(process.cwd(), 'views', 'abandonedCartTemplate.ejs') : emailPath;
                const companyName = templateContentDetails?.setting?.siteName?.replace(/\s+/g, '-')?.replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '')?.toLowerCase() + awsMailSes.sesFromEmail;

                ejs.renderFile(templatPath, templateContentDetails, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        const toAddress = Array.isArray(recipientMailId) ? recipientMailId[0] : recipientMailId;
                        if (!toAddress) {
                            reject(new Error('Invalid recipient email address'));
                            return;
                        }

                        const params = {
                            Source: companyName,
                            Destination: {
                                ToAddresses: [toAddress],
                            },
                            Message: {
                                Subject: {
                                    Data: mailSubject,
                                    Charset: 'UTF-8',
                                },
                                Body: {
                                    Html: {
                                        Data: data,
                                        Charset: 'UTF-8',
                                    },
                                },
                            },
                        };

                        try {
                            const command = new SendEmailCommand(params);
                            sesClient.send(command).then(resolve).catch(reject);
                        } catch (error) {
                            console.error('Error sending email:', error);
                            reject(error);
                        }
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}
