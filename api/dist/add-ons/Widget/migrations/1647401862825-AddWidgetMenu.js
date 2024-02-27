"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddWidgetMenu1647401862825 = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeorm_1 = require("typeorm");
class AddWidgetMenu1647401862825 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const WidgetMenuSeed = [
                {
                    menuName: 'widgets',
                    menuModule: 'CMS',
                    path: '#/cms/widgets',
                    icon: 'banner-ico-on.svg',
                    parentId: 0,
                    status: 1,
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeorm_1.getRepository)('PluginMenu').save(WidgetMenuSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ---
        });
    }
}
exports.AddWidgetMenu1647401862825 = AddWidgetMenu1647401862825;
//# sourceMappingURL=1647401862825-AddWidgetMenu.js.map