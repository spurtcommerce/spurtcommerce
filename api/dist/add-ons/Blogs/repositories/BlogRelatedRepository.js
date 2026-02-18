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
const BlogRelated_1 = require("../models/BlogRelated");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let BlogRelatedRepository = class BlogRelatedRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(BlogRelated_1.BlogRelated);
    }
};
exports.BlogRelatedRepository = BlogRelatedRepository;
exports.BlogRelatedRepository = BlogRelatedRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], BlogRelatedRepository);
//# sourceMappingURL=BlogRelatedRepository.js.map