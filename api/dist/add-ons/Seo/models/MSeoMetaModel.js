"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MSeoMeta = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let MSeoMeta = class MSeoMeta {
};
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'seo_id' }),
    tslib_1.__metadata("design:type", Number)
], MSeoMeta.prototype, "seoId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'meta_tag_title' }),
    tslib_1.__metadata("design:type", String)
], MSeoMeta.prototype, "metaTagTitle", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'meta_tag_description' }),
    tslib_1.__metadata("design:type", String)
], MSeoMeta.prototype, "metaTagDescription", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'meta_tag_keyword' }),
    tslib_1.__metadata("design:type", String)
], MSeoMeta.prototype, "metaTagKeyword", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'seo_type' }),
    tslib_1.__metadata("design:type", String)
], MSeoMeta.prototype, "seoType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'ref_id' }),
    tslib_1.__metadata("design:type", Number)
], MSeoMeta.prototype, "refId", void 0);
MSeoMeta = tslib_1.__decorate([
    (0, typeorm_1.Entity)('m_seo_meta')
], MSeoMeta);
exports.MSeoMeta = MSeoMeta;
//# sourceMappingURL=MSeoMetaModel.js.map