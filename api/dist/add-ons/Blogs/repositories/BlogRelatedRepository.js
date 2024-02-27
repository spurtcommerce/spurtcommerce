"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRelatedRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BlogRelated_1 = require("../models/BlogRelated");
let BlogRelatedRepository = class BlogRelatedRepository extends typeorm_1.Repository {
};
BlogRelatedRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(BlogRelated_1.BlogRelated)
], BlogRelatedRepository);
exports.BlogRelatedRepository = BlogRelatedRepository;
//# sourceMappingURL=BlogRelatedRepository.js.map