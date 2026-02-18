"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddChatIntoPluginTable1686824936626 = void 0;
const tslib_1 = require("tslib");
const Plugin_1 = require("../../../src/api/core/models/Plugin");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddChatIntoPluginTable1686824936626 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield (0, typeormLoader_1.getDataSource)().getRepository(Plugin_1.Plugins).save({
                pluginName: 'Chat',
                slugName: 'chat',
                pluginAvatar: '',
                pluginAvatarPath: '',
                pluginType: 'Marketplace',
                pluginTimestamp: 1686824936626,
                displayName: 'Chat',
                pluginStatus: 1,
                isEditable: 0,
                routes: '~/api/chat-admin/~,~/api/chat-admin/vendor-list~,~/api/chat-admin/vendor/~,~/api/chat-admin/chat-history~,~/api/chat-admin/chat-seen~,~/api/chat-admin/delete~,~/api/chat-vendor/~,~/api/chat-vendor/admin-list~,~/api/chat-vendor/delete~,~/api/chat-vendor/chat-history~',
                createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
            });
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddChatIntoPluginTable1686824936626 = AddChatIntoPluginTable1686824936626;
//# sourceMappingURL=1686824936626-AddChatIntoPluginTable.js.map