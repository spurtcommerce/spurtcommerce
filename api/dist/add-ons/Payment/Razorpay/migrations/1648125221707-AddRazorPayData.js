"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRazorPayData1648125221707 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddRazorPayData1648125221707 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginAdditionalInfo = {
                clientId: '',
                clientSecret: '',
                processRoute: '/razorpay-payment/process',
                successRoute: '/razorpay-payment/success',
                cancelRoute: '/razorpay-payment/cancel',
                failureRoute: '/razorpay-payment/failure',
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
                postRoute: '/admin-razor-pay-payment/update-setting',
            };
            const RazorPaySeed = [
                {
                    pluginName: 'Razorpay',
                    pluginAvatar: 'Img_1567002487693.png',
                    pluginAvatarPath: 'logo/',
                    pluginType: 'Payment',
                    pluginTimestamp: 1648125221707,
                    pluginAdditionalInfo: JSON.stringify(pluginAdditionalInfo),
                    pluginFormInfo: JSON.stringify(pluginFormInfo),
                    pluginStatus: 1,
                    isEditable: 1,
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeorm_1.getRepository)('Plugins').save(RazorPaySeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ---
        });
    }
}
exports.AddRazorPayData1648125221707 = AddRazorPayData1648125221707;
//# sourceMappingURL=1648125221707-AddRazorPayData.js.map