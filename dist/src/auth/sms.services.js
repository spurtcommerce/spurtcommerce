"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMSService = void 0;
const tslib_1 = require("tslib");
const env_1 = require("../env");
class SMSService {
    static sendSMS(message, mobileNo) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const requestData = require('request');
            return new Promise((resolve, reject) => {
                const queryParams = {};
                queryParams.username = env_1.sms.USER_NAME;
                queryParams.sendername = env_1.sms.SENDER_NAME;
                queryParams.numbers = mobileNo;
                queryParams.message = message;
                queryParams.apikey = env_1.sms.API_KEY;
                queryParams.smstype = env_1.sms.SMS_TYPE;
                queryParams.peid = env_1.sms.PEID;
                queryParams.templateid = env_1.sms.TEMPLATE_ID;
                const options = {
                    uri: env_1.sms.HOST_NAME,
                    method: 'GET',
                    qs: queryParams,
                    json: true,
                };
                requestData(options, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    console.log('response :::' + JSON.stringify(data));
                    resolve(data);
                });
            });
        });
    }
}
exports.SMSService = SMSService;
//# sourceMappingURL=sms.services.js.map