"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSeoMenu1665120872278 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddSeoMenu1665120872278 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const SeoSeed = [
                {
                    menuName: 'Seo',
                    menuModule: 'CMS',
                    path: '#/cms/manage-seo/seo',
                    icon: '',
                    parentId: 0,
                    status: 1,
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeorm_1.getRepository)('PluginMenu').save(SeoSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ----
        });
    }
}
exports.AddSeoMenu1665120872278 = AddSeoMenu1665120872278;
//# sourceMappingURL=1665120872278-AddSeoMenu.js.map