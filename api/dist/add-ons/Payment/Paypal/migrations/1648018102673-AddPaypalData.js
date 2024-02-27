"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPaypalData1648018102673 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddPaypalData1648018102673 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginAdditionalInfo = {
                clientId: '',
                clientSecret: '',
                processRoute: '/paypal-payment/process',
                successRoute: '/paypal-payment/success',
                cancelRoute: '/paypal-payment/cancel',
                failureRoute: '/paypal-payment/failure',
                isTest: '',
            };
            const pluginFormInfo = {
                controls: [
                    {
                        name: 'clientId',
                        label: 'Client Id:',
                        value: '',
                        type: 'text',
                        validators: {
                            required: true,
                        },
                    },
                    {
                        name: 'clientSecret',
                        label: 'Client Secret:',
                        value: '',
                        type: 'text',
                        validators: {
                            required: true,
                        },
                    },
                    {
                        name: 'isTest',
                        label: 'Is Test:',
                        value: '',
                        type: 'checkbox',
                    },
                ],
                postRoute: '/admin-paypal-payment/update-setting',
            };
            const PaypalSeed = [
                {
                    pluginName: 'Paypal',
                    pluginAvatar: 'Img_1564650679795.png',
                    pluginAvatarPath: 'logo/',
                    pluginType: 'Payment',
                    pluginTimestamp: 1648018102673,
                    pluginAdditionalInfo: JSON.stringify(pluginAdditionalInfo),
                    pluginFormInfo: JSON.stringify(pluginFormInfo),
                    pluginStatus: 1,
                    isEditable: 1,
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeorm_1.getRepository)('Plugins').save(PaypalSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ---
        });
    }
}
exports.AddPaypalData1648018102673 = AddPaypalData1648018102673;
//# sourceMappingURL=1648018102673-AddPaypalData.js.map