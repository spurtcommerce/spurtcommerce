"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmapUpdateSettingColumn1676697134335 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class GmapUpdateSettingColumn1676697134335 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginAdditionalInfo = {
                clientId: '',
                clientSecret: '',
                defaultRoute: '/CustomerAddress/add-address',
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
                postRoute: '/admin-gmap/update-setting',
            };
            const GmapSeed = [
                {
                    pluginName: 'gmap',
                    pluginAvatar: 'Img_1564575414973.png',
                    pluginAvatarPath: '/logo',
                    pluginType: 'Gmap',
                    pluginTimestamp: 1676697134335,
                    pluginAdditionalInfo: JSON.stringify(pluginAdditionalInfo),
                    pluginFormInfo: JSON.stringify(pluginFormInfo),
                    pluginStatus: 1,
                    isEditable: 1,
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeorm_1.getRepository)('Plugins').save(GmapSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ---
        });
    }
}
exports.GmapUpdateSettingColumn1676697134335 = GmapUpdateSettingColumn1676697134335;
//# sourceMappingURL=1676697134335-GmapUpdateSettingColumn.js.map