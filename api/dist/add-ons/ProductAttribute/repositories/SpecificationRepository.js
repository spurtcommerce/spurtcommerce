"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationRepository = void 0;
const tslib_1 = require("tslib");
const Specification_1 = require("../models/Specification");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let SpecificationRepository = class SpecificationRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Specification_1.Specification);
    }
    checkSlugData(slug, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.manager.createQueryBuilder(Specification_1.Specification, 'specification');
            query.where('specification.slug = :slug', { slug });
            if (id > 0) {
                query.andWhere('specification.id != :id', { id });
            }
            return query.getCount();
        });
    }
};
exports.SpecificationRepository = SpecificationRepository;
exports.SpecificationRepository = SpecificationRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], SpecificationRepository);
//# sourceMappingURL=SpecificationRepository.js.map