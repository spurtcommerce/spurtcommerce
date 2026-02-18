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
const WidgetItem_1 = require("../models/WidgetItem");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let WidgetItemRepository = class WidgetItemRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(WidgetItem_1.WidgetItem);
    }
    findProduct(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.manager.createQueryBuilder(WidgetItem_1.WidgetItem, 'widgetItem');
            query.select(['widgetItem.id as id']);
            query.innerJoin('widgetItem.widget', 'widget');
            query.where('widgetItem.refId = :productId', { productId });
            query.andWhere('widget.widgetLinkType = :value1', { value1: 2 });
            return query.getRawMany();
        });
    }
    findCategory(categoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.manager.createQueryBuilder(WidgetItem_1.WidgetItem, 'widgetItem');
            query.select(['widgetItem.id as id']);
            query.innerJoin('widgetItem.widget', 'widget');
            query.where('widgetItem.refId = :categoryId', { categoryId });
            query.andWhere('widget.widgetLinkType = :value1', { value1: 1 });
            return query.getRawMany();
        });
    }
};
exports.WidgetItemRepository = WidgetItemRepository;
exports.WidgetItemRepository = WidgetItemRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], WidgetItemRepository);
//# sourceMappingURL=WidgetItemRepository.js.map