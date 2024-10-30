"use strict";
/*
 * spurtcommerce API
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Document_1 = require("../models/Document");
let DocumentRepository = class DocumentRepository extends typeorm_1.Repository {
};
DocumentRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(Document_1.Document)
], DocumentRepository);
exports.DocumentRepository = DocumentRepository;
//# sourceMappingURL=DocumentRepository.js.map