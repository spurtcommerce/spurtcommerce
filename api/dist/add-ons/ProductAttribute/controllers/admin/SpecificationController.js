"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const Specification_1 = require("../../models/Specification");
const CreateSpecificationRequest_1 = require("./requests/CreateSpecificationRequest");
const SpecificationService_1 = require("../../../ProductAttribute/services/SpecificationService");
const SpecificationToAttributeGroupService_1 = require("../../../ProductAttribute/services/SpecificationToAttributeGroupService");
const SpecificationToAttributeGroup_1 = require("../../../ProductAttribute/models/SpecificationToAttributeGroup");
// import { CreateSpecificationToAttributeGroup } from './requests/CreateSpecificationToAttributeRequest';
const typeorm_1 = require("typeorm");
const ProductToSpecificationService_1 = require("../../services/ProductToSpecificationService");
const CategoryPathService_1 = require("../../../../src/api/core/services/CategoryPathService");
const SpecificationToCategoryService_1 = require("../../services/SpecificationToCategoryService");
const SpecificationToCategory_1 = require("../../models/SpecificationToCategory");
const SpecificationAttributeGrpToAttribute_1 = require("../../models/SpecificationAttributeGrpToAttribute");
const SpecificationAttrGrpToAttributeService_1 = require("../../services/SpecificationAttrGrpToAttributeService");
// import { Attribute } from '../../models/Attribute';
// import { AttributeService } from '../../services/AttributeService';
let SpecificationController = class SpecificationController {
    constructor(specificationService, specificationToAttributeGroupService, productToSpecificationService, categoryPathService, specificationToCategoryService, specificationAttrGrpToAttribute
    // private attributeService: AttributeService
    ) {
        this.specificationService = specificationService;
        this.specificationToAttributeGroupService = specificationToAttributeGroupService;
        this.productToSpecificationService = productToSpecificationService;
        this.categoryPathService = categoryPathService;
        this.specificationToCategoryService = specificationToCategoryService;
        this.specificationAttrGrpToAttribute = specificationAttrGrpToAttribute;
        // --
    }
    Attributelist(limit, offset, count, keyword, categoryIds, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // const select = [
            //     'Specification.id as id',
            //     'Specification.name as name',
            //     'Specification.slug as slug',
            //     'Specification.isActive as isActive',
            // ];
            // const sort = [{
            //     name: 'Specification.createdDate',
            //     order: 'DESC',
            // }];
            // const whereConditions = [
            //     {
            //         op: 'where',
            //         name: 'Specification.isDelete',
            //         value: 0,
            //     },
            // ];
            // const relations = [
            //     {
            //         op: 'left-select',
            //         tableName: 'Specification.attributeGroups',
            //         aliasName: 'attributeGroups',
            //     },
            //     {
            //         op: 'left-select',
            //         tableName: 'attributeGroups.attributes',
            //         aliasName: 'attributes',
            //     },
            //     // {
            //     //     op: 'left-select',
            //     //     tableName: 'attributes.attributeValues',
            //     //     aliasName: 'attributeValues',
            //     // },
            // ];
            const condition = {};
            if (limit) {
                condition.take = limit;
                if (offset) {
                    condition.skip = offset;
                }
            }
            const whereCondition = {};
            if (keyword === null || keyword === void 0 ? void 0 : keyword.trim()) {
                whereCondition.name = (0, typeorm_1.Like)(`%${keyword}%`);
            }
            if (categoryIds === null || categoryIds === void 0 ? void 0 : categoryIds.trim()) {
                const categoryidsNum = categoryIds.split(',').map((categoryId) => Number(categoryId));
                const specificationDetails = yield this.specificationToCategoryService.find({
                    where: {
                        categoryId: (0, typeorm_1.In)(categoryidsNum),
                    },
                });
                const specIds = specificationDetails.map((spec) => spec.specificationId);
                whereCondition.id = (0, typeorm_1.In)(specIds);
            }
            whereCondition.isDelete = 0;
            condition.where = whereCondition;
            condition.relations = ['attributeGroups', 'attributeGroups.attributes', 'attributeGroups.attributes.attributeValues'];
            condition.order = {
                createdDate: 'DESC',
            };
            const specificationList = yield this.specificationService.find(condition);
            // await this.specificationService.listByQueryBuilder(limit, offset, [], whereConditions, [], relations, [], sort, false, false);
            return response.status(200).send({
                status: 1,
                messge: 'Successfully got Specification List.',
                data: count ? specificationList.length : specificationList
                    .map((specification) => {
                    const attributeGroupCount = specification.attributeGroups.length;
                    const attributeCount = (specification.attributeGroups
                        .map((attributeGroup) => attributeGroup.attributes.length))
                        .reduce((acc, curr) => acc + curr, 0);
                    // delete specification.attributeGroups;
                    return Object.assign(Object.assign({}, specification), { attributeCount, attributeGroupCount });
                }),
            });
        });
    }
    createSpecificationToCategory(payload, response) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (payload.length) {
                for (const specCate of payload) {
                    for (const specId of (_a = specCate.specificationIds) !== null && _a !== void 0 ? _a : []) {
                        const specToCategory = new SpecificationToCategory_1.SpecificationToCategory();
                        specToCategory.categoryId = specCate.categoryId;
                        specToCategory.specificationId = specId;
                        yield this.specificationToCategoryService.create(specToCategory);
                    }
                    if ((_b = specCate.deleteSpecificationIds) === null || _b === void 0 ? void 0 : _b.length) {
                        yield this.specificationToCategoryService.delete({ categoryId: specCate.categoryId, specificationId: (0, typeorm_1.In)(specCate.deleteSpecificationIds) });
                    }
                }
            }
            return response.status(200).send({
                status: 1,
                message: `Successfully Updated Specification To Category.`,
            });
        });
    }
    getCategoryListSpecification(response, limit, offset, status, keyword, sortOrder, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'CategoryPath.categoryId as categoryId',
                'category.sortOrder as sortOrder',
                'category.parentInt as parentInt',
                'category.name as name',
                'category.image as image',
                'category.imagePath as imagePath',
                'category.isActive as isActive',
                'category.createdDate as createdDate',
                'GROUP_CONCAT' + '(' + 'path.name' + ' ' + 'ORDER BY' + ' ' + 'CategoryPath.level' + ' ' + 'SEPARATOR' + " ' " + '>' + " ' " + ')' + ' ' + 'as' + ' ' + 'levels',
            ];
            const relations = [
                {
                    tableName: 'CategoryPath.category',
                    aliasName: 'category',
                },
                {
                    tableName: 'CategoryPath.path',
                    aliasName: 'path',
                },
            ];
            const groupBy = [
                {
                    name: 'CategoryPath.category_id',
                },
            ];
            const whereConditions = [];
            if (status || status === 0) {
                whereConditions.push({
                    name: 'category.isActive',
                    op: 'where',
                    value: status,
                });
            }
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['category.name'],
                    value: keyword,
                });
            }
            const sort = [];
            if (sortOrder) {
                sort.push({
                    name: 'sortOrder',
                    order: sortOrder === 2 ? 'DESC' : 'ASC',
                });
            }
            else {
                sort.push({
                    name: 'createdDate',
                    order: 'DESC',
                });
            }
            const categoryLists = yield this.categoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            if (count) {
                return response.status(200).send({
                    status: 1,
                    message: `Successfully Got Specfication Category Count.`,
                    data: categoryLists.length,
                });
            }
            const categorySpec = yield Promise.all(categoryLists.map((category) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const specificationIds = (yield this.specificationToCategoryService.find({
                    where: {
                        categoryId: category.categoryId,
                    },
                }))
                    .map((specToCategory) => specToCategory.specificationId);
                const specifications = yield this.specificationService.find({
                    where: {
                        id: (0, typeorm_1.In)(specificationIds),
                    },
                });
                return Object.assign(Object.assign({}, category), { specifications });
            })));
            return response.status(200).send({
                status: 1,
                message: `Successfully Got Specfication Category List.`,
                data: categorySpec,
            });
        });
    }
    getAttribute(id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // const specification = await this.specificationService.findOne(
            //     {
            //         where: { id, isDelete: 0 },
            //         relations: ['attributeGroups', 'attributeGroups.attributes', 'attributeGroups.attributes.attributeValues'],
            //     }
            // );
            // if (!specification) {
            //     const errorResponse: any = {
            //         status: 0,
            //         message: 'Invalid Specification Id',
            //     };
            //     return response.status(400).send(errorResponse);
            // }
            // const successResponse: any = {
            //     status: 1,
            //     message: 'Successfully Got Specification',
            //     data: specification.attributeGroups.map((attrbuteGroup) => ({
            //         id: attrbuteGroup.id,
            //         name: attrbuteGroup.name,
            //         sortOrder: attrbuteGroup.sortOrder,
            //         isActive: attrbuteGroup.isActive,
            //         isDelete: attrbuteGroup.isDelete,
            //         attributes: attrbuteGroup.attributes.map((attribute) => ({
            //             id: attribute.id,
            //             name: attribute.name,
            //             type: attribute.type,
            //             sortOrder: attribute.sortOrder,
            //             isMandatory: attribute.isMandatory,
            //             useAsFilter: attribute.useAsFilter,
            //             isActive: attribute.isActive,
            //             isDelete: attribute.isDelete,
            //             attributeValues: attribute.attributeValues.map((attributeValue) => ({
            //                 id: attributeValue.id,
            //                 value: attributeValue.value,
            //                 isActive: attributeValue.isActive,
            //                 isDelete: attributeValue.isDelete,
            //             })),
            //         })),
            //     })),
            // };
            // return response.status(200).send(successResponse);
            const specification = yield this.specificationService.findOne({
                where: {
                    id,
                },
            });
            if (!specification) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Specification Id',
                };
                return response.status(400).send(errorResponse);
            }
            const specificationDetails = yield this.specificationToAttributeGroupService.find({
                where: {
                    specificationId: specification.id,
                },
                relations: ['attributes', 'attributes.attributeValues'],
            });
            // const specAttrGrpAttrDetail = specificationDetails.map(async (specificationDetail) => {
            //     const attrDetail = await this.specificationAttrGrpToAttribute.find({
            //         where: {
            //             id: specificationDetail.id
            //         }
            //     })
            // })
            return response.status(200).send({
                status: 1,
                message: `Successfully Got Specification.`,
                data: Object.assign(Object.assign({}, specification), { attributeGroups: specificationDetails }),
            });
        });
    }
    createSpecification(response, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const specification = new Specification_1.Specification();
            specification.name = payload.name;
            specification.isActive = payload.status ? 1 : 0;
            specification.slug = yield this.validate_slug(payload.name.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.':*?<>{}]/g, '').toLowerCase());
            const specSave = yield this.specificationService.create(specification);
            // const specAttributeGroups: SpecificationToAttributeGroup[] = [];
            for (const attributeGroup of payload.attributeGroup) {
                const specificationToAttributeGroup = new SpecificationToAttributeGroup_1.SpecificationToAttributeGroup();
                specificationToAttributeGroup.specificationId = specSave.id;
                specificationToAttributeGroup.attributeGroupId = attributeGroup.attributeGroupId;
                const specificationToAttributeGroupSave = yield this.specificationToAttributeGroupService.create(specificationToAttributeGroup);
                for (const attributeId of attributeGroup.attributeIds) {
                    const specificationToAttributeGrpToAttr = new SpecificationAttributeGrpToAttribute_1.SpecificationAttrGrpToAttribute();
                    specificationToAttributeGrpToAttr.attributeId = attributeId;
                    specificationToAttributeGrpToAttr.specAttrGrpId = specificationToAttributeGroupSave.id;
                    yield this.specificationAttrGrpToAttribute.create(specificationToAttributeGrpToAttr);
                }
            }
            const specificationDetails = yield this.specificationService.findOne({
                where: {
                    id: specSave.id,
                },
            });
            const specificationDetail = yield this.specificationToAttributeGroupService.find({
                where: {
                    specificationId: specSave.id,
                },
                relations: ['attributes'],
            });
            return response.status(200).send({
                status: 1,
                message: `Successfully Created Specification.`,
                data: Object.assign(Object.assign({}, specificationDetails), { attributeGroups: specificationDetail }),
            });
        });
    }
    updateSpecification(id, response, payload) {
        var _a, _b, _c;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const spec = yield this.specificationService.findOne({
                where: {
                    id,
                },
            });
            if (!spec) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid Specification Id.`,
                });
            }
            spec.name = payload.name;
            spec.isActive = payload.status;
            spec.slug = yield this.validate_slug(payload.name.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.':*?<>{}]/g, '').toLowerCase());
            const specSave = yield this.specificationService.create(spec);
            // Delete Attrbute Group from Specification
            if ((_a = payload.deleteAttributeGroupIds) === null || _a === void 0 ? void 0 : _a.length) {
                yield this.specificationToAttributeGroupService.delete({ specificationId: specSave.id, attributeGroupId: (0, typeorm_1.In)(payload.deleteAttributeGroupIds) });
            }
            if ((_b = payload.deleteAttributes) === null || _b === void 0 ? void 0 : _b.length) {
                for (const attribute of payload.deleteAttributes) {
                    const specAttrGrpDetail = yield this.specificationToAttributeGroupService.findOne({
                        where: {
                            attributeGroupId: attribute.attributeGroupId,
                            specificationId: id,
                        },
                    });
                    yield this.specificationAttrGrpToAttribute.delete({ specAttrGrpId: specAttrGrpDetail.id, attributeId: (0, typeorm_1.In)(attribute.attributeIds) });
                }
            }
            for (const attributeGroup of (_c = payload.attributeGroup) !== null && _c !== void 0 ? _c : []) {
                const specificationToAttributeGroup = new SpecificationToAttributeGroup_1.SpecificationToAttributeGroup();
                specificationToAttributeGroup.specificationId = specSave.id;
                specificationToAttributeGroup.attributeGroupId = attributeGroup.attributeGroupId;
                const specificationToAttributeGroupSave = yield this.specificationToAttributeGroupService.create(specificationToAttributeGroup);
                for (const attributeId of attributeGroup.attributeIds) {
                    const specificationToAttributeGrpToAttr = new SpecificationAttributeGrpToAttribute_1.SpecificationAttrGrpToAttribute();
                    specificationToAttributeGrpToAttr.attributeId = attributeId;
                    specificationToAttributeGrpToAttr.specAttrGrpId = specificationToAttributeGroupSave.id;
                    yield this.specificationAttrGrpToAttribute.create(specificationToAttributeGrpToAttr);
                }
            }
            const specificationDetails = yield this.specificationService.findOne({
                where: {
                    id: specSave.id,
                },
            });
            const specificationDetail = yield this.specificationToAttributeGroupService.find({
                where: {
                    specificationId: specSave.id,
                },
                relations: ['attributes'],
            });
            return response.status(200).send({
                status: 1,
                message: `Successfully Created Specification.`,
                data: Object.assign(Object.assign({}, specificationDetails), { attributeGroups: specificationDetail }),
            });
        });
    }
    // @Post('/attribute-group')
    // public async mapAttributeGroupToSpec(@Res() response: any, @Body({ validate: true }) payload: CreateSpecificationToAttributeGroup): Promise<any> {
    //     const specAttributeGroups: SpecificationToAttributeGroup[] = [];
    //     for (const specAttributeGroup of payload.specificationAttributeGroups) {
    //         for (const attributeGroupId of specAttributeGroup.attributeGroupIds) {
    //             const specificaationToAttributeGroup = new SpecificationToAttributeGroup();
    //             specificaationToAttributeGroup.specificationId = specAttributeGroup.specificationId;
    //             specificaationToAttributeGroup.attributeGroupId = attributeGroupId;
    //             specAttributeGroups.push(specificaationToAttributeGroup);
    //         }
    //     }
    //     await this.specificationToAttributeGroupService.bulkCreate(specAttributeGroups);
    //     return response.status(200).send({
    //         status: 1,
    //         message: `Successfully added specification to attribute group..!!`,
    //     });
    // }
    deleteSpecification(response, specId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.specificationService.softDelete({ id: specId });
            yield this.specificationToAttributeGroupService.delete({ specificationId: specId });
            yield this.productToSpecificationService.delete({ specificationId: specId });
            return response.status(200).send({
                status: 1,
                message: `Successfully deleted Specification..!`,
            });
        });
    }
    // @Delete('/:id/attribute-group/:groupIds')
    // public async deleteSpecToAttrGroup(@Res() response: any, @Param('id') specId: number, @Param('groupIds') groupIds: string): Promise<any> {
    //     const groupIdsNum = (groupIds.split(',')).map((id) => Number(id));
    //     await this.specificationToAttributeGroupService.delete({ specificationId: specId, attributeGroupId: In(groupIdsNum) });
    //     return response.status(200).send({
    //         status: 1,
    //         message: `Successfully deleted Spec to Attribute Group!`,
    //     });
    // }
    validate_slug($slug, $id = 0, $count = 0) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const slugCount = yield this.specificationService.checkSlug($slug, $id, $count);
            if (slugCount) {
                if (!$count) {
                    $count = 1;
                }
                else {
                    $count++;
                }
                return yield this.validate_slug($slug, $id, $count);
            }
            else {
                if ($count > 0) {
                    $slug = $slug + $count;
                }
                return $slug;
            }
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)()
    // @Authorized()
    ,
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('categoryIds')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SpecificationController.prototype, "Attributelist", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/category'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SpecificationController.prototype, "createSpecificationToCategory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/category'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('sortOrder')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number, Number, Number, String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], SpecificationController.prototype, "getCategoryListSpecification", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SpecificationController.prototype, "getAttribute", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, CreateSpecificationRequest_1.CreateSpecification]),
    tslib_1.__metadata("design:returntype", Promise)
], SpecificationController.prototype, "createSpecification", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, CreateSpecificationRequest_1.CreateSpecification]),
    tslib_1.__metadata("design:returntype", Promise)
], SpecificationController.prototype, "updateSpecification", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], SpecificationController.prototype, "deleteSpecification", null);
SpecificationController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/specification'),
    tslib_1.__metadata("design:paramtypes", [SpecificationService_1.SpecificationService,
        SpecificationToAttributeGroupService_1.SpecificationToAttributeGroupService,
        ProductToSpecificationService_1.ProductToSpecificationService,
        CategoryPathService_1.CategoryPathService,
        SpecificationToCategoryService_1.SpecificationToCategoryService,
        SpecificationAttrGrpToAttributeService_1.SpecificationAttrGrpToAttributeService
        // private attributeService: AttributeService
    ])
], SpecificationController);
exports.SpecificationController = SpecificationController;
//# sourceMappingURL=SpecificationController.js.map