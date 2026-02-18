"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantValueService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Logger_1 = require("../../../src/decorators/Logger");
const VariantValueRepository_1 = require("../repositories/VariantValueRepository");
let VariantValueService = class VariantValueService {
    constructor(variantValueRepository, log) {
        this.variantValueRepository = variantValueRepository;
        this.log = log;
    }
    // create a data
    create(Data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('create a data');
            return this.variantValueRepository.repository.save(Data);
        });
    }
    // findone a data
    findOne(id) {
        this.log.info('Find a data');
        return this.variantValueRepository.repository.findOne(id);
    }
    // findone a data
    findOneData(data) {
        this.log.info('Find a data');
        return this.variantValueRepository.repository.findOne(data);
    }
    // find condition
    find(option) {
        return this.variantValueRepository.repository.find(option);
    }
    // delete VariantValue
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a VariantValue');
            yield this.variantValueRepository.repository.delete(id);
            return;
        });
    }
    bulkDelete(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a VariantValue');
            return yield this.variantValueRepository.repository.delete(payload);
        });
    }
};
exports.VariantValueService = VariantValueService;
exports.VariantValueService = VariantValueService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [VariantValueRepository_1.VariantValueRepository, Object])
], VariantValueService);
//# sourceMappingURL=VariantValueService.js.map