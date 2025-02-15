import { sms } from '../env';
export class SMSService {

    public static async sendSMS(message: string, mobileNo: any): Promise<any> {
        const requestData = require('request');
        return new Promise((resolve, reject) => {

            const queryParams: any = {};
            queryParams.username = sms.USER_NAME;
            queryParams.sendername = sms.SENDER_NAME;
            queryParams.numbers = mobileNo;
            queryParams.message = message;
            queryParams.apikey = sms.API_KEY;
            queryParams.smstype = sms.SMS_TYPE;
            queryParams.peid = sms.PEID;
            queryParams.templateid = sms.TEMPLATE_ID;
            const options = {
                uri: sms.HOST_NAME,
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
    }
}
