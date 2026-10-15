import { Authorized, Get, JsonController, Param, QueryParam, Res, Post, Body, Put, Req, Delete } from 'routing-controllers';
import { SpecificationService } from '../../../api/core/services/SpecificationService';
import { SpecificationToCategoryService } from '../../../api/core/services/SpecificationToCategoryService';
import { Specification } from '../../../api/core/models/Specification';
import { FindManyOptions, In, Like } from 'typeorm';
import { SpecificationToAttributeGroupService } from '../../core/services/SpecificationToAttributeGroupService';
import { CreateSpecification } from './requests/CreateSpecificationRequest';
import { SpecificationToAttributeGroup } from '../../../api/core/models/SpecificationToAttributeGroup';
import { ProductToSpecificationService } from '../../core/services/ProductToSpecificationService';
import { CategoryPathService } from '../../../../src/api/core/services/CategoryPathService';
import { SpecificationToCategory } from '../../../api/core/models/SpecificationToCategory';
import { SpecificationAttrGrpToAttribute } from '../../../api/core/models/SpecificationAttributeGrpToAttribute';
import { SpecificationAttrGrpToAttributeService } from '../../core/services/SpecificationAttrGrpToAttributeService';
import { FamilyService } from '../../../api/core/services/FamilyService';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-specification')
export class VendorSpecificationController {
    constructor(
        private specificationService: SpecificationService,
        private specificationToCategoryService: SpecificationToCategoryService,
        private specificationToAttributeGroupService: SpecificationToAttributeGroupService,
        private productToSpecificationService: ProductToSpecificationService,
        private categoryPathService: CategoryPathService,
        private specificationAttrGrpToAttribute: SpecificationAttrGrpToAttributeService,
        private familyService: FamilyService
    ) {
        // --
    }

    // Specification List API
    /**
     * @api {get} /api/vendor-specification Specification list API
     * @apiGroup Vendor Specification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count
     * @apiParam (Request body) {Number} keyword keyword
     * @apiParam (Request body) {Number} categoryIds categoryIds
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "messge": "Successfully got Specification List.",
     *    "data": [
     *        {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "modifiedBy": 1,
     *            "modifiedDate": "",
     *            "id": 1,
     *            "name": "",
     *            "slug": "",
     *            "isActive": 1,
     *            "isDelete": 0,
     *            "attributeGroups": [
     *                {
     *                    "createdBy": 1,
     *                    "createdDate": "",
     *                    "modifiedBy": 1,
     *                    "modifiedDate": "",
     *                    "id": 1,
     *                    "name": "",
     *                    "sortOrder": 1,
     *                    "isActive": 1,
     *                    "isDelete": 1,
     *                    "attributes": [
     *                        {
     *                            "createdBy": 1,
     *                            "createdDate": "",
     *                            "modifiedDate": "",
     *                            "modifiedBy": 1,
     *                            "type": "",
     *                            "sortOrder": 1,
     *                            "isMandatory": 1,
     *                            "description": "",
     *                            "label": "",
     *                            "useAsFilter": "",
     *                            "sectionName": "",
     *                            "defaultValue": 1,
     *                            "isActive": 1,
     *                            "isDelete": 0,
     *                            "attributeValues": [
     *                                {
     *                                    "createdBy": 1,
     *                                    "createdDate": "",
     *                                    "modifiedBy": 1,
     *                                    "modifiedDate": "",
     *                                    "id": 1,
     *                                    "attributeId": 1,
     *                                    "value": "",
     *                                    "isActive": 1,
     *                                    "isDelete": 0
     *                                }
     *                            ]
     *                        }
     *                    ]
     *                }
     *            ],
     *            "attributeCount": 1,
     *            "attributeGroupCount": 1
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/specification
     * @apiErrorExample {json} Specification error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get()
    @Authorized(['vendor', 'list-vendor-product-specification'])
    public async Specificationlist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @QueryParam('keyword') keyword: string, @QueryParam('categoryIds') categoryIds: string, @Res() response: any, @Req() request: any): Promise<any> {

        const condition: FindManyOptions<Specification> = {};

        if (limit) {
            condition.take = limit;

            if (offset) {
                condition.skip = offset;
            }
        }

        const whereConditions: any = {};
        whereConditions.isActive = 1;
        whereConditions.tenantId = request.user.tenantId;
        if (keyword?.trim()) {
            whereConditions.name = Like(`%${keyword}%`);
        }

        if (categoryIds?.trim()) {

            const categoryidsNum = categoryIds.split(',').map((categoryId) => Number(categoryId));

            const specificationDetails = await this.specificationToCategoryService.find({
                where: {
                    categoryId: In(categoryidsNum),
                },
            });

            const specIds = specificationDetails.map((spec) => spec.specificationId);

            whereConditions.id = In(specIds);
        }

        whereConditions.isDelete = 0;
        whereConditions.attributeGroups = {
            isDelete: 0,
        };

        condition.where = whereConditions;

        condition.relations = ['attributeGroups', 'attributeGroups.attributes', 'attributeGroups.attributes.attributeValues'];

        condition.order = {
            createdDate: 'DESC',
        };

        const specificationList = await this.specificationService.find(condition);

        return response.status(200).send({
            status: 1,
            messge: 'Successfully got vendor specification list.',
            data: count ? specificationList.length : specificationList
                .map((specification) => {

                    const attributeGroupCount = specification.attributeGroups.length;
                    const attributeCount = (specification.attributeGroups
                        .map((attributeGroup) => attributeGroup.attributes.length))
                        .reduce((acc, curr) => acc + curr, 0);

                    return { ...specification, attributeCount, attributeGroupCount };
                }),
        });
    }

    // get vendor category list
    /**
     * @api {get} /api/vendor-specification/vendor-category-list Get Vendor Category List API
     * @apiGroup Vendor Specification
     * @apiDescription This API retrieves a list of vendor categories with optional filters and pagination.
     *
     * @apiParam (Query Parameters) {Number} limit limit.
     * @apiParam (Query Parameters) {Number} offset offset.
     * @apiParam (Query Parameters) {String} keyword Keyword.
     * @apiParam (Query Parameters) {Number} familyId familyId.
     * @apiParam (Query Parameters) {Boolean} count count.
     *
     * @apiHeader {String} Authorization Bearer token is required.
     *
     * @apiParamExample {url} Request Example
     * /api/vendor-specification/vendor-category-list?limit=10&offset=0&keyword=mens&familyId=2&count=false
     *
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully got the vendor category list",
     *   "data": [
     *     {
     *       "categoryId": "",
     *       "sortOrder": "",
     *       "parentInt": "",
     *       "categoryName": "",
     *       "levels": ""
     *     }
     *   ]
     * }
     *
     * @apiSampleRequest /api/vendor-specification/vendor-category-list
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Failed to fetch vendor category list"
     * }
     */

    @Get('/vendor-category-list')
    @Authorized(['vendor', 'list-product-attribute'])
    public async vendorCategoryListbyGroup(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('familyId') familyId: number, @QueryParam('count') count: boolean, @Req() request: any, @Res() response: any): Promise<any> {

        const select = [
            'CategoryPath.categoryId as categoryId',
            'category.sortOrder as sortOrder',
            'category.parentInt as parentInt',
            'category.name as categoryName',
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

        const whereConditions = [
            {
                name: 'category.tenantId',
                op: 'and',
                value: request.user.tenantId,
            },
        ];

        if (familyId || familyId === 0) {
            whereConditions.push({
                name: 'category.familyId',
                op: 'and',
                value: familyId,
            });
        }

        const sort = [
            {
                name: 'category.category_id',
                order: 'DESC',
            },
        ];
        const vendorCategoryList: any = await this.categoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, [], relations, groupBy, sort, false, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the vendor category list',
            data: vendorCategoryList,
        };
        return response.status(200).send(successResponse);
    }

    // Specification List API
    /**
     * @api {get} /api/specification Specification list API
     * @apiGroup Admin Specification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count
     * @apiParam (Request body) {Number} keyword keyword
     * @apiParam (Request body) {Number} categoryIds categoryIds
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "messge": "Successfully got Specification List.",
     *    "data": [
     *        {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "modifiedBy": 1,
     *            "modifiedDate": "",
     *            "id": 1,
     *            "name": "",
     *            "slug": "",
     *            "isActive": 1,
     *            "isDelete": 0,
     *            "attributeGroups": [
     *                {
     *                    "createdBy": 1,
     *                    "createdDate": "",
     *                    "modifiedBy": 1,
     *                    "modifiedDate": "",
     *                    "id": 1,
     *                    "name": "",
     *                    "sortOrder": 1,
     *                    "isActive": 1,
     *                    "isDelete": 1,
     *                    "attributes": [
     *                        {
     *                            "createdBy": 1,
     *                            "createdDate": "",
     *                            "modifiedBy": 1,
     *                            "modifiedDate": "",
     *                            "id": 1,
     *                            "name": "",
     *                            "type": "",
     *                            "sortOrder": 1,
     *                            "isMandatory": 1,
     *                            "description": "",
     *                            "label": "",
     *                            "useAsFilter": 1,
     *                            "sectionName": "",
     *                            "defaultValue": 1,
     *                            "isActive": 1,
     *                            "isDelete": 0,
     *                            "attributeValues": [
     *                                {
     *                                    "createdBy": 1,
     *                                    "createdDate": "",
     *                                    "modifiedBy": 1,
     *                                    "modifiedDate": "",
     *                                    "id": 1,
     *                                    "attributeId": 1,
     *                                    "value": "",
     *                                    "isActive": 1,
     *                                    "isDelete": 0
     *                                }
     *                            ]
     *                        }
     *                    ]
     *                }
     *            ],
     *            "attributeCount": 1,
     *            "attributeGroupCount": 1
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/specification
     * @apiErrorExample {json} Specification error
     * HTTP/1.1 500 Internal Server Error
     */

    // @Get()
    // @Authorized('vendor')
    // public async Specificationlist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @QueryParam('keyword') keyword: string, @QueryParam('categoryIds') categoryIds: string, @Res() response: any, request: any): Promise<any> {

    //     const condition: FindManyOptions<Specification> = {};

    //     if (limit) {
    //         condition.take = limit;

    //         if (offset) {
    //             condition.skip = offset;
    //         }
    //     }

    //     const whereConditions: any = {};

    //     if (keyword?.trim()) {
    //         whereConditions.name = Like(`%${keyword}%`);
    //     }

    //     if (categoryIds?.trim()) {

    //         const categoryidsNum = categoryIds.split(',').map((categoryId) => Number(categoryId));

    //         const specificationDetails = await this.specificationToCategoryService.find({
    //             where: {
    //                 categoryId: In(categoryidsNum),
    //             },
    //         });

    //         const specIds = specificationDetails.map((spec) => spec.specificationId);

    //         whereConditions.id = In(specIds);
    //     }

    //     whereConditions.isDelete = 0;
    //     whereConditions.tenantId = request.user.tenantId;

    //     condition.where = whereConditions;

    //     condition.relations = ['attributeGroups', 'attributeGroups.attributes', 'attributeGroups.attributes.attributeValues'];

    //     condition.order = {
    //         createdDate: 'DESC',
    //     };

    //     const specificationList = await this.specificationService.find(condition);

    //     return response.status(200).send({
    //         status: 1,
    //         messge: 'Successfully got Specification List.',
    //         data: count ? specificationList.length : specificationList
    //             .map((specification) => {

    //                 const attributeGroupCount = specification.attributeGroups.length;
    //                 const attributeCount = (specification.attributeGroups
    //                     .map((attributeGroup) => attributeGroup.attributes.length))
    //                     .reduce((acc, curr) => acc + curr, 0);

    //                 return { ...specification, attributeCount, attributeGroupCount };
    //             }),
    //     });
    // }

    // Specification List V1 API
    /**
     * @api {get} /api/specification Specification list V1 API
     * @apiGroup Admin Specification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count
     * @apiParam (Request body) {Number} keyword keyword
     * @apiParam (Request body) {Number} categoryIds categoryIds
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "messge": "Successfully got Specification List.",
     *    "data": [
     *        {
     *            "createdBy": 1,
     *            "createdDate": "",
     *            "modifiedBy": 1,
     *            "modifiedDate": "",
     *            "id": 1,
     *            "name": "",
     *            "slug": "",
     *            "isActive": 1,
     *            "isDelete": 0,
     *            "attributeGroups": [
     *                {
     *                    "createdBy": 1,
     *                    "createdDate": "",
     *                    "modifiedBy": 1,
     *                    "modifiedDate": "",
     *                    "id": 1,
     *                    "name": "",
     *                    "sortOrder": "",
     *                    "isActive": 1,
     *                    "isDelete": 0,
     *                    "attributes": [
     *                        {
     *                            "createdBy": 1,
     *                            "createdDate": "",
     *                            "modifiedBy": 1,
     *                            "modifiedDate": "",
     *                            "id": 1,
     *                            "name": "",
     *                            "type": "",
     *                            "sortOrder": 1,
     *                            "isMandatory": 1,
     *                            "description": "",
     *                            "label": "",
     *                            "useAsFilter": 1,
     *                            "sectionName": "",
     *                            "defaultValue": 1,
     *                            "isActive": 1,
     *                            "isDelete": 0,
     *                            "attributeValues": [
     *                                {
     *                                    "createdBy": 1,
     *                                    "createdDate": "",
     *                                    "modifiedBy": 1,
     *                                    "modifiedDate": "",
     *                                    "id": 1,
     *                                    "attributeId": 1,
     *                                    "value": "",
     *                                    "isActive": 1,
     *                                    "isDelete": 0
     *                                }
     *                            ]
     *                        }
     *                    ]
     *                }
     *            ],
     *            "attributeCount": 1,
     *            "attributeGroupCount": 1
     *        }
     *    ]
     *   }
     * @apiSampleRequest /api/specification
     * @apiErrorExample {json} SpecificationV1 error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/v2')
    // @Authorized()
    public async SpecificationlistV1(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @QueryParam('keyword') keyword: string, @QueryParam('categoryIds') categoryIds: string, @Res() response: any, request: any): Promise<any> {

        const condition: FindManyOptions<Specification> = {};

        if (limit) {
            condition.take = limit;

            if (offset) {
                condition.skip = offset;
            }
        }

        const whereConditions: any = {};

        if (keyword?.trim()) {
            whereConditions.name = Like(`%${keyword}%`);
        }

        if (categoryIds?.trim()) {

            const categoryidsNum = categoryIds.split(',').map((categoryId) => Number(categoryId));

            const specificationDetails = await this.specificationToCategoryService.find({
                where: {
                    categoryId: In(categoryidsNum),
                },
            });

            const specIds = specificationDetails.map((spec) => spec.specificationId);

            whereConditions.id = In(specIds);
        }

        whereConditions.isDelete = 0;
        whereConditions.tenantId = request.user.tenantId;

        condition.where = whereConditions;

        condition.relations = ['attributeGroups', 'attributeGroups.attributes', 'attributeGroups.attributes.attributeValues'];

        condition.order = {
            createdDate: 'DESC',
        };

        const specificationList = await this.specificationService.find(condition);

        return response.status(200).send({
            status: 1,
            messge: 'Successfully got Specification List.',
            data: count ? specificationList.length : specificationList
                .map((specification) => {

                    const attributeGroupCount = specification.attributeGroups.length;
                    const attributeCount = (specification.attributeGroups
                        .map((attributeGroup) => attributeGroup.attributes.length))
                        .reduce((acc, curr) => acc + curr, 0);

                    const attributes = [];

                    for (const attributeGroup of specification.attributeGroups) {
                        attributes.push(...attributeGroup.attributes);
                    }

                    delete specification.attributeGroups;

                    return { ...specification, attributes, attributeCount, attributeGroupCount };
                }),
        });
    }

    // Create Specification To Category
    /**
     * @api {put} /api/specification/category Create specification to category
     * @apiGroup Admin Specification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} categoryId categoryId
     * @apiParam (Request body) {Number} specificationIds specificationIds
     * @apiParam (Request body) {Number} deleteSpecificationIds deleteSpecificationIds
     * @apiParamExample {json} Input
     * {
     *    "categoryId": "",
     *    "specificationIds": [],
     *    "deleteSpecificationIds": []
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Updated Specification To Category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/specification/category
     * @apiErrorExample {json} Attribute error
     * HTTP/1.1 500 Internal Server Error
     */

    @Put('/category')
    @Authorized(['vendor', 'edit-vendor-specification-mapping'])
    public async createSpecificationToCategory(@Body({ validate: true }) payload: Array<{ categoryId: number, specificationIds: number[], deleteSpecificationIds: number[] }>, @Res() response: any, request: any): Promise<any> {

        if (payload.length) {
            for (const specCate of payload) {
                for (const specId of specCate.specificationIds ?? []) {
                    const specToCategory = new SpecificationToCategory();
                    specToCategory.categoryId = specCate.categoryId;
                    specToCategory.specificationId = specId;
                    await this.specificationToCategoryService.create(specToCategory);
                }

                if (specCate.deleteSpecificationIds?.length) {
                    await this.specificationToCategoryService.delete({ categoryId: specCate.categoryId, specificationId: In(specCate.deleteSpecificationIds) });
                }
            }
        }

        return response.status(200).send({
            status: 1,
            message: 'Successfully updated specification to category.',
        });
    }

    // Get Category List Specification API
    /**
     * @api {get} /api/specification/category Get category list specification API
     * @apiGroup Admin Specification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} count count
     * @apiParam (Request body) {Number} keyword keyword
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Got Specfication Category List.",
     *    "data": [
     *        {
     *            "categoryId": 1,
     *            "sortOrder": 1,
     *            "parentInt": 1,
     *            "name": "",
     *            "image": "",
     *            "imagePath": "",
     *            "isActive": 1,
     *            "createdDate": "",
     *            "levels": "",
     *            "specifications": [
     *                {
     *                    "createdBy": 1,
     *                    "createdDate": "",
     *                    "modifiedBy": 1,
     *                    "modifiedDate": "",
     *                    "id": 1,
     *                    "name": "",
     *                    "slug": "",
     *                    "isActive": 1,
     *                    "isDelete": 0
     *                }
     *            ]
     *        }
     *    ]
     * }
     * @apiSampleRequest /api/specification/category
     * @apiErrorExample {json} Specification category error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/category')
    @Authorized(['vendor', 'list-vendor-specification-mapping'])
    public async getCategoryListSpecification(@Res() response: any, @QueryParam('familyName') familyName: string, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('status') status: number, @QueryParam('keyword') keyword: string, @QueryParam('sortOrder') sortOrder: number, @QueryParam('count') count: number, @Req() request: any): Promise<any> {

        const select = [
            'CategoryPath.categoryId as categoryId',
            'category.sortOrder as sortOrder',
            'category.parentInt as parentInt',
            'category.name as name',
            'category.image as image',
            'category.imagePath as imagePath',
            'category.isActive as isActive',
            'category.createdDate as createdDate',
            'family.name as familyName',
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
            {
                tableName: 'family',
                op: 'left-cond',
                cond: 'category.family_id = family.id',
                aliasName: 'family',
            },
        ];
        const groupBy = [
            {
                name: 'CategoryPath.category_id',
            },
        ];

        const whereConditions = [
            {
                name: 'category.tenantId',
                op: 'and',
                value: request.user.tenantId,
            },
            {
                name: 'category.isActive',
                op: 'and',
                value: 1,
            },
        ];

        if (familyName && familyName !== '') {
            whereConditions.push({
                name: 'family.name',
                op: 'and',
                value: `'${familyName}'`,
            });
        }
        if (status || status === 0) {
            whereConditions.push({
                name: 'category.isActive',
                op: 'and',
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
        } else {
            sort.push({
                name: 'createdDate',
                order: 'DESC',
            });
        }
        const categoryLists = await this.categoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);

        if (count) {
            return response.status(200).send({
                status: 1,
                message: 'Successfully got specfication category count.',
                data: categoryLists.length,
            });
        }

        const categorySpec = await Promise.all(categoryLists.map(async (category) => {

            const specificationIds = (await this.specificationToCategoryService.find({
                where: {
                    categoryId: category.categoryId,
                },
            }))
                .map((specToCategory) => specToCategory.specificationId);

            const specifications = await this.specificationService.find({
                where: {
                    id: In(specificationIds),
                    isDelete: 0,
                },
            });

            return { ...category, specifications };
        }));

        return response.status(200).send({
            status: 1,
            message: 'Successfully got specfication category list.',
            data: categorySpec,
        });
    }

    // get vendor family list
    /**
     * @api {get} /api/vendor-specification/vendor-family Get Vendor Specification Family List API
     * @apiGroup Vendor Specification
     * @apiDescription This API retrieves a list of vendor specification families with optional pagination.
     *
     * @apiParam (Query Parameters) {Number} limit limit
     * @apiParam (Query Parameters) {Number} offset offset
     * @apiParam (Query Parameters) {Number} count count
     *
     * @apiHeader {String} Authorization Bearer token is required.
     *
     * @apiParamExample {url} Request Example
     * /api/vendor-specification/family?limit=10&offset=0&count=0
     *
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully created family.",
     *   "data": [
     *     {
     *       "createdBy": "",
     *       "createdDate": "",
     *       "modifiedBy": "",
     *       "modifiedDate": "",
     *       "id": "",
     *       "familyName": "",
     *       "isActive": "",
     *       "isDelete": ""
     *     }
     *   ]
     * }
     *
     * @apiSampleRequest /api/vendor-specification/vendor-family
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Failed to fetch vendor specification family list"
     * }
     */

    @Get('/vendor-family')
    @Authorized(['vendor', 'list-product-attribute'])
    public async getFamily(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number, @Req() request: any, @Res() response: any): Promise<any> {
        const whereConditions = [
            {
                name: 'Family.tenantId',
                op: 'and',
                value: request.user.tenantId,
            },
        ];
        const sort = [
            {
                name: 'Family.createdDate',
                order: 'DESC',
            },
        ];
        const family = await this.familyService.listByQueryBuilder(limit, offset, [], whereConditions, [], [], [], sort, count);
        return response.status(200).send({
            status: 1,
            message: 'Successfully list family.',
            data: family,
        });
    }

    //   Get attribute API
    /**
     * @api {get} /api/vendor-specification/:id Get Attribute API
     * @apiGroup Vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id (Required)
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Got attribute",
     *    "data": {
     *    "createdBy": 1,
     *    "createdDate": "",
     *    "modifiedBy": 1,
     *    "modifiedDate": "",
     *    "id": 1,
     *    "name": "",
     *    "slug": "",
     *    "isActive": 1,
     *    "isDelete": 0,
     *    "attributeGroups": [
     *        {
     *            "id": 1,
     *            "specificationId": 1,
     *            "attributeGroupId": 1,
     *            "attributes": [
     *                {
     *                    "createdBy": 1,
     *                    "createdDate": "",
     *                    "modifiedBy": 1,
     *                    "modifiedDate": "",
     *                    "id": 1,
     *                    "name": "",
     *                    "type": "",
     *                    "sortOrder": 1,
     *                    "isMandatory": 1,
     *                    "description": "",
     *                    "label": "",
     *                    "useAsFilter": "",
     *                    "sectionName": "",
     *                    "defaultValue": "",
     *                    "isActive": 1,
     *                    "isDelete": 0,
     *                    "attributeValues": [
     *                        {
     *                            "createdBy": 1,
     *                            "createdDate": "",
     *                            "modifiedBy": 0,
     *                            "modifiedDate": "",
     *                            "id": 1,
     *                            "attributeId": 1,
     *                            "value": "",
     *                            "isActive": 1,
     *                            "isDelete": 0
     *                     }
     *                 ]
     *              }
     *            ]
     *         }
     *       ]
     *    }
     * }
     * @apiSampleRequest api/vendor-specification/:id
     * @apiErrorExample {json} Attribute error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/:id')
    @Authorized(['vendor', 'list-product-attribute'])
    public async getAttribute(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {

        const specification = await this.specificationService.findOne({
            where: {
                id,
                tenantId: request.user.tenantId,
            },
        });

        if (!specification) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Specification.',
            };
            return response.status(400).send(errorResponse);
        }

        const specificationDetails = await this.specificationToAttributeGroupService.find({
            where: {
                specificationId: specification.id,
            },
            relations: ['attributes', 'attributes.attributeValues'],
        });

        return response.status(200).send({
            status: 1,
            message: 'Successfully got specification.',
            data: {
                ...specification,
                attributeGroups: specificationDetails,
            },
        });
    }

    // Get Attribute API
    /**
     * @api {get} /api/specification/:id Get attribute API
     * @apiGroup Admin Specification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id (Required)
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Got Specification.",
     *    "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "id": 1,
     *        "name": "",
     *        "slug": "",
     *        "isActive": 1,
     *        "isDelete": 0,
     *        "attributeGroups": [
     *            {
     *                "id": 1,
     *                "specificationId": 1,
     *                "attributeGroupId": 1,
     *                "attributes": [
     *                    {
     *                        "createdBy": 1,
     *                        "createdDate": "",
     *                        "modifiedBy": 1,
     *                        "modifiedDate": "",
     *                        "id": 1,
     *                        "name": "",
     *                        "type": "",
     *                        "sortOrder": 1,
     *                        "isMandatory": 1,
     *                        "description": "",
     *                        "label": "",
     *                        "useAsFilter": 1,
     *                        "sectionName": "",
     *                        "defaultValue": 1,
     *                        "isActive": 1,
     *                        "isDelete": 0,
     *                        "attributeValues": [
     *                            {
     *                                "createdBy": 1,
     *                                "createdDate": "",
     *                                "modifiedBy": 1,
     *                                "modifiedDate": "",
     *                                "id": 1,
     *                                "attributeId": 1,
     *                                "value": "",
     *                                "isActive": 1,
     *                                "isDelete": 0
     *                            }
     *                        ]
     *                    }
     *                ]
     *            }
     *        ]
     *    }
     * }
     * @apiSampleRequest /api/specification/:id
     * @apiErrorExample {json} Specification attribute error
     * HTTP/1.1 500 Internal Server Error
     */

    // @Get('/:id')
    // @Authorized(['vendor'])
    // public async getAttribute(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

    //     const specification = await this.specificationService.findOne({
    //         where: {
    //             id,
    //             tenantId: request.user.tenantId,
    //         },
    //     });

    //     if (!specification) {
    //         const errorResponse: any = {
    //             status: 0,
    //             message: 'Invalid Specification Id',
    //         };
    //         return response.status(400).send(errorResponse);
    //     }

    //     const specificationDetails = await this.specificationToAttributeGroupService.find({
    //         where: {
    //             specificationId: specification.id,
    //         },
    //         relations: ['attributes', 'attributes.attributeValues'],
    //     });

    //     return response.status(200).send({
    //         status: 1,
    //         message: 'Successfully got specification.,
    //         data: {
    //             ...specification,
    //             attributeGroups: specificationDetails,
    //         },
    //     });
    // }

    // Create Specification API

    /**
     * @api {post} /api/specification Create specification API
     * @apiGroup Admin Specification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..255}} name name (Required)
     * @apiParam (Request body) {Number} status status (Required)
     * @apiParam (Request body) {Object[]} attributeGroup attributeGroup
     * @apiParam (Request body) {Number} attributeGroupId attributeGroupId
     * @apiParam (Request body) {Number} attributeIds attributeIds
     * @apiParam (Request body) {Number} deleteAttributeGroupIds deleteAttributeGroupIds
     * @apiParam (Request body) {Number} deleteAttributes deleteAttributes
     * @apiParamExample {json} Input
     * {
     *    "name": "",
     *    "status": 1,@Req() request: any
     *            "attributeIds": []
     *        }
     *    ],
     *    "deleteAttributeGroupIds": [],
     *    "deleteAttributes": []
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Vendor specification created successfully.",
     *    "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "id": 1,
     *        "name": "",
     *        "slug": "",
     *        "isActive": 1,
     *        "isDelete": 0,
     *        "attributeGroups": [
     *            {
     *                "id": 1,
     *                "specificationId": 1,
     *                "attributeGroupId": 1,
     *                "attributes": [
     *                    {
     *                        "createdBy": 1,
     *                        "createdDate": "",
     *                        "modifiedBy": 1,
     *                        "modifiedDate": "",
     *                        "id": 1,
     *                        "name": "",
     *                        "type": "",
     *                        "sortOrder": 1,
     *                        "isMandatory": 1,
     *                        "description": "",
     *                        "label": "",
     *                        "useAsFilter": "",
     *                        "sectionName": "",
     *                        "defaultValue": 1,
     *                        "isActive": 1,
     *                        "isDelete": 0
     *                    }
     *                ]
     *            }
     *        ]
     *    }
     * }
     * @apiSampleRequest /api/specification
     * @apiErrorExample {json} Specification error
     * HTTP/1.1 500 Internal Server Error
     */

    @Post()
    @Authorized(['vendor', 'create-vendor-product-specification'])
    public async createSpecification(@Res() response: any, @Body({ validate: true }) payload: CreateSpecification, @Req() request: any): Promise<any> {

        const specification = new Specification();
        specification.name = payload.name;
        specification.isActive = payload.status ? 1 : 0;
        specification.tenantId = request.user.tenantId;
        specification.slug = await this.validate_slug(payload.name.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.':*?<>{}]/g, '').toLowerCase());

        const specSave = await this.specificationService.create(specification);

        for (const attributeGroup of payload.attributeGroup) {

            const specificationToAttributeGroup = new SpecificationToAttributeGroup();
            specificationToAttributeGroup.specificationId = specSave.id;
            specificationToAttributeGroup.attributeGroupId = attributeGroup.attributeGroupId;
            specificationToAttributeGroup.tenantId = request.user.tenantId;

            const specificationToAttributeGroupSave = await this.specificationToAttributeGroupService.create(specificationToAttributeGroup);

            for (const attributeId of attributeGroup.attributeIds) {

                const specificationToAttributeGrpToAttr = new SpecificationAttrGrpToAttribute();
                specificationToAttributeGrpToAttr.attributeId = attributeId;
                specificationToAttributeGrpToAttr.specAttrGrpId = specificationToAttributeGroupSave.id;
                specificationToAttributeGrpToAttr.tenantId = request.user.tenantId;

                await this.specificationAttrGrpToAttribute.create(specificationToAttributeGrpToAttr);
            }

        }

        const specificationDetails = await this.specificationService.findOne({
            where: {
                id: specSave.id,
            },
        });

        const specificationDetail = await this.specificationToAttributeGroupService.find({
            where: {
                specificationId: specSave.id,
            },
            relations: ['attributes'],
        });

        return response.status(200).send({
            status: 1,
            message: 'Vendor specification created successfully.',
            data: {
                ...specificationDetails,
                attributeGroups: specificationDetail,
            },
        });
    }

    // Update Specification API
    /**
     * @api {put} /api/specification/:id Update specification API
     * @apiGroup Admin Specification
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiParam (Request body) {String{..255}} name name
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Object[]} attributeGroup attributeGroup
     * @apiParam (Request body) {Number} attributeGroupId attributeGroupId
     * @apiParam (Request body) {Number} attributeIds attributeIds@=
     * @apiParam (Request body) {Number} deleteAttributeGroupIds deleteAttributeGroupIds
     * @apiParam (Request body) {Number} deleteAttributes deleteAttributes
     * @apiParamExample {json} Input
     * {
     *    "name": "",
     *    "status": 1,
     *    "attributeGroup": [
     *        {
     *            "attributeGroupId": 1,
     *            "attributeIds": []
     *        }
     *    ],
     *    "deleteAttributeGroupIds": [],
     *    "deleteAttributes": []
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     *     {
     *    "status": 1,
     *    "message": "Successfully Update Specification.",
     *    "data": {
     *        "createdBy": 1,
     *        "createdDate": "",
     *        "modifiedBy": 1,
     *        "modifiedDate": "",
     *        "id": 1,
     *        "name": "gae",
     *        "slug": "",
     *        "isActive": 1,
     *        "isDelete": 0,
     *        "attributeGroups": [
     *            {
     *                "id": 1,
     *                "specificationId": 1,
     *                "attributeGroupId": 1,
     *                "attributes": [
     *                    {
     *                        "createdBy": 1,
     *                        "createdDate": "",
     *                        "modifiedBy": 1,
     *                        "modifiedDate": "",
     *                        "id": 1,
     *                        "name": "",
     *                        "type": "",
     *                        "sortOrder": 1,
     *                        "isMandatory": 1,
     *                        "description": "",
     *                        "label": "",
     *                        "useAsFilter": "",
     *                        "sectionName": "",
     *                        "defaultValue": 1,
     *                        "isActive": 1,
     *                        "isDelete": 0
     *                    }
     *                ]
     *            }
     *        ]
     *    }
     * }
     * @apiSampleRequest /api/specification:id
     * @apiErrorExample {json} Specification error
     * HTTP/1.1 500 Internal Server Error
     */

    @Put('/:id')
    @Authorized(['vendor', 'edit-vendor-product-specification'])
    public async updateSpecification(@Param('id') id: number, @Res() response: any, @Body({ validate: false }) payload: CreateSpecification, @Req() request: any): Promise<any> {

        const spec = await this.specificationService.findOne({
            where: {
                id,
                tenantId: request.user.tenantId,
            },
        });

        if (!spec) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid specification ID.',
            });
        }

        spec.name = payload.name;
        spec.isActive = payload.status;
        spec.slug = await this.validate_slug(payload.name?.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.':*?<>{}]/g, '').toLowerCase());

        const specSave = await this.specificationService.create(spec);

        // Delete Attrbute Group from Specification
        if (payload.deleteAttributeGroupIds?.length) {
            await this.specificationToAttributeGroupService.delete({ specificationId: specSave.id, attributeGroupId: In(payload.deleteAttributeGroupIds) });
        }

        if (payload.deleteAttributes?.length) {
            for (const attribute of payload.deleteAttributes) {
                const specAttrGrpDetail = await this.specificationToAttributeGroupService.findOne({
                    where: {
                        attributeGroupId: attribute.attributeGroupId,
                        specificationId: id,
                    },
                });
                await this.specificationAttrGrpToAttribute.delete({ specAttrGrpId: specAttrGrpDetail.id, attributeId: In(attribute.attributeIds) });
            }
        }

        for (const attributeGroup of payload.attributeGroup ?? []) {

            const specificationToAttributeGroup = new SpecificationToAttributeGroup();
            specificationToAttributeGroup.specificationId = specSave.id;
            specificationToAttributeGroup.attributeGroupId = attributeGroup.attributeGroupId;
            specificationToAttributeGroup.tenantId = request.user.tenantId;

            const specificationToAttributeGroupSave = await this.specificationToAttributeGroupService.create(specificationToAttributeGroup);

            for (const attributeId of attributeGroup.attributeIds) {

                const specificationToAttributeGrpToAttr = new SpecificationAttrGrpToAttribute();
                specificationToAttributeGrpToAttr.attributeId = attributeId;
                specificationToAttributeGrpToAttr.specAttrGrpId = specificationToAttributeGroupSave.id;
                specificationToAttributeGrpToAttr.tenantId = request.user.tenantId;

                await this.specificationAttrGrpToAttribute.create(specificationToAttributeGrpToAttr);
            }

        }

        const specificationDetails = await this.specificationService.findOne({
            where: {
                id: specSave.id,
            },
        });

        const specificationDetail = await this.specificationToAttributeGroupService.find({
            where: {
                specificationId: specSave.id,
            },
            relations: ['attributes'],
        });

        return response.status(200).send({
            status: 1,
            message: 'Successfully update specification.',
            data: {
                ...specificationDetails,
                attributeGroups: specificationDetail,
            },
        });
    }

    // delete Specification API
    /**
     * @api {delete} /api/specification/:id Delete specification API
     * @apiGroup Admin Specification
     * @apiHeader {String} Authorization
     * @apiParam {Number} id id (Required)
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Successfully deleted Specification..!"
     * }
     * @apiSampleRequest /api/specification/:id
     * @apiErrorExample {json} Currency error
     * HTTP/1.1 500 Internal Server Error
     */

    @Delete('/:id')
    @Authorized(['vendor', 'delete-vendor-product-specification'])
    public async deleteSpecification(@Res() response: any, @Param('id') specId: number, @Req() request: any): Promise<any> {

        const spec = await this.specificationService.findOne({
            where: {
                id: specId,
                tenantId: request.user.tenantId,
            },
        });

        if (!spec) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid specification ID.',
            });
        }

        await this.specificationService.softDelete({ id: specId });
        await this.specificationToAttributeGroupService.delete({ specificationId: specId });
        await this.productToSpecificationService.delete({ specificationId: specId });

        return response.status(200).send({
            status: 1,
            message: 'Successfully deleted specification.',
        });
    }

    public async validate_slug($slug: string, $id: number = 0, $count: number = 0): Promise<string> {
        const slugCount = await this.specificationService.checkSlug($slug, $id, $count);
        if (slugCount) {
            if (!$count) {
                $count = 1;
            } else {
                $count++;
            }
            return await this.validate_slug($slug, $id, $count);
        } else {
            if ($count > 0) {
                $slug = $slug + $count;
            }
            return $slug;
        }
    }
}
