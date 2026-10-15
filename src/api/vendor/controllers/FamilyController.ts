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

    /**
     * @api {post} /api/family Create Product Family
     * @apiGroup Family
     * @apiName CreateVendorFamily
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiBody {String} familyName          Family name
     * @apiBody {Number[]} [categoryIds]     Array of category IDs to map
     * @apiBody {Number[]} [deleteCategoryIds] Array of category IDs to unmap
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully created new family.",
     *         "data": {
     *             "id": 1,
     *             "name": "Electronics Family"
     *         }
     *     }
     *
     * @apiErrorExample {json} Duplicate-Family:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Family Name already exists."
     *     }
     *
     * @apiSampleRequest /api/family
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

    /**
     * @api {put} /api/family/:id Update Product Family
     * @apiGroup Family
     * @apiName UpdateVendorFamily
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} id          Family ID
     *
     * @apiBody {String} familyName          Family name
     * @apiBody {Number[]} [categoryIds]     Array of category IDs to map
     * @apiBody {Number[]} [deleteCategoryIds] Array of category IDs to unmap
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully updated family.",
     *         "data": {
     *             "id": 1,
     *             "name": "Updated Family"
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Family:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid family Id"
     *     }
     *
     * @apiSampleRequest /api/family/:id
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

    /**
     * @api {get} /api/family Product Family List
     * @apiGroup Family
     * @apiName GetVendorFamilyList
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiQuery {Number} [limit]            Number of records to return
     * @apiQuery {Number} [offset]           Pagination offset
     * @apiQuery {String} [keyword]          Search keyword
     * @apiQuery {Number} [count]            If true/1, returns total count
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got family list",
     *         "data": [
     *             {
     *                 "id": 1,
     *                 "name": "Electronics Family"
     *             }
     *         ]
     *     }
     *
     * @apiSampleRequest /api/family
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

    /**
     * @api {get} /api/family/category Get Family Category Attributes List
     * @apiGroup Family
     * @apiName GetCategoryListFamily
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiQuery {Number} [limit]            Number of records to return
     * @apiQuery {Number} [offset]           Pagination offset
     * @apiQuery {Number} [status]           Status filter
     * @apiQuery {String} [keyword]          Search keyword
     * @apiQuery {Number} [familyId]         Family ID
     * @apiQuery {Number} [sortOrder]        Sort order
     * @apiQuery {Number} [count]            If true/1, returns total count
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got category list",
     *         "data": []
     *     }
     *
     * @apiSampleRequest /api/family/category
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

    /**
     * @api {get} /api/family/:id Get Family Detail
     * @apiGroup Family
     * @apiName GetVendorFamilyDetail
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} id          Family ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got family details.",
     *         "data": {
     *             "id": 1,
     *             "name": "Electronics Family"
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Family:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid family Id"
     *     }
     *
     * @apiSampleRequest /api/family/:id
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

    /**
     * @api {delete} /api/family/:id Delete Product Family
     * @apiGroup Family
     * @apiName DeleteVendorFamily
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} id          Family ID to delete
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully deleted family."
     *     }
     *
     * @apiErrorExample {json} Invalid-Family:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid family Id"
     *     }
     *
     * @apiSampleRequest /api/family/:id
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
