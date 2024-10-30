import { Body, JsonController, Post, Res, UseBefore } from 'routing-controllers';
import { WebHookAuthChecker } from '../../../auth/WebHookAuthChecker';
import ejs from 'ejs';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import { env, mail } from '../../../../../src/env';
import * as path from 'path';
import fs = require('fs');
import Container from 'typedi';
import { CountryService } from '../../../../../src/api/core/services/CountryService';
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
        const params: any = payload.params;
        const sendMail = await this.sendMail(params.templateContentDetails, params.recipientMailId, params.mailSubject, params.bcc, params.isAttachment, params.attachmentDetails);
        if (sendMail) {
            if (params.attachmentDetails.length > 0) {
                params.attachmentDetails.map(file => {
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
            templateContentDetails.baseUrl = env.baseUrl;
            templateContentDetails.productInfo = templateContentDetails.productInfo ?? [];
            const countryService = Container.get<CountryService>(CountryService);
            const country = await countryService.findOne({ where: { countryId: templateContentDetails.logo.countryId } });
            templateContentDetails.logo.countryName = country?.name ?? '';
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
}
