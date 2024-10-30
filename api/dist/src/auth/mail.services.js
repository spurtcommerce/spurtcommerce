"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAILService = void 0;
const tslib_1 = require("tslib");
class MAILService {
    // sendMail API
    static sendMail(templateContentDetails, recipientMailId, mailSubject, bcc = false, isAttachment = false, attachmentDetails) {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const webhook = require('../../add-ons/WebHook/WebHookConfig');
            webhook.trigger('send_email', { templateContentDetails, recipientMailId, mailSubject, bcc, isAttachment, attachmentDetails });
        }));
    }
}
exports.MAILService = MAILService;
//# sourceMappingURL=mail.services.js.map