"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAILService = void 0;
const tslib_1 = require("tslib");
/*
 * spurtcommerce API
 * version 4.8.2
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
const ejs_1 = tslib_1.__importDefault(require("ejs"));
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
const nodemailer_smtp_transport_1 = tslib_1.__importDefault(require("nodemailer-smtp-transport"));
const env_1 = require("../env");
class MAILService {
    // sendMail API
    static sendMail(templateContentDetails, recipientMailId, mailSubject, bcc = false, isAttachment = false, attachmentDetails) {
        return new Promise((resolve, reject) => {
            var _a;
            const transporter = nodemailer_1.default.createTransport((0, nodemailer_smtp_transport_1.default)({
                host: env_1.mail.HOST,
                port: env_1.mail.PORT,
                secure: env_1.mail.SECURE,
                auth: {
                    user: env_1.mail.AUTH.user,
                    pass: env_1.mail.AUTH.pass,
                },
            }));
            templateContentDetails.baseUrl = env_1.env.baseUrl;
            ejs_1.default.renderFile(`${(_a = templateContentDetails.templateName) !== null && _a !== void 0 ? _a : './views/emailTemplate.ejs'}`, templateContentDetails, (err, data) => {
                if (err) {
                    throw err;
                }
                else {
                    let mailOptions;
                    const attachment = [];
                    if (isAttachment && attachmentDetails && attachmentDetails.length > 0) {
                        attachmentDetails.forEach(element => {
                            attachment.push({
                                filename: element.name,
                                path: element.path, // stream this file
                            });
                        });
                    }
                    if (bcc) {
                        mailOptions = {
                            from: '"Spurtcommerce" <' + env_1.mail.FROM + '>',
                            bcc: recipientMailId,
                            cc: templateContentDetails.ccEmail ? templateContentDetails.ccEmail : '',
                            subject: mailSubject,
                            html: data,
                            // An array of attachments
                            attachments: attachment,
                        };
                    }
                    else {
                        mailOptions = {
                            from: '"Spurtcommerce" <' + env_1.mail.FROM + '>',
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
                        }
                        else {
                            resolve(info);
                        }
                    });
                }
            });
        });
    }
}
exports.MAILService = MAILService;
//# sourceMappingURL=mail.services.js.map