"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddStripeData1648122529616 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddStripeData1648122529616 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginAdditionalInfo = {
                clientId: '',
                clientSecret: '',
                processRoute: '/stripe-payment/process',
                successRoute: '/stripe-payment/success',
                cancelRoute: '/stripe-payment/cancel',
                failureRoute: '/stripe-payment/failure',
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
                postRoute: '/admin-stripe-payment/update-setting',
            };
            const StripeSeed = [
                {
                    pluginName: 'Stripe',
                    pluginAvatar: 'Img_1567002127693.png',
                    pluginAvatarPath: 'logo/',
                    pluginType: 'Payment',
                    pluginTimestamp: 1648122529616,
                    pluginAdditionalInfo: JSON.stringify(pluginAdditionalInfo),
                    pluginFormInfo: JSON.stringify(pluginFormInfo),
                    pluginStatus: 1,
                    isEditable: 1,
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeorm_1.getRepository)('Plugins').save(StripeSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ---
        });
    }
}
exports.AddStripeData1648122529616 = AddStripeData1648122529616;
//# sourceMappingURL=1648122529616-AddStripeData.js.map