import { Authorized, Body, Delete, Get, JsonController, Param, Post, Put, QueryParam, Req, Res } from 'routing-controllers';
import { Family } from '../../core/models/Family';
import { FamilyService } from '../../core/services/FamilyService';
import { CategoryService } from '../../core/services/CategoryService';
import { CreateFamily } from '../../../api/vendor/controllers/requests/CreateFamilyRequest';
import { CategoryPathService } from '../../core/services/CategoryPathService';
import { ProductToCategoryService } from '../../core/services/ProductToCategoryService';
import { In } from 'typeorm';
import { Service } from 'typedi';
@Service()
@JsonController('/family')
export class FamilyController {
    constructor(
        private familyService: FamilyService,
        private categoryService: CategoryService,
        private categoryPathService: CategoryPathService,
        private productToCategoryService: ProductToCategoryService
    ) {
        // --
    }

    // create family
    /**
     * @api {post} /api/family Add Family API
     * @apiGroup Family
     * @apiDescription This API allows users to add a new family.
     * @apiParam (Request body) {String} familyName "".
     * @apiParam (Request body) {Number[]} categoryIds "".
     * @apiHeader {String} Authorization Bearer token is required.
     * @apiParamExample {json} Request Example
     * {
     *   "familyName": "",
     *   "categoryIds": []
     * }
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Family has been created successfully."
     * }
     * @apiSampleRequest /api/family
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     */

    @Post()
    @Authorized(['vendor', 'create-vendor-product-family'])
    public async createFamily(@Body({ validate: true }) createFamily: CreateFamily, @Req() request: any, @Res() response: any): Promise<any> {
        const newFamily = new Family();
        newFamily.name = createFamily.familyName;
        newFamily.tenantId = request.user.tenantId;
        const savedFamily = await this.familyService.create(newFamily);

        await this.categoryService.bulkFamilyUpdate(createFamily.categoryIds, savedFamily.id);

        const successResponse: any = {
            status: 1,
            message: 'Family has been created successfully.',
        };
        return response.status(200).send(successResponse);
    }

    // update family
    /**
     * @api {put} /api/family/:id Update Family API
     * @apiGroup Family
     * @apiDescription This API allows users to update an existing family by ID.
     * @apiParam (Request body) {String} familyName "".
     * @apiParam (Request body) {Number[]} categoryIds "".
     * @apiParam (Request body) {Number[]} deleteCategoryIds "".
     * @apiParam (URL parameter) {Number} id Family ID to update.
     * @apiHeader {String} Authorization Bearer token is required.
     * @apiParamExample {json} Request Example
     * {
     *   "familyName": "",
     *   "categoryIds": [""],
     *   "deleteCategoryIds": [""]
     * }
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Family updated successfully."
     * }
     * @apiSampleRequest /api/family/:id
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     */

    @Put('/:id')
    @Authorized(['vendor', 'edit-vendor-product-family'])
    public async updateFamily(@Param('id') id: number, @Body({ validate: false }) updateFamily: CreateFamily, @Req() request: any, @Res() response: any): Promise<any> {
        const family = await this.familyService.findOne({
            where: {
                id,
                tenantId: request.user.tenantId,
            },
        });

        if (!family) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid family ID.',
            };
            return response.status(400).send(errorResponse);
        }

        family.name = updateFamily.familyName;
        if (updateFamily.categoryIds.length !== 0) {
            await this.categoryService.bulkFamilyUpdate(updateFamily.categoryIds, family.id);
        }
        if (updateFamily.deleteCategoryIds.length !== 0) {
            await this.categoryService.bulkFamilyUpdate(updateFamily.deleteCategoryIds, 0);
        }
        await this.familyService.update(family);

        const successResponse: any = {
            status: 1,
            message: 'Family updated successfully.',
        };
        return response.status(200).send(successResponse);
    }

    // get family list
    /**
     * @api {get} /api/family Get Family List API
     * @apiGroup Family
     * @apiDescription This API retrieves a list of families with optional filtering and pagination.
     * @apiParam (Query Parameters) {Number} limit Number of records to return.
     * @apiParam (Query Parameters) {Number} offset Number of records to skip.
     * @apiParam (Query Parameters) {String} keyword Keyword to filter families by name.
     * @apiParam (Query Parameters) {Number} count If set to 1, returns only the count.
     * @apiHeader {String} Authorization Bearer token is required.
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Family retrieved successfully.",
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
     * @apiSampleRequest /api/family
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     */

    @Get()
    @Authorized(['vendor', 'list-vendor-product-family'])
    public async getFamilyList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number, @Req() request: any, @Res() response: any): Promise<any> {
        const whereConditions = [
            {
                name: 'Family.tenantId',
                op: 'and',
                value: request.user.tenantId,
            },
        ];
        const searchConditions = [];
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['Family.name'],
                value: keyword,
            });
        }
        const sort = [{
            name: 'Family.createdDate',
            order: 'DESC',
        }];
        const family: any = await this.familyService.listByQueryBuilder(limit, offset, [], whereConditions, searchConditions, [], [], sort, count, false);
        if (count) {
            return response.status(200).send({
                status: 1,
                message: 'Family count retrieved successfully.',
                data: family,
            });
        }
        const category = await this.categoryService.find({});
        const result = family.map(async (value) => {
            value.categoryCount = category.filter((item) => item.familyId === value.id).length ?? 0;
            return value;
        });

        const successResponse: any = {
            status: 1,
            message: 'Family retrieved successfully.',
            data: await Promise.all(result),
        };
        return response.status(200).send(successResponse);
    }

    // Get Category List Family API
    /**
     * @api {get} /api/family/category Get category list family API
     * @apiGroup Admin Family
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} count count
     * @apiParam (Request body) {Number} keyword keyword
     * @apiParam (Request body) {Number} familyName familyName
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "status": 1,
     *    "message": "Successfully Got family Category List.",
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
     *            "familyName":"",
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
     * @apiSampleRequest /api/family/category
     * @apiErrorExample {json} family category error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/category')
    @Authorized(['vendor', 'list-product-attribute'])
    public async getCategoryListFamily(@Res() response: any, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('status') status: number, @QueryParam('keyword') keyword: string, @QueryParam('familyId') familyId: number, @QueryParam('sortOrder') sortOrder: number, @QueryParam('count') count: number, @Req() request: any): Promise<any> {

        const select = [
            'CategoryPath.categoryId as categoryId',
            'category.sortOrder as sortOrder',
            'category.parentInt as parentInt',
            'category.tenantId as tenantId',
            'category.name as categoryName',
            'category.isActive as isActive',
            'GROUP_CONCAT' + '(' + 'path.name' + ' ' + 'ORDER BY' + ' ' + 'CategoryPath.level' + ' ' + 'SEPARATOR' + " ' " + '>' + " ' " + ')' + ' ' + 'as' + ' ' + 'levels',
        ];

        const relations: any = [
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
            {
                name: 'category.isActive',
                op: 'and',
                value: 1,
            },
        ];
        if (status || status === 0) {
            whereConditions.push({
                name: 'category.isActive',
                op: 'and',
                value: status,
            });
        }
        if (familyId || familyId === 0) {
            whereConditions.push({
                name: 'category.familyId',
                op: 'and',
                value: familyId,
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
                name: 'category.sortOrder',
                order: sortOrder === 2 ? 'DESC' : 'ASC',
            });
        } else {
            sort.push({
                name: 'category.createdDate',
                order: 'DESC',
            });
        }
        const categoryLists = await this.categoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);

        if (count) {
            return response.status(200).send({
                status: 1,
                message: 'Category count retrieved successfully.',
                data: categoryLists.length,
            });
        }
        return response.status(200).send({
            status: 1,
            message: 'Category list retrieved successfully.',
            data: categoryLists,

        });
    }

    // Get family detail
    /**
     * @api {get} /api/family/:id Get family detail API
     * @apiGroup Family
     * @apiHeader {String} Authorization Bearer token is required.
     * @apiParam (Query Parameters) {Number} id id.
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Family details retrieved successfully.",
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
     * @apiSampleRequest /api/family/:id
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/:id')
    @Authorized(['vendor', 'vendor-product-family'])
    public async getFamilyDetail(@Param('id') familyId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const familyData = await this.familyService.findOne({
            where: {
                id: familyId,
                isDelete: 0,
                tenantId: request.user.tenantId,
            },
        });

        if (!familyData) {
            const errorResponse: any = {
                status: 1,
                message: 'Family not founded.',
            };
            return response.status(400).send(errorResponse);
        }

        const category = await this.categoryService.find({ where: { familyId: familyData.id } });
        const categoryValue = category.map(async (value) => {
            const categoryLevel = await this.categoryPathService.findCategoryLevel(value.categorySlug, request.user.tenantId);
            value.levels = categoryLevel.levels;
            return value;
        });

        familyData.categories = await Promise.all(categoryValue);

        const successResponse: any = {
            status: 1,
            message: 'Family details retrieved successfully.',
            data: familyData,
        };
        return response.status(200).send(successResponse);
    }

    // delete family
    /**
     * @api {delete} /api/family/:id Delete Family API
     * @apiGroup Family
     * @apiDescription This API allows users to delete a family by ID.
     * @apiParam (URL parameter) {Number} id Family ID to delete.
     * @apiHeader {String} Authorization Bearer token is required.
     * @apiParamExample {url} Request Example
     * /api/family/1
     * @apiSuccessExample {json} Success Response
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully deleted family."
     * }
     * @apiSampleRequest /api/family/:id
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     */

    @Delete('/:id')
    @Authorized(['vendor', 'delete-vendor-product-family'])
    public async deleteFamily(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {
        const family = await this.familyService.findOne({
            where: {
                id,
                tenantId: request.user.tenantId,
            },
        });

        if (!family) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid family ID.',
            };
            return response.status(400).send(errorResponse);
        }
        const categories = await this.categoryService.find({ where: { familyId: family.id } });
        const categoryIds = categories.map((category: any) => category.categoryId);

        const productCategory: any = await this.productToCategoryService.findAll({ where: { categoryId: In(categoryIds) } });
        if (productCategory.length) {
            const errorResponse: any = {
                status: 0,
                message: 'This family is mapped to a product and cannot be deleted.',
            };
            return response.status(400).send(errorResponse);
        }

        await this.categoryService.bulkFamilyUpdate(categoryIds, 0);
        await this.familyService.delete(family.id);
        const successResponse: any = {
            status: 1,
            message: 'Family deleted successfully.',
        };
        return response.status(200).send(successResponse);
    }
}
