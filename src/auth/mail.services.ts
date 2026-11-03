/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { HookUtil } from '../api/core/utils/HookUtil';

export class MAILService {
    // sendMail API
    public static sendMail(templateContentDetails: any, recipientMailId: string | any, mailSubject: string, bcc: boolean = false, isAttachment: boolean = false, attachmentDetails: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await HookUtil.trigger('send_email', { templateContentDetails, recipientMailId, mailSubject, bcc, isAttachment, attachmentDetails });
                resolve(true);
            } catch (error) {
                console.error('[MAILService] Failed triggering send_email:', error);
                resolve(false);
            }
        });
    }
}
