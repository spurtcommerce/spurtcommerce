"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductAttributeMenu1651493128935 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddProductAttributeMenu1651493128935 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const BlogsSeed = [
                {
                    menuName: 'Products Attribute',
                    menuModule: 'catalog',
                    path: '#/catalog/product_attribute',
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
            // ----
        });
    }
}
exports.AddProductAttributeMenu1651493128935 = AddProductAttributeMenu1651493128935;
//# sourceMappingURL=1651493128935-AddProductAttributeMenu.js.map