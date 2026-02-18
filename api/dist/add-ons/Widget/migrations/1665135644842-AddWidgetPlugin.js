"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddWidgetPlugin1665135644842 = void 0;
const tslib_1 = require("tslib");
const moment = require("moment/moment");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddWidgetPlugin1665135644842 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const SeoSeed = [
                {
                    pluginName: 'Widget',
                    slugName: 'widget',
                    pluginAvatar: '',
                    pluginAvatarPath: '',
                    pluginTimestamp: 1665135644842,
                    pluginType: 'CMS',
                    displayName: 'Promotional Widgets',
                    pluginStatus: 1,
                    isEditable: 0,
                    routes: '~/api/widget~,~/api/widget/~,~/api/widget/widget-count~,~/api/widget/widget-detail~,~/api/widget/productlist~,~/api/list/widget-list~,~/api/list/widget-detail/~',
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeormLoader_1.getDataSource)().getRepository('Plugins').save(SeoSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ---
        });
    }
}
exports.AddWidgetPlugin1665135644842 = AddWidgetPlugin1665135644842;
//# sourceMappingURL=1665135644842-AddWidgetPlugin.js.map