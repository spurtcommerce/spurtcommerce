"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFacebookData1648273183310 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddFacebookData1648273183310 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginAdditionalInfo = {
                AppId: '',
                AppSecretKey: '',
                defaultRoute: '/facebook-login',
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
                postRoute: '/admin-facebook/update-setting',
            };
            const FacebookSeed = [
                {
                    pluginName: 'Facebook',
                    pluginAvatar: 'Img_1564575414973.png',
                    pluginAvatarPath: '/logo',
                    pluginTimestamp: 1648273183310,
                    pluginType: 'Oauth',
                    pluginAdditionalInfo: JSON.stringify(pluginAdditionalInfo),
                    pluginFormInfo: JSON.stringify(pluginFormInfo),
                    pluginStatus: 1,
                    isEditable: 1,
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeorm_1.getRepository)('Plugins').save(FacebookSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ---
        });
    }
}
exports.AddFacebookData1648273183310 = AddFacebookData1648273183310;
//# sourceMappingURL=1648273183310-AddFacebookData.js.map