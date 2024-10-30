"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebHookClientController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const WebHookAuthChecker_1 = require("../../../auth/WebHookAuthChecker");
const ejs_1 = tslib_1.__importDefault(require("ejs"));
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
const nodemailer_smtp_transport_1 = tslib_1.__importDefault(require("nodemailer-smtp-transport"));
const env_1 = require("../../../../../src/env");
const path = tslib_1.__importStar(require("path"));
const fs = require("fs");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
const CountryService_1 = require("../../../../../src/api/core/services/CountryService");
let WebHookClientController = class WebHookClientController {
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
    webHookClient(response, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const params = payload.params;
            const sendMail = yield this.sendMail(params.templateContentDetails, params.recipientMailId, params.mailSubject, params.bcc, params.isAttachment, params.attachmentDetails);
            if (sendMail) {
                if (params.attachmentDetails.length > 0) {
                    params.attachmentDetails.map(file => {
                        return fs.unlinkSync(file.path);
                    });
                }
                return response.status(200).send('EVENT OK');
            }
        });
    }
    sendMail(templateContentDetails, recipientMailId, mailSubject, bcc = false, isAttachment = false, attachmentDetails) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const transporter = nodemailer_1.default.createTransport((0, nodemailer_smtp_transport_1.default)({
                    host: env_1.mail.HOST,
                    port: env_1.mail.PORT,
                    secure: env_1.mail.SECURE,
                    auth: {
                        user: env_1.mail.AUTH.user,
                        pass: env_1.mail.AUTH.pass,
                    },
                }));
                function getBaseUrl(url) {
                    const urlObj = new URL(url);
                    return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname.split('/').slice(0, -1).join('/')}`;
                }
                templateContentDetails.baseUrl = env_1.env.baseUrl;
                templateContentDetails.productInfo = (_a = templateContentDetails.productInfo) !== null && _a !== void 0 ? _a : [];
                const countryService = typedi_1.default.get(CountryService_1.CountryService);
                const country = yield countryService.findOne({ where: { countryId: templateContentDetails.logo.countryId } });
                templateContentDetails.logo.countryName = (_b = country === null || country === void 0 ? void 0 : country.name) !== null && _b !== void 0 ? _b : '';
                templateContentDetails.logoBaseUrl = getBaseUrl(env_1.env.baseUrl);
                templateContentDetails.regardsRequired = templateContentDetails.regardsRequired === 0 ? 0 : 1;
                const emailPath = path.join(process.cwd(), 'views', templateContentDetails.templateName === 'invoice-order' ? 'invoice-order.ejs' : 'emailTemplates.ejs');
                const templatPath = templateContentDetails.templateName === 'abandonedCartTemplate.ejs' ? path.join(process.cwd(), 'views', 'abandonedCartTemplate.ejs') : emailPath;
                ejs_1.default.renderFile(templatPath, templateContentDetails, (err, data) => {
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
                                from: env_1.mail.FROM,
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
                                from: env_1.mail.FROM,
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
            }));
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.UseBefore)(WebHookAuthChecker_1.WebHookAuthChecker),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WebHookClientController.prototype, "webHookClient", null);
WebHookClientController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/webhook-client'),
    tslib_1.__metadata("design:paramtypes", [])
], WebHookClientController);
exports.WebHookClientController = WebHookClientController;
//# sourceMappingURL=WebHookClientController.js.map