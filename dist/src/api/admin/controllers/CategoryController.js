"use strict";
/*
 * spurtcommerce API
 * version 4.8.2
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const class_transformer_1 = require("class-transformer");
const CategoryService_1 = require("../../core/services/CategoryService");
const AddCategoryRequest_1 = require("./requests/AddCategoryRequest");
const UpdateCategoryRequest_1 = require("./requests/UpdateCategoryRequest");
const CategoryModel_1 = require("../../core/models/CategoryModel");
const CategoryPath_1 = require("../../core/models/CategoryPath");
const array_to_tree_1 = tslib_1.__importDefault(require("array-to-tree"));
const DeleteCategoryRequest_1 = require("./requests/DeleteCategoryRequest");
const CategoryPathService_1 = require("../../core/services/CategoryPathService");
const ProductToCategoryService_1 = require("../../core/services/ProductToCategoryService");
const S3Service_1 = require("../../core/services/S3Service");
const env_1 = require("../../../env");
const ImageService_1 = require("../../core/services/ImageService");
const fs = tslib_1.__importStar(require("fs"));
let CategoryController = class CategoryController {
    constructor(categoryService, productToCategoryService, categoryPathService, s3Service, imageService) {
        this.categoryService = categoryService;
        this.productToCategoryService = productToCategoryService;
        this.categoryPathService = categoryPathService;
        this.s3Service = s3Service;
        this.imageService = imageService;
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
     *      "message": "Successfully created new Category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/category
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    addCategory(category, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newCategory = new CategoryModel_1.Category();
            console.log('category:', category);
            newCategory.name = category.name;
            const image = category.image;
            if (image) {
                const type = image.split(';')[0].split('/')[1];
                const availableTypes = env_1.env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse = {
                        status: 0,
                        message: 'Only ' + env_1.env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const name = 'Img_' + Date.now() + '.' + type;
                const path = 'category/';
                const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const stringLength = image.replace(/^data:image\/\w+;base64,/, '').length;
                const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
                const sizeInKb = sizeInBytes / 1024;
                if (+sizeInKb <= 2048) {
                    if (env_1.env.imageserver === 's3') {
                        yield this.s3Service.imageUpload((path + name), base64Data, type);
                    }
                    else {
                        yield this.imageService.imageUpload((path + name), base64Data);
                    }
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'Not able to update as the file size is too large.',
                    };
                    return response.status(400).send(errorResponse);
                }
                newCategory.image = name;
                newCategory.imagePath = path;
            }
            newCategory.parentInt = category.parentInt;
            newCategory.sortOrder = category.sortOrder;
            const metaTagTitle = category.categorySlug ? category.categorySlug : category.name;
            const slug = metaTagTitle.trim();
            const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            newCategory.categorySlug = yield this.validate_slug(data);
            newCategory.isActive = category.status;
            newCategory.categoryDescription = category.categoryDescription ? yield this.imageService.escapeChar(category.categoryDescription) : '';
            const categorySave = yield this.categoryService.create(newCategory);
            const getAllPath = yield this.categoryPathService.find({
                where: { categoryId: category.parentInt },
                order: { level: 'ASC' },
            });
            let level = 0;
            for (const path of getAllPath) {
                const CategoryPathLoop = new CategoryPath_1.CategoryPath();
                CategoryPathLoop.categoryId = categorySave.categoryId;
                CategoryPathLoop.pathId = path.pathId;
                CategoryPathLoop.level = level;
                yield this.categoryPathService.create(CategoryPathLoop);
                level++;
            }
            const newCategoryPath = new CategoryPath_1.CategoryPath();
            newCategoryPath.categoryId = categorySave.categoryId;
            newCategoryPath.pathId = categorySave.categoryId;
            newCategoryPath.level = level;
            yield this.categoryPathService.create(newCategoryPath);
            if (categorySave !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully created new category.',
                    data: categorySave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to create the category. ',
                };
                return response.status(400).send(errorResponse);
            }
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
     *      "message": "Successfully updated Category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/category/:id
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    updateCategory(category, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('update:', category);
            const categoryId = yield this.categoryService.findOne({
                where: {
                    categoryId: category.categoryId,
                },
            });
            if (!categoryId) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid category Id.',
                };
                return response.status(400).send(errorResponse);
            }
            categoryId.name = category.name;
            const image = category.image;
            if (image) {
                const type = image.split(';')[0].split('/')[1];
                const availableTypes = env_1.env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse = {
                        status: 0,
                        message: 'Only ' + env_1.env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const name = 'Img_' + Date.now() + '.' + type;
                const path = 'category/';
                const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const stringLength = image.replace(/^data:image\/\w+;base64,/, '').length;
                const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
                const sizeInKb = sizeInBytes / 1024;
                if (+sizeInKb <= 2048) {
                    if (env_1.env.imageserver === 's3') {
                        yield this.s3Service.imageUpload((path + name), base64Data, type);
                    }
                    else {
                        yield this.imageService.imageUpload((path + name), base64Data);
                    }
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'Not able to update as the file size is too large.',
                    };
                    return response.status(400).send(errorResponse);
                }
                categoryId.image = name;
                categoryId.imagePath = path;
            }
            categoryId.parentInt = category.parentInt;
            categoryId.sortOrder = category.sortOrder;
            const metaTagTitle = category.categorySlug ? category.categorySlug : category.name;
            const slug = metaTagTitle.trim();
            const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            categoryId.categorySlug = yield this.validate_slug(data);
            categoryId.isActive = category.status;
            categoryId.categoryDescription = category.categoryDescription ? yield this.imageService.escapeChar(category.categoryDescription) : '';
            const categorySave = yield this.categoryService.create(categoryId);
            const deleteCategory = yield this.categoryPathService.find({ where: { categoryId: category.categoryId } });
            for (const val of deleteCategory) {
                yield this.categoryPathService.delete(val.categoryPathId);
            }
            const getAllPath = yield this.categoryPathService.find({
                where: { categoryId: category.parentInt },
                order: { level: 'ASC' },
            });
            let level = 0;
            for (const path of getAllPath) {
                const CategoryPathLoop = new CategoryPath_1.CategoryPath();
                CategoryPathLoop.categoryId = categorySave.categoryId;
                CategoryPathLoop.pathId = path.pathId;
                CategoryPathLoop.level = level;
                this.categoryPathService.create(CategoryPathLoop);
                level++;
            }
            const newCategoryPath = new CategoryPath_1.CategoryPath();
            newCategoryPath.categoryId = categorySave.categoryId;
            newCategoryPath.pathId = categorySave.categoryId;
            newCategoryPath.level = level;
            yield this.categoryPathService.create(newCategoryPath);
            if (+category.status === 0) {
                const categories = yield this.categoryPathService.find({ where: { pathId: categorySave.categoryId } });
                for (const cat of categories) {
                    const disableCategory = yield this.categoryService.findOne({ where: { categoryId: cat.categoryId } });
                    disableCategory.isActive = 0;
                    yield this.categoryService.create(disableCategory);
                }
            }
            else {
                const categories = yield this.categoryPathService.find({ where: { pathId: categorySave.categoryId } });
                for (const cat of categories) {
                    const disableCategory = yield this.categoryService.findOne({ where: { categoryId: cat.categoryId } });
                    disableCategory.isActive = 1;
                    yield this.categoryService.create(disableCategory);
                }
            }
            if (categorySave !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated category.',
                    data: (0, class_transformer_1.instanceToPlain)(categorySave),
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the category. ',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
     *      "message": "Successfully deleted Category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/category/:id
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteCategory(category, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productToCategory = yield this.productToCategoryService.findOne({
                where: {
                    categoryId: category.categoryId,
                },
            });
            if (productToCategory) {
                return response.status(400).send({
                    status: 0,
                    message: 'You cannot delete this category as it is mapped to a product',
                });
            }
            const categoryId = yield this.categoryService.findOne({
                where: {
                    categoryId: category.categoryId,
                },
            });
            if (!categoryId) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid category Id.',
                };
                return response.status(400).send(errorResponse);
            }
            const parentCategoryId = yield this.categoryService.findOne({
                where: {
                    parentInt: category.categoryId,
                },
            });
            if (parentCategoryId) {
                const errorresponse = {
                    status: 0,
                    message: 'You cannot delete this parent category as sub-categories are mapped to it. ',
                };
                return response.status(400).send(errorresponse);
            }
            const categoryPath = yield this.categoryPathService.find({ where: { categoryId: category.categoryId } });
            for (const path of categoryPath) {
                yield this.categoryPathService.delete(path.categoryPathId);
            }
            const deleteCategory = yield this.categoryService.delete(categoryId);
            if (!deleteCategory) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted category.',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the category. ',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Category List API
    /**
     * @api {get} /api/category Category List API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the complete category list.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/category
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    categorylist(limit, offset, keyword, sortOrder, status, count, response) {
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
            const whereConditions = [];
            if (status || status === '0') {
                whereConditions.push({
                    name: 'category.isActive',
                    op: 'or',
                    value: +status,
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
            const vendorCategoryList = yield this.categoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const successResponse = {
                status: 1,
                message: 'Successfully got the vendor category list.',
                data: vendorCategoryList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Category List Tree API
    /**
     * @api {get} /api/category-list-intree Category List InTree API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the complete category list.",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/category-list-intree
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    categoryListTree(limit, offset, keyword, sortOrder, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['categoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'isActive'];
            const search = [
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                },
            ];
            const WhereConditions = [];
            const category = yield this.categoryService.list(limit, offset, select, search, WhereConditions, sortOrder, count);
            if (count) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully get category List count',
                    data: category,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const categoryList = (0, array_to_tree_1.default)(category, {
                    parentProperty: 'parentInt',
                    customID: 'categoryId',
                });
                const successResponse = {
                    status: 1,
                    message: 'successfully got the complete category list.',
                    data: categoryList,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Update Category Slug API
    /**
     * @api {put} /api/update-category-slug Update Category Slug API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Category Slug.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/update-category-slug
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    updateSlug(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const arr = [];
            const category = yield this.categoryService.findAll();
            for (const val of category) {
                const metaTagTitle = val.metaTagTitle;
                if (metaTagTitle) {
                    const dat = metaTagTitle.replace(/\s+/g, '-').replace(/[&\/\\#@,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                    const data = dat.replace(/--/gi, '-');
                    const getCategorySlug = yield this.categoryService.slug(metaTagTitle);
                    if (getCategorySlug.length === 0 || getCategorySlug === '' || getCategorySlug === undefined) {
                        val.categorySlug = data;
                    }
                    else if (getCategorySlug.length === 1 && (metaTagTitle !== getCategorySlug[getCategorySlug.length - 1].metaTagTitle)) {
                        val.categorySlug = data + '-' + 1;
                    }
                    else if (getCategorySlug.length > 1 && getCategorySlug !== undefined && getCategorySlug !== '') {
                        const slugVal = getCategorySlug[getCategorySlug.length - 1];
                        const value = slugVal.categorySlug;
                        const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                        const slugNumber = parseInt(getSlugInt, 0);
                        val.categorySlug = data + '-' + (slugNumber + 1);
                    }
                }
                else {
                    const title = val.name;
                    const dat = title.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                    const data = dat.replace(/--/gi, '-');
                    const getCategorySlug = yield this.categoryService.slug(title);
                    if (getCategorySlug === '' || getCategorySlug === undefined || getCategorySlug.length === 0) {
                        val.categorySlug = data;
                    }
                    else if (getCategorySlug.length === 1 && (title !== getCategorySlug[getCategorySlug.length - 1].title)) {
                        val.categorySlug = data + '-' + 1;
                    }
                    else if (getCategorySlug.length > 1 && getCategorySlug !== undefined && getCategorySlug !== '') {
                        const slugVal = getCategorySlug[getCategorySlug.length - 1];
                        const value = slugVal.categorySlug;
                        const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                        const slugNumber = parseInt(getSlugInt, 0);
                        val.categorySlug = data + '-' + (slugNumber + 1);
                    }
                }
                arr.push(val);
            }
            yield this.categoryService.create(arr);
            const successResponse = {
                status: 1,
                message: 'Successfully updated the category slug.',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Category List API
    /**
     * @api {get} /api/category-count Category Count API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {String} status status
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the complete category count.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/category-count
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    categorycount(limit, offset, keyword, sortOrder, status, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productCount = yield this.categoryService.categoryCount(limit, offset, keyword, sortOrder, status);
            const successResponse = {
                status: 1,
                message: 'Successfully get Category Count',
                data: {
                    productCount: productCount.categoryCount,
                },
            };
            return response.status(200).send(successResponse);
        });
    }
    // category Detail
    /**
     * @api {get} /api/category-detail Category Detail API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} categoryId categoryId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Category detail",
     *      "data": "{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/category-detail
     * @apiErrorExample {json} category error
     * HTTP/1.1 500 Internal Server Error
     */
    CategoryDetail(categoryId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryService.findOne({
                where: {
                    categoryId,
                },
            });
            if (!category) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Category Id',
                };
                return response.status(400).send(errorResponse);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got category detail',
                data: category,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Category Excel Document download
    /**
     * @api {get} /api/category-excel-list Category Excel
     * @apiGroup Category
     * @apiParam (Request body) {String} categoryId categoryId
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Category Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/category-excel-list
     * @apiErrorExample {json} category Excel List error
     * HTTP/1.1 500 Internal Server Error
     */
    categoryExcelListDownload(categoryId, keyword, sortOrder, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Category Detail Sheet');
            const rows = [];
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
            if (categoryId) {
                whereConditions.push({
                    name: 'category.categoryId',
                    op: 'IN',
                    value: categoryId,
                });
            }
            else {
                return response.status(400).send({
                    status: 0,
                    message: 'Choose atleast one category.',
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
            const categoryList = yield this.categoryPathService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            // Excel sheet column define
            worksheet.columns = [
                { header: 'Image', key: 'image', size: 16, width: 30 },
                { header: 'Category Name', key: 'name', size: 16, width: 30 },
                { header: 'Levels', key: 'parentInt', size: 16, width: 60 },
                { header: 'Sort Order', key: 'sortOrder', size: 16, width: 15 },
                { header: 'Status', key: 'isActive', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            for (const data of categoryList) {
                if (+data.isActive === 1) {
                    data.isActive = 'Active';
                }
                else {
                    data.isActive = 'In-Active';
                }
                rows.push([data.image, data.name, data.levels, data.sortOrder, data.isActive]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './CategoryExcel' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            return new Promise((resolve, reject) => {
                response.download(fileName, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(fileName);
                        return response.end();
                    }
                });
            });
        });
    }
    // Category Export All Excel API
    /**
     * @api {get} /api/category-export-all Category Export All API
     * @apiGroup Category
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the category Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/category-export-all
     * @apiErrorExample {json} Category Excel List error
     * HTTP/1.1 500 Internal Server Error
     */
    categoryExportAll(status, keyword, sortOrder, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Category Detail Sheet');
            const rows = [];
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
            const categoryList = yield this.categoryPathService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            // Excel sheet column define
            worksheet.columns = [
                { header: 'Image', key: 'image', size: 16, width: 30 },
                { header: 'Category Name', key: 'name', size: 16, width: 30 },
                { header: 'Levels', key: 'parentInt', size: 16, width: 60 },
                { header: 'Sort Order', key: 'sortOrder', size: 16, width: 15 },
                { header: 'Status', key: 'isActive', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            for (const data of categoryList) {
                if (+data.isActive === 1) {
                    data.isActive = 'Active';
                }
                else {
                    data.isActive = 'In-Active';
                }
                rows.push([data.image, data.name, data.levels, data.sortOrder, data.isActive]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './CategoryexcelDetail_' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            return new Promise((resolve, reject) => {
                response.download(fileName, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(fileName);
                        return response.end();
                    }
                });
            });
        });
    }
    validate_slug($slug, $id = 0, $count = 0) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const slugCount = yield this.categoryService.checkSlug($slug, $id, $count);
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
    (0, routing_controllers_1.Post)('/category'),
    (0, routing_controllers_1.Authorized)(['admin', 'create-category']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [AddCategoryRequest_1.AddCategory, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "addCategory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/category/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-category']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateCategoryRequest_1.UpdateCategoryRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/category/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-category']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DeleteCategoryRequest_1.DeleteCategoryRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/category'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('sortOrder')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "categorylist", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/category-list-intree'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('sortOrder')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "categoryListTree", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-category-slug'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "updateSlug", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/category-count'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('sortOrder')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "categorycount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/category-detail'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('categoryId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "CategoryDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/category-excel-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('categoryId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('sortOrder')),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "categoryExcelListDownload", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/category-export-all'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('sortOrder')),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "categoryExportAll", null);
CategoryController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)(),
    tslib_1.__metadata("design:paramtypes", [CategoryService_1.CategoryService,
        ProductToCategoryService_1.ProductToCategoryService,
        CategoryPathService_1.CategoryPathService,
        S3Service_1.S3Service,
        ImageService_1.ImageService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=CategoryController.js.map