"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddGmailData1648273222013 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddGmailData1648273222013 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginAdditionalInfo = {
                clientId: '',
                clientSecret: '',
                defaultRoute: '/gmail-login',
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
                            required: false,
                        },
                    },
                    {
                        name: 'isTest',
                        label: 'Is Test:',
                        value: '',
                        type: 'checkbox',
                    },
                ],
                postRoute: '/admin-gmail/update-setting',
            };
            const GmailSeed = [
                {
                    pluginName: 'Gmail',
                    pluginAvatar: 'Img_1564575462680.jpeg',
                    pluginAvatarPath: '/logo',
                    pluginType: 'Oauth',
                    pluginTimestamp: 1648273222013,
                    pluginAdditionalInfo: JSON.stringify(pluginAdditionalInfo),
                    pluginFormInfo: JSON.stringify(pluginFormInfo),
                    pluginStatus: 1,
                    isEditable: 1,
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeorm_1.getRepository)('Plugins').save(GmailSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ---
        });
    }
}
exports.AddGmailData1648273222013 = AddGmailData1648273222013;
//# sourceMappingURL=1648273222013-AddGmailData.js.map