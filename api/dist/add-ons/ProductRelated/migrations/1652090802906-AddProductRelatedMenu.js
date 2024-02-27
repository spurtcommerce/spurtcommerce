"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductRelatedMenu1652090802906 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddProductRelatedMenu1652090802906 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const BlogsSeed = [
                {
                    menuName: 'Products Related',
                    menuModule: 'catalog',
                    path: '#/catalog/related_product',
                    icon: '',
                    parentId: 0,
                    status: 1,
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeorm_1.getRepository)('PluginMenu').save(BlogsSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ---
        });
    }
}
exports.AddProductRelatedMenu1652090802906 = AddProductRelatedMenu1652090802906;
//# sourceMappingURL=1652090802906-AddProductRelatedMenu.js.map