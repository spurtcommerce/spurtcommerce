"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
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
const CategoryPath_1 = require("../../core/models/CategoryPath");
const array_to_tree_1 = tslib_1.__importDefault(require("array-to-tree"));
const DeleteCategoryRequest_1 = require("./requests/DeleteCategoryRequest");
const CategoryPathService_1 = require("../../core/services/CategoryPathService");
const ProductToCategoryService_1 = require("../../core/services/ProductToCategoryService");
const S3Service_1 = require("../../core/services/S3Service");
const env_1 = require("../../../env");
const ImageService_1 = require("../../core/services/ImageService");
const fs = tslib_1.__importStar(require("fs"));
const product_1 = require("@spurtcommerce/product");
const ExportLog_1 = require("../../core/models/ExportLog");
const ExportLogService_1 = require("../../core/services/ExportLogService");
const VendorGroupCategoryService_1 = require("../../core/services/VendorGroupCategoryService");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
const moment_1 = tslib_1.__importDefault(require("moment"));
const fetch = tslib_1.__importStar(require("node-fetch"));
const IndustryService_1 = require("../../../api/core/services/IndustryService");
let CategoryController = class CategoryController {
    constructor(categoryService, productToCategoryService, categoryPathService, s3Service, imageService, exportLogService, vendorGroupCategoryService, industryService) {
        this.categoryService = categoryService;
        this.productToCategoryService = productToCategoryService;
        this.categoryPathService = categoryPathService;
        this.s3Service = s3Service;
        this.imageService = imageService;
        this.exportLogService = exportLogService;
        this.vendorGroupCategoryService = vendorGroupCategoryService;
        this.industryService = industryService;
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
    addCategory(category, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            const image = category.image;
            let name;
            let path;
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
                name = 'Img_' + Date.now() + '.' + type;
                path = 'category/';
                const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((path + name), base64Data, type);
                }
                else {
                    yield this.imageService.imageUpload((path + name), base64Data);
                }
            }
            const categorySave = yield (0, product_1.categoryCreate)((0, typeormLoader_1.getDataSource)(), {
                name: category.name,
                containerName: name,
                containerPath: path,
                parentInt: category.parentInt,
                industryId: category.industryId,
                sortOrder: category.sortOrder,
                categorySlug: category.categorySlug,
                categoryDescription: category.categoryDescription,
                status: category.status,
            });
            return response.status(categorySave.status ? 200 : 400).send({
                status: categorySave.status,
                message: categorySave.message,
                data: (_a = categorySave.data) !== null && _a !== void 0 ? _a : undefined,
            });
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
    updateCategory(category, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const categoryId = yield this.categoryService.findOne({
                where: {
                    categoryId: category.categoryId,
                },
            });
            if (!categoryId) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid category Id',
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
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((path + name), base64Data, type);
                }
                else {
                    yield this.imageService.imageUpload((path + name), base64Data);
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
            categoryId.categorySlug = yield this.validate_slug(data);
            categoryId.isActive = category.status;
            categoryId.categoryDescription = category.categoryDescription ? yield this.imageService.escapeChar(category.categoryDescription) : '';
            const categorySave = yield this.categoryService.create(categoryId);
            const deleteCategory = yield this.categoryPathService.find({ where: { categoryId: category.categoryId } });
            for (const val of deleteCategory) {
                yield this.categoryPathService.delete({ categoryPathId: val.categoryPathId });
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
            if (categorySave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated category',
                    data: (0, class_transformer_1.instanceToPlain)(categorySave),
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the category',
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
     *      "message": "Successfully deleted Category",
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
                    message: 'Invalid category Id',
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
                    message: 'You cannot delete this parent category as sub-categories are mapped to it',
                };
                return response.status(400).send(errorresponse);
            }
            const vendorGroupCategory = yield this.vendorGroupCategoryService.findOne({ where: { categoryId: category.categoryId } });
            if (vendorGroupCategory) {
                const errorresponse = {
                    status: 0,
                    message: 'You cannot delete this category as it is mapped to a vendor group',
                };
                return response.status(400).send(errorresponse);
            }
            const categoryPath = yield this.categoryPathService.find({ where: { categoryId: category.categoryId } });
            for (const path of categoryPath) {
                yield this.categoryPathService.delete({ categoryPathId: path.categoryPathId });
            }
            const deleteCategory = yield this.categoryService.delete({ categoryId: categoryId.categoryId });
            if (!deleteCategory) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted category',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete the category',
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
    categorylist(limit, offset, keyword, sortOrder, status, count, name, levelFilter, industryId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            const listCategory = yield (0, product_1.categoryList)((0, typeormLoader_1.getDataSource)(), limit, offset, keyword, status, name, sortOrder, levelFilter, industryId);
            return response.status(listCategory.status ? 200 : 400).send({
                status: listCategory.status,
                message: listCategory.message,
                data: (_a = listCategory.data) !== null && _a !== void 0 ? _a : undefined,
            });
        });
    }
    // Bulk Category Upload API
    /**
     * @api {post} /bulk-upload-category Bulk Upload Category
     * @apiGroup Category
     *
     * @apiDescription
     * This API is used to bulk upload categories using an Excel (.xlsx) file.
     * <br/>
     * The Excel file must contain required columns. The API validates the file,
     * processes category data, uploads category images if provided as URLs,
     * and creates category-path mappings up to 3 levels.
     *
     * @apiHeader {String} Authorization Bearer access token
     *
     * @apiParam (FormData) {File} file Excel (.xlsx) file containing category data
     *
     * @apiParamExample {multipart/form-data} Request Example:
     * file: category_import.xlsx
     *
     * @apiSuccess {Number} status Success status (1)
     * @apiSuccess {String} message Success message
     *
     * @apiSuccessExample {json} Success Response:
     * {
     *   "status": 1,
     *   "message": "Category imported successfully"
     * }
     *
     * @apiError {Number} status Error status (0)
     * @apiError {String} message Error message
     *
     * @apiErrorExample {json} File Missing:
     * {
     *   "status": 0,
     *   "message": "File is required"
     * }
     *
     * @apiErrorExample {json} Invalid File Type:
     * {
     *   "status": 0,
     *   "message": "Invalid file type. Only .xlsx files are allowed"
     * }
     *
     * @apiErrorExample {json} Empty File:
     * {
     *   "status": 0,
     *   "message": "Uploaded Excel file is empty"
     * }
     *
     * @apiErrorExample {json} Missing Columns:
     * {
     *   "status": 0,
     *   "message": "Missing required columns: CategoryName, SortOrder, Image, Status"
     * }
     *
     * @apiErrorExample {json} Server Error:
     * {
     *   "status": 0,
     *   "message": "Something went wrong"
     * }
     *
     * @apiNote
     * Required Excel Columns:
     * - CategoryName (String)
     * - SortOrder (Number)
     * - Image (Image URL – optional but column mandatory)
     * - Status (0 or 1)
     *
     * Optional Columns:
     * - Parent (Parent category ID)
     * - IndustryId
     * - CategorySlug
     *
     * If validation errors exist in rows, an error Excel file will be generated
     * and returned for download with an "Error" column.
     */
    bulkCategoryUpload(file, response, req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!file || !file.originalname) {
                return response.status(400).send({
                    status: 0,
                    message: 'File is required',
                });
            }
            if (!file.originalname.toLowerCase().endsWith('.xlsx')) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid file type. Only .xlsx files are allowed',
                });
            }
            const fileName = `./category_import_${Date.now()}.xlsx`;
            let xlsxData = [];
            try {
                yield this.imageService.writeFile(fileName, new Uint8Array(file.buffer));
                xlsxData = yield this.imageService.xlsxToJson(fileName);
                if (!xlsxData || !Array.isArray(xlsxData) || xlsxData.length === 0) {
                    return response.status(400).send({
                        status: 0,
                        message: 'Uploaded Excel file is empty',
                    });
                }
                const requiredHeaders = ['CategoryName', 'SortOrder', 'Image', 'Status'];
                const fileHeaders = Object.keys(xlsxData[0]);
                const missingHeaders = requiredHeaders.filter(header => !fileHeaders.includes(header));
                if (missingHeaders.length) {
                    return response.status(400).send({
                        status: 0,
                        message: `Missing required columns: ${missingHeaders.join(', ')}`,
                    });
                }
                let hasError = false;
                const validatedData = xlsxData.map((row, index) => {
                    const errors = [];
                    for (const field of requiredHeaders) {
                        if (row[field] === undefined ||
                            row[field] === null ||
                            row[field] === '') {
                            errors.push(`${field} missing`);
                        }
                    }
                    if (errors.length) {
                        hasError = true;
                        row.Error = `${errors.join(', ')}`;
                    }
                    else {
                        row.Error = '';
                    }
                    return row;
                });
                if (hasError) {
                    const errorFileName = `./category_import_error_${Date.now()}.xlsx`;
                    yield this.imageService.jsonToXlsx(validatedData, errorFileName);
                    yield new Promise((resolve, reject) => {
                        response.download(errorFileName, (err) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                fs.unlinkSync(errorFileName);
                                response.end();
                            }
                        });
                    });
                    return;
                }
                for (const row of xlsxData) {
                    const newCategory = {};
                    // Image handling
                    if (row.Image && (row.Image.startsWith('http://') || row.Image.startsWith('https://'))) {
                        const imageResponse = yield fetch(row.Image);
                        if (!imageResponse.ok) {
                            throw new Error(`Failed to download image: ${row.Image}`);
                        }
                        const imageBuffer = yield imageResponse.buffer();
                        const contentType = imageResponse.headers.get('content-type');
                        let imageExt = 'jpg';
                        if (contentType) {
                            const match = contentType.match(/\/(jpeg|jpg|png)/);
                            if (match) {
                                imageExt = match[1] === 'jpeg' ? 'jpg' : match[1];
                            }
                        }
                        const imageName = `category-${Date.now()}-${Math.floor(Math.random() * 1000)}.${imageExt}`;
                        const imagePath = 'category/';
                        if (env_1.env.imageserver === 's3') {
                            yield this.s3Service.imageUpload(imagePath + imageName, imageBuffer, imageExt);
                        }
                        else {
                            yield this.imageService.imageUpload(imagePath + imageName, imageBuffer);
                        }
                        newCategory.image = imageName;
                        newCategory.imagePath = imagePath;
                    }
                    newCategory.name = row.CategoryName.trim();
                    newCategory.parentInt = row.Parent ? +row.Parent : 0;
                    newCategory.sortOrder = +row.SortOrder;
                    newCategory.industryId = row.IndustryId ? +row.IndustryId : undefined;
                    const slug = row.CategorySlug
                        ? row.CategorySlug.trim()
                        : row.CategoryName.trim();
                    newCategory.categorySlug = yield this.validate_slug(slug.replace(/\s+/g, '-')
                        .replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '')
                        .toLowerCase());
                    newCategory.isActive = row.Status;
                    newCategory.createdDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
                    newCategory.modifiedDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
                    const categorySave = yield this.categoryService.create(newCategory);
                    const parentId = Number(row.Parent) || 0;
                    let parentPaths = [];
                    if (parentId > 0) {
                        // Category path mapping
                        parentPaths = yield this.categoryPathService.find({
                            where: { categoryId: parentId },
                            order: { level: 'ASC' },
                        });
                        if (parentPaths.length >= 3) {
                            throw new Error('Category can only be mapped up to 3 levels');
                        }
                    }
                    let level = 0;
                    for (const path of parentPaths) {
                        yield this.categoryPathService.create({
                            categoryId: categorySave.categoryId,
                            pathId: path.pathId,
                            level: level++,
                        });
                    }
                    yield this.categoryPathService.create({
                        categoryId: categorySave.categoryId,
                        pathId: categorySave.categoryId,
                        level,
                    });
                }
                return response.status(200).send({
                    status: 1,
                    message: 'Category imported successfully',
                });
            }
            catch (error) {
                console.log('lkhjkhjkhjkhj');
                return response.status(500).send({
                    status: 0,
                    message: error.message || 'Something went wrong',
                });
            }
            finally {
                // Cleanup temp file
                if (fs.existsSync(fileName)) {
                    fs.unlinkSync(fileName);
                }
            }
        });
    }
    // Download Category Import Sample Excel
    /**
     * @api {get} /api/category/download-category-sample Download Category Import Sample
     * @apiGroup Category
     * @apiHeader {String} Authorization
     *
     * @apiDescription
     * Downloads an Excel file that contains:
     *  - Category template sheet
     *  - Sample data sheet
     *  - Instruction sheet
     *  - Category list sheet (for ParentInt reference)
     *  - Industry list sheet
     *
     * This file is used to prepare bulk category import data.
     *
     * @apiSuccessExample {file} Success
     * HTTP/1.1 200 OK
     * Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
     * Content-Disposition: attachment; filename="Category_Import_Sheet_XXXXXXXX.xlsx"
     *
     * @apiSampleRequest /api/category/download-category-sample
     *
     * @apiErrorExample {json} Download error
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Unable to download category sample file"
     * }
     */
    downloadCategorySample(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            // tslint:disable-next-line:no-shadowed-variable
            const fs = require('fs');
            const path = require('path');
            const workbook = new excel.Workbook();
            // ------------------- Category Template Sheet -------------------
            const templateSheet = workbook.addWorksheet('Category_Sheet');
            templateSheet.columns = [
                { header: 'CategoryName', key: 'categoryName', width: 20 },
                { header: 'CategorySlug', key: 'categorySlug', width: 20 },
                { header: 'Parent', key: 'parent', width: 30 },
                { header: 'IndustryId', key: 'industryId', width: 20 },
                { header: 'SortOrder', key: 'sortOrder', width: 20 },
                { header: 'Image', key: 'image', width: 15 },
                { header: 'Status', key: 'status', width: 20 },
            ];
            // Style header
            templateSheet.getRow(1).eachCell((cell) => {
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } };
                cell.font = { bold: true };
                cell.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
            });
            // ------------------- Sample Data Sheet -------------------
            const sampleSheet = workbook.addWorksheet('Sample_Sheet');
            sampleSheet.columns = templateSheet.columns;
            // Add sample row
            sampleSheet.addRow({
                categoryName: 'Smart Watches',
                categorySlug: 'Smart Watches',
                parent: '',
                industryId: '',
                sortOrder: '3',
                image: 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg',
                status: 1,
            });
            sampleSheet.addRow({
                categoryName: 'Trending Products',
                categorySlug: 'Trending Products',
                parent: '33',
                industryId: '',
                sortOrder: '6',
                image: 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg',
                status: 1,
            });
            sampleSheet.addRow({
                categoryName: 'Clothink',
                categorySlug: 'Clothink',
                parent: '45',
                industryId: '5',
                sortOrder: '6',
                image: 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg',
                status: 1,
            });
            // Style sample header
            sampleSheet.getRow(1).eachCell((cell) => {
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } };
                cell.font = { bold: true };
                cell.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
            });
            // ------------------- Instruction Sheet -------------------
            const instructionSheet = workbook.addWorksheet('Instruction_Sheet');
            instructionSheet.columns = [
                { header: 'Column Name', key: 'column', width: 30 },
                { header: 'Description / How to Fill', key: 'description', width: 120 },
            ];
            instructionSheet.getRow(1).eachCell((cell) => {
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } };
                cell.font = { bold: true };
                cell.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
            });
            instructionSheet.addRows([
                {
                    column: 'CategoryName *',
                    description: 'Mandatory. Enter the category display name.\n' +
                        'Example: Jewelry, Smart Watches.',
                },
                {
                    column: 'CategorySlug *',
                    description: 'Mandatory. Slug should be unique and usually same as CategoryName.\n' +
                        'Spaces are allowed.\n' +
                        'Example: Smart Watches.',
                },
                {
                    column: 'SortOrder *',
                    description: 'Mandatory. Determines the order in which categories are displayed in the list.\n' +
                        'Lower number appears first.',
                },
                {
                    column: 'Status *',
                    description: 'Mandatory. Allowed values:\n' +
                        '1 = Active (Category will be visible)\n' +
                        '0 = Inactive (Category will be hidden)',
                },
                {
                    column: 'Image *',
                    description: 'Mandatory. Enter a valid public image URL.\n' +
                        'Example: https://images.unsplash.com/....',
                },
                {
                    column: 'Parent',
                    description: 'Optional. Used to create a sub-category.\n\n' +
                        'Select the ParentInt value from Category_List sheet.\n' +
                        'Example: Jewelry > Waist Chain\n\n' +
                        'If left empty, the category will be created as a parent (main) category.',
                },
                {
                    column: 'IndustryId',
                    description: 'Optional. Used to map category with an industry.\n\n' +
                        'IndustryId can be found in Industry_List sheet.\n' +
                        'If not provided, category will be created without industry mapping.',
                },
            ]);
            // Enable wrap text for description column
            instructionSheet.eachRow((row, rowNumber) => {
                if (rowNumber > 1) {
                    row.getCell(2).alignment = { wrapText: true, vertical: 'top' };
                }
            });
            // ------------------- Category List Sheet -------------------
            const categoryLevels = yield this.categoryPathService.listCategoryLevels();
            const categoryListSheet = workbook.addWorksheet('Category_List');
            categoryListSheet.columns = [
                { header: 'ParentInt', key: 'parentInt', width: 20 },
                { header: 'Levels', key: 'levels', width: 40 },
                { header: 'IndustryId', key: 'industryId', width: 20 },
            ];
            categoryListSheet.getRow(1).eachCell((cell) => {
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } };
                cell.font = { bold: true };
                cell.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
            });
            categoryLevels.forEach((item) => {
                categoryListSheet.addRow({
                    parentInt: item.parentInt,
                    levels: item.levels,
                    industryId: item.industryId,
                });
            });
            // ------------------- Industry List Sheet -------------------
            const industryList = yield this.industryService.findAll({
                order: {
                    createdDate: 'DESC',
                },
            });
            const industrySheet = workbook.addWorksheet('Industry_List');
            industrySheet.columns = [
                { header: 'IndustryId', key: 'industryId', width: 20 },
                { header: 'Name', key: 'name', width: 30 },
            ];
            industrySheet.getRow(1).eachCell((cell) => {
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } };
                cell.font = { bold: true };
                cell.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
            });
            industryList.forEach((item) => {
                industrySheet.addRow({
                    industryId: item.id,
                    name: item.name,
                });
            });
            // ------------------- Write & Download -------------------
            const fileName = path.join(process.cwd(), `Category_Import_Sheet_${Date.now()}.xlsx`);
            yield workbook.xlsx.writeFile(fileName);
            return new Promise((resolve, reject) => {
                response.download(fileName, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(fileName);
                        response.end();
                    }
                });
            });
        });
    }
    // Category List Tree API
    /**
     * @api {get} /api/category/category-intree Category List InTree API
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
     *      "status": "1"
     *      "message": "successfully got the complete category list",
     *      "data":"[{
     *               "categoryId": 1304,
     *               "name": "Dresses",
     *               "image": "",
     *               "imagePath": "",
     *               "parentInt": 0,
     *               "sortOrder": 1,
     *               "isActive": "1",
     *               "children": [{
     *                   "categoryId": 1311,
     *                   "name": "cotton-shirts",
     *                   "image": "",
     *                   "imagePath": "",
     *                   "parentInt": 1304,
     *                   "sortOrder": 1,
     *                   "isActive": "1"
     *                 }]
     *   }]
     * }
     * @apiSampleRequest /api/category/category-intree
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
            const category = yield this.categoryService.list(limit, offset, select, search, WhereConditions, [], sortOrder, count);
            if (count) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully get category List count',
                    data: category,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const categoryLists = (0, array_to_tree_1.default)(category, {
                    parentProperty: 'parentInt',
                    customID: 'categoryId',
                });
                const successResponse = {
                    status: 1,
                    message: 'successfully got the complete category list',
                    data: categoryLists,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Update Category Slug API
    /**
     * @api {put} /api/category/category-slug Update Category Slug API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Category Slug",
     *      "status": "1",
     * }
     * @apiSampleRequest /api/category/category-slug
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
                    if (getCategorySlug.length === 0) {
                        val.categorySlug = data;
                    }
                    else if (getCategorySlug.length === 1 && (metaTagTitle !== getCategorySlug[getCategorySlug.length - 1].metaTagTitle)) {
                        val.categorySlug = data + '-' + 1;
                    }
                    else if (getCategorySlug.length > 1) {
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
                    if (getCategorySlug.length === 0) {
                        val.categorySlug = data;
                    }
                    else if (getCategorySlug.length === 1 && (title !== getCategorySlug[getCategorySlug.length - 1].title)) {
                        val.categorySlug = data + '-' + 1;
                    }
                    else if (getCategorySlug.length > 1) {
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
                message: 'Successfully updated the category slug',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Category List API
    /**
     * @api {get} /api/category/category-count Category Count API
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
     *      "status": "1"
     *      "message": "successfully got the complete category count",
     *      "data":"{
     *               "productCount": 20
     *              }"
     * }
     * @apiSampleRequest /api/category/category-count
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    categorycount(limit, offset, keyword, name, sortOrder, status, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productCount = yield this.categoryService.categoryCount(limit, offset, (keyword === '' || keyword === undefined ? name : keyword), sortOrder, status);
            const successResponse = {
                status: 1,
                message: 'Successfully get category count',
                data: {
                    productCount: productCount.categoryCount,
                },
            };
            return response.status(200).send(successResponse);
        });
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
     * @api {get} /api/category/category-excel-list Category Excel
     * @apiGroup Category
     * @apiParam (Request body) {String} categoryId categoryId
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Category Excel List",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/category/category-excel-list
     * @apiErrorExample {json} category Excel List error
     * HTTP/1.1 500 Internal Server Error
     */
    categoryExcelListDownload(categoryId, request, response) {
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
            const groupBy = [{
                    name: 'CategoryPath.category_id',
                }];
            const whereConditions = [];
            if ((categoryId === null || categoryId === void 0 ? void 0 : categoryId.length) > 0) {
                whereConditions.push({
                    name: 'category.categoryId',
                    op: 'IN',
                    value: categoryId,
                });
            }
            const searchConditions = [];
            const sort = [];
            const categoryLists = yield this.categoryPathService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            // Excel sheet column define
            worksheet.columns = [
                { header: 'Category Id', key: 'categoryId', size: 16, width: 30 },
                { header: 'Category Name', key: 'name', size: 16, width: 30 },
                { header: 'Parent Category', key: 'parentInt', size: 16, width: 30 },
                { header: 'Levels', key: 'levels', size: 16, width: 60 },
                { header: 'Sort Order', key: 'sortOrder', size: 16, width: 15 },
                { header: 'Status', key: 'isActive', size: 16, width: 15 },
                { header: 'Image', key: 'image', size: 16, width: 30 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            for (const data of categoryLists) {
                if (+data.isActive === 1) {
                    data.isActive = 'Active';
                }
                else {
                    data.isActive = 'In-Active';
                }
                rows.push([data.categoryId, data.name, data.parentInt, data.levels, data.sortOrder, data.isActive, data.image]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './CategoryExcel' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            // Add export log
            const newExportLog = new ExportLog_1.ExportLog();
            newExportLog.module = 'Product Categories';
            newExportLog.referenceType = 1;
            newExportLog.referenceId = request.user.userId;
            yield this.exportLogService.create(newExportLog);
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
     * @api {get} /api/category/category-export-all Category Export All API
     * @apiGroup Category
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the category Excel List",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/category/category-export-all
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
            const categoryLists = yield this.categoryPathService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
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
            for (const data of categoryLists) {
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
    validate_slug($slug_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function* ($slug, $id = 0, $count = 0) {
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
exports.CategoryController = CategoryController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(['admin', 'create-category']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [AddCategoryRequest_1.AddCategory, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "addCategory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-category']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateCategoryRequest_1.UpdateCategoryRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)(),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-category']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DeleteCategoryRequest_1.DeleteCategoryRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('sortOrder')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('name')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('levelFilter')),
    tslib_1.__param(8, (0, routing_controllers_1.QueryParam)('industryId')),
    tslib_1.__param(9, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, String, Object, String, Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "categorylist", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/bulk-upload-category'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.UploadedFile)('file')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "bulkCategoryUpload", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/download-category-sample'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "downloadCategorySample", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/category-intree'),
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
    (0, routing_controllers_1.Put)('/category-slug'),
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
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('name')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('sortOrder')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(6, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Number, String, Object]),
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
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('categoryId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Object, Object]),
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
exports.CategoryController = CategoryController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/category'),
    tslib_1.__metadata("design:paramtypes", [CategoryService_1.CategoryService,
        ProductToCategoryService_1.ProductToCategoryService,
        CategoryPathService_1.CategoryPathService,
        S3Service_1.S3Service,
        ImageService_1.ImageService,
        ExportLogService_1.ExportLogService,
        VendorGroupCategoryService_1.VendorGroupCategoryService,
        IndustryService_1.IndustryService])
], CategoryController);
//# sourceMappingURL=CategoryController.js.map