"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetItemRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const WidgetItem_1 = require("../models/WidgetItem");
let WidgetItemRepository = class WidgetItemRepository extends typeorm_1.Repository {
    findProduct(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(WidgetItem_1.WidgetItem, 'widgetItem');
            query.select(['widgetItem.id as id']);
            query.innerJoin('widgetItem.widget', 'widget');
            query.where('widgetItem.refId = :productId', { productId });
            query.andWhere('widget.widgetLinkType = :value1', { value1: 2 });
            return query.getRawMany();
        });
    }
    findCategory(categoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(WidgetItem_1.WidgetItem, 'widgetItem');
            query.select(['widgetItem.id as id']);
            query.innerJoin('widgetItem.widget', 'widget');
            query.where('widgetItem.refId = :categoryId', { categoryId });
            query.andWhere('widget.widgetLinkType = :value1', { value1: 1 });
            return query.getRawMany();
        });
    }
};
WidgetItemRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(WidgetItem_1.WidgetItem)
], WidgetItemRepository);
exports.WidgetItemRepository = WidgetItemRepository;
//# sourceMappingURL=WidgetItemRepository.js.map