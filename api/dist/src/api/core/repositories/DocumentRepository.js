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
const Document_1 = require("../models/Document");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let DocumentRepository = class DocumentRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Document_1.Document);
    }
};
exports.DocumentRepository = DocumentRepository;
exports.DocumentRepository = DocumentRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], DocumentRepository);
//# sourceMappingURL=DocumentRepository.js.map