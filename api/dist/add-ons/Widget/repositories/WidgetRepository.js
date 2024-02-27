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
const typeorm_1 = require("typeorm");
const Widget_1 = require("../models/Widget");
let WidgetRepository = class WidgetRepository extends typeorm_1.Repository {
    widgetSlug(data, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Widget_1.Widget, 'widget');
            query.select(['widget.widget_id as widgetId', 'widget.widget_slug_name as widgetSlugName', 'widget.widget_title as widgetTitle']);
            query.where('widget.widget_title = :value', { value: data });
            if (id !== 0) {
                query.andWhere('widget.widget_id != :id', { id });
            }
            return query.getRawMany();
        });
    }
};
WidgetRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(Widget_1.Widget)
], WidgetRepository);
exports.WidgetRepository = WidgetRepository;
//# sourceMappingURL=WidgetRepository.js.map