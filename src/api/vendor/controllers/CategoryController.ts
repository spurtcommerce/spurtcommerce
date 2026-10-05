/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, Post, Put, Delete, Body, JsonController, Authorized, QueryParam, Res, Req } from 'routing-controllers';
import { instanceToPlain } from 'class-transformer';
import { CategoryService } from '../../core/services/CategoryService';
import { AddCategory } from './requests/AddCategoryRequest';
import { UpdateCategoryRequest } from './requests/UpdateCategoryRequest';
import { Category } from '../../core/models/CategoryModel';
import { CategoryPath } from '../../core/models/CategoryPath';
import { DeleteCategoryRequest } from './requests/DeleteCategoryRequest';
import { CategoryPathService } from '../../core/services/CategoryPathService';
import { S3Service } from '../../core/services/S3Service';
import { env } from '../../../env';
import { ImageService } from '../../core/services/ImageService';
import { Service } from 'typedi';
import { In } from 'typeorm';

@Service()
@JsonController('/category')
export class CategoryController {
    constructor(
        private categoryService: CategoryService,
        private categoryPathService: CategoryPathService,
        private s3Service: S3Service,
        private imageService: ImageService
    ) {
    }

    // create Category API
    /**
     * @api {post} /api/category Add Category API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..255}} name Category name
     * @apiParam (Request body) {String} [image] Category image
     * @apiParam (Request body) {Number} [parentInt] Category  parentInt
     * @apiParam (Request body) {Number{..9999}} sortOrder Category sortOrder
     * @apiParam (Request body) {Number} status Category status 1-> Active 0-> inactive
     * @apiParam (Request body) {String} categorySlug
     * @apiParam (Request body) {String} [categoryDescription] Category categoryDescription
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "image" : "",
     *      "parentInt" : "",
     *      "sortOrder" : "",
     *      "status" : "",
     *      "categoryDescription" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new Category",
     *      "status": "1",
     * *    "data": {
     *               "name": "",
     *               "parentInt": "",
     *               "sortOrder": "",
     *               "categorySlug": "",
     *               "isActive": "",
     *               "categoryDescription": "",
     *               "createdDate": "",
     *               "categoryId": ""
     *              }
     * }
     * @apiSampleRequest /api/category
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized(['vendor', 'create-categories'])
    public async addCategory(@Body({ validate: true }) category: AddCategory, @Res() response: any, @Req() request: any): Promise<Category> {

        const image = category.image;

        let name: string;
        let filePath: string;

        if (image) {
            const type = image.split(';')[0].split('/')[1];
            const availableTypes = env.availImageTypes.split(',');
            if (!availableTypes.includes(type)) {
                const errorTypeResponse: any = {
                    status: 0,
                    message: 'Only ' + env.availImageTypes + ' types are allowed',
                };
                return response.status(400).send(errorTypeResponse);
            }
            name = 'Img_' + Date.now() + '.' + type;
            filePath = 'category/';
            const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload((filePath + name), base64Data, type);
            } else {
                await this.imageService.imageUpload((filePath + name), base64Data);
            }

        }

        const newCategory = new Category();
        newCategory.name = category.name;
        newCategory.image = name;
        newCategory.imagePath = filePath;
        newCategory.parentInt = category.parentInt;
        newCategory.sortOrder = category.sortOrder;
        newCategory.industryId = category.industryId;
        newCategory.tenantId = request.user.tenantId;
        const metaTagTitle = category.categorySlug ? category.categorySlug : category.name;
        const slug = metaTagTitle.trim();
        const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        newCategory.categorySlug = await this.validate_slug(data);
        newCategory.isActive = category.status;
        newCategory.categoryDescription = category.categoryDescription ?? '';
        const categorySave: any = await this.categoryService.create(newCategory);

        const getAllPath: any = await this.categoryPathService.find({
            where: { categoryId: category.parentInt },
            order: { level: 'ASC' },
        });

        if (getAllPath.length >= 3) {
            return response.status(400).send({
                status: 1,
                message: 'Category can only be mapped up to 3 levels. More than 3 levels are not allowed.',
            });
        }

        let level = 0;
        for (const path of getAllPath) {
            const CategoryPathLoop = {} as any;
            CategoryPathLoop.categoryId = categorySave.categoryId;
            CategoryPathLoop.pathId = path.pathId;
            CategoryPathLoop.level = level;
            await this.categoryPathService.create(CategoryPathLoop);
            level++;
        }

        const newCategoryPath = {} as any;
        newCategoryPath.categoryId = categorySave.categoryId;
        newCategoryPath.pathId = categorySave.categoryId;
        newCategoryPath.level = level;
        await this.categoryPathService.create(newCategoryPath);

        return response.status(200).send({
            status: 1,
            message: 'New category created successfully.',
            data: categorySave,
        });
    }

    // Update Category API
    /**
     * @api {put} /api/category/:id Update Category API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} categoryId Category categoryId
     * @apiParam (Request body) {String} name Category name
     * @apiParam (Request body) {String} [image] Category image
     * @apiParam (Request body) {number} [parentInt] Category  parentInt
     * @apiParam (Request body) {number{..9999}} sortOrder Category sortOrder
     * @apiParam (Request body) {String} categorySlug
     * @apiParam (Request body) {Number} [status] Category status 1-> Active 0-> inactive
     * @apiParam (Request body) {String} [categoryDescription] Category categoryDescription
     * @apiParamExample {json} Input
     * {
     *      "categoryId" : "",
     *      "name" : "",
     *      "image" : "",
     *      "imagePath" : "",
     *      "parentInt" : "",
     *      "sortOrder" : "",
     *      "status" : "",
     *      "categoryDescription" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Category",
     *      "status": "1",
     *      "data":  {
     *                 "name": "",
     *                 "parentInt": "",
     *                 "sortOrder": "",
     *                 "categorySlug": "",
     *                 "isActive": "",
     *                 "categoryDescription": "",
     *                 "createdDate": "",
     *               }
     * }
     * @apiSampleRequest /api/category/:id
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id')
    @Authorized(['vendor', 'edit-categories'])
    public async updateCategory(@Body({ validate: true }) category: UpdateCategoryRequest, @Req() request: any, @Res() response: any): Promise<Category> {

        const categoryId = await this.categoryService.findOne({
            where: {
                categoryId: category.categoryId,
                tenantId: request.user.tenantId,
            },
        });
        if (!categoryId) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid category ID.',
            };
            return response.status(400).send(errorResponse);
        }
        categoryId.name = category.name;
        const image = category.image;
        if (image) {
            const type = image.split(';')[0].split('/')[1];
            const availableTypes = env.availImageTypes.split(',');
            if (!availableTypes.includes(type)) {
                const errorTypeResponse: any = {
                    status: 0,
                    message: 'Only ' + env.availImageTypes + ' types are allowed',
                };
                return response.status(400).send(errorTypeResponse);
            }
            const name = 'Img_' + Date.now() + '.' + type;
            const path = 'category/';
            const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload((path + name), base64Data, type);
            } else {
                await this.imageService.imageUpload((path + name), base64Data);
            }

            categoryId.image = name;
            categoryId.imagePath = path;
        }
        categoryId.parentInt = category.parentInt;
        categoryId.sortOrder = category.sortOrder;
        categoryId.industryId = category.industryId;
        const metaTagTitle = category.categorySlug ? category.categorySlug : category.name;
        const slug = metaTagTitle.trim();
        const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        categoryId.categorySlug = await this.validate_slug(data);
        categoryId.isActive = category.status;
        categoryId.categoryDescription = category.categoryDescription ? await this.imageService.escapeChar(category.categoryDescription) : '';
        const categorySave = await this.categoryService.create(categoryId);

        const deleteCategory = await this.categoryPathService.find({ where: { categoryId: category.categoryId } });
        for (const val of deleteCategory) {
            await this.categoryPathService.delete(val.categoryPathId);
        }

        const getAllPath: any = await this.categoryPathService.find({
            where: { categoryId: category.parentInt },
            order: { level: 'ASC' },
        });
        let level = 0;
        for (const path of getAllPath) {
            const CategoryPathLoop: any = new CategoryPath();
            CategoryPathLoop.categoryId = categorySave.categoryId;
            CategoryPathLoop.pathId = path.pathId;
            CategoryPathLoop.level = level;
            this.categoryPathService.create(CategoryPathLoop);
            level++;
        }

        const newCategoryPath = new CategoryPath();
        newCategoryPath.categoryId = categorySave.categoryId;
        newCategoryPath.pathId = categorySave.categoryId;
        newCategoryPath.level = level;
        await this.categoryPathService.create(newCategoryPath);

        if (+category.status === 0) {
            const categories = await this.categoryPathService.find({ where: { pathId: categorySave.categoryId } });
            for (const cat of categories) {
                const disableCategory = await this.categoryService.findOne({ where: { categoryId: cat.categoryId } });
                disableCategory.isActive = 0;
                await this.categoryService.create(disableCategory);
            }

        } else {
            const categories = await this.categoryPathService.find({ where: { pathId: categorySave.categoryId } });
            for (const cat of categories) {
                const disableCategory = await this.categoryService.findOne({ where: { categoryId: cat.categoryId } });
                disableCategory.isActive = 1;
                await this.categoryService.create(disableCategory);
            }
        }

        if (categorySave) {
            const successResponse: any = {
                status: 1,
                message: 'The category has been successfully updated.',
                data: instanceToPlain(categorySave),
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the category.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // delete Category API
    /**
     * @api {delete} /api/category/:id Delete Category API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} categoryId Category categoryId
     * @apiParamExample {json} Input
     * {
     *      "categoryId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Category",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/category/:id
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete()
    @Authorized(['vendor', 'delete-categories'])
    public async deleteCategory(@Body({ validate: true }) category: DeleteCategoryRequest, @Req() request: any, @Res() response: any): Promise<Category> {

        const categoryId = await this.categoryService.findOne({
            where: {
                categoryId: category.categoryId,
                tenantId: request.user.tenantId,
            },
        });
        if (!categoryId) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid category ID.',
            };
            return response.status(400).send(errorResponse);
        }
        const firstLevel = await this.categoryService.find({
            where: { parentInt: category.categoryId },
        });
        const firstLevelIds = firstLevel.map(c => c.categoryId);

        const secondLevel = firstLevelIds.length
            ? await this.categoryService.find({
                where: { parentInt: In(firstLevelIds) },
            })
            : [];
        const secondLevelIds = secondLevel.map(c => c.categoryId);

        const allIdsToDelete: any = [
            category.categoryId,
            ...firstLevelIds,
            ...secondLevelIds,
        ];

        const categoryPath: any = await this.categoryPathService.find({ where: { categoryId: In(allIdsToDelete) } });
        for (const path of categoryPath) {
            await this.categoryPathService.delete(path.categoryPathId);
        }
        const deleteCategory = await this.categoryService.delete(allIdsToDelete);
        if (!deleteCategory) {
            const successResponse: any = {
                status: 1,
                message: 'Category deleted successfully.',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the category.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Category List API
    /**
     * @api {get} /api/category Category List API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} name name
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the complete category list",
     *      "status": "1"
     *      "data":"[{
     *              "categoryId": "",
     *              "sortOrder": "",
     *              "parentInt": "",
     *              "name": "",
     *              "image": "",
     *              "imagePath": "",
     *              "isActive": "",
     *              "createdDate": "",
     *              "categorySlug": "",
     *              "levels": ""
     *               }]"
     * }
     * @apiSampleRequest /api/category
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized(['vendor', 'list-categories'])
    public async categorylist(
        @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sortOrder') sortOrder: number,
        @QueryParam('status') status: string, @QueryParam('name') name: string, @QueryParam('industryId') industryId: number, @QueryParam('count') count: number | boolean, @Res() response: any, @Req() request: any
    ): Promise<any> {

        const select = [
            'CategoryPath.categoryId as categoryId',
            'category.sortOrder as sortOrder',
            'category.parentInt as parentInt',
            'category.name as name',
            'category.industryId as industryId',
            'category.image as image',
            'category.imagePath as imagePath',
            'category.isActive as isActive',
            'category.createdDate as createdDate',
            'category.categorySlug as categorySlug',
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
                op: 'where',
                value: request.user.tenantId,
            },
        ];

        if (status && status !== '') {
            whereConditions.push({
                name: 'category.isActive',
                op: 'and',
                value: status,
            });
        }

        if (industryId) {
            whereConditions.push({
                name: 'category.industryId',
                op: 'and',
                value: industryId,
            });
        }

        const searchConditions = [];
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['category.name'],
                value: keyword,
            });
        }

        if (name?.trim()) {
            searchConditions.push({
                name: ['category.name'],
                value: name,
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
        const categoryPathList: any = await this.categoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        if (count) {
            const successResponses: any = {
                status: 1,
                message: 'Successfully got category path count.',
                data: categoryPathList.length,
            };
            return response.status(200).send(successResponses);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got category path list.',
            data: categoryPathList,
        };
        return response.status(200).send(successResponse);
    }

    // category Detail
    /**
     * @api {get} /api/category/category-detail Category Detail API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} categoryId categoryId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Category detail",
     *      "status": "1"
     *      "data":{
     *           "createdBy": "",
     *           "createdDate": "",
     *           "modifiedBy": "",
     *           "modifiedDate": "2024-05-17T12:46:35.000Z",
     *           "categoryId": 6,
     *           "name": "Mens Top Wear",
     *           "image": "Img_1715949995235.png",
     *           "imagePath": "category/",
     *           "parentInt": 304,
     *           "sortOrder": 1,
     *           "categorySlug": "mens-top-wear11111111111",
     *           "isActive": "1",
     *           "categoryDescription": ""
     *  }
     * }
     * @apiSampleRequest /api/category/category-detail
     * @apiErrorExample {json} category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/category-detail')
    @Authorized(['vendor', 'list-categories'])
    public async CategoryDetail(@QueryParam('categoryId') categoryId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const category = await this.categoryService.findOne({
            where: {
                categoryId,
                tenantId: request.user.tenantId,
            },
        });
        if (!category) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid category ID.',
            };
            return response.status(400).send(errorResponse);
        }
        const successResponse: any = {
            status: 1,
            message: 'Category details retrieved successfully.',
            data: category,
        };
        return response.status(200).send(successResponse);
    }

    public async validate_slug($slug: string, $id: number = 0, $count: number = 0): Promise<string> {
        const slugCount = await this.categoryService.checkSlug($slug, $id, $count);
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
