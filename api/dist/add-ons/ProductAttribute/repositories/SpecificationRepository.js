"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Specification_1 = require("../models/Specification");
let SpecificationRepository = class SpecificationRepository extends typeorm_1.Repository {
    checkSlugData(slug, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Specification_1.Specification, 'specification');
            query.where('specification.slug = :slug', { slug });
            if (id > 0) {
                query.andWhere('specification.id != :id', { id });
            }
            return query.getCount();
        });
    }
};
SpecificationRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(Specification_1.Specification)
], SpecificationRepository);
exports.SpecificationRepository = SpecificationRepository;
//# sourceMappingURL=SpecificationRepository.js.map