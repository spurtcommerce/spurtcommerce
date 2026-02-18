"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetRepository = void 0;
const tslib_1 = require("tslib");
const Widget_1 = require("../models/Widget");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let WidgetRepository = class WidgetRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Widget_1.Widget);
    }
    widgetSlug(data, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.manager.createQueryBuilder(Widget_1.Widget, 'widget');
            query.select(['widget.widget_id as widgetId', 'widget.widget_slug_name as widgetSlugName', 'widget.widget_title as widgetTitle']);
            query.where('widget.widget_title = :value', { value: data });
            if (id !== 0) {
                query.andWhere('widget.widget_id != :id', { id });
            }
            return query.getRawMany();
        });
    }
};
exports.WidgetRepository = WidgetRepository;
exports.WidgetRepository = WidgetRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], WidgetRepository);
//# sourceMappingURL=WidgetRepository.js.map