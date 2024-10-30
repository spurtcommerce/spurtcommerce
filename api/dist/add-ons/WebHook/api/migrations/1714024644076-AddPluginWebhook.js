"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginWebhook1714024644076 = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeorm_1 = require("typeorm");
class AddPluginWebhook1714024644076 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const SeoSeed = [
                {
                    pluginName: 'WebHook',
                    slugName: 'webhook',
                    pluginAvatar: '',
                    pluginAvatarPath: '',
                    pluginTimestamp: 1714024644076,
                    pluginType: 'Utility',
                    pluginStatus: 1,
                    isEditable: 0,
                    routes: '',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeorm_1.getRepository)('Plugins').save(SeoSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddPluginWebhook1714024644076 = AddPluginWebhook1714024644076;
//# sourceMappingURL=1714024644076-AddPluginWebhook.js.map