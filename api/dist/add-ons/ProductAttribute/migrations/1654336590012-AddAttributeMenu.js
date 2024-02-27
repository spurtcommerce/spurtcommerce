"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAttributeMenu1654336590012 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddAttributeMenu1654336590012 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ProductAttributeSeed = [
                {
                    menuName: 'Attributes',
                    menuModule: 'Catalog Manage Products',
                    path: '#/catalog/manage-products/product_attribute',
                    icon: '',
                    parentId: 0,
                    status: 1,
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeorm_1.getRepository)('PluginMenu').save(ProductAttributeSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ----
        });
    }
}
exports.AddAttributeMenu1654336590012 = AddAttributeMenu1654336590012;
//# sourceMappingURL=1654336590012-AddAttributeMenu.js.map