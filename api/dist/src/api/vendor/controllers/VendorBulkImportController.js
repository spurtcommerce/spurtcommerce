"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorImportController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const ImageService_1 = require("../../core/services/ImageService");
const BulkImportRequest_1 = require("../../admin/controllers/requests/BulkImportRequest");
const fs = require("fs");
const path = tslib_1.__importStar(require("path"));
const ProductController_1 = require("../../admin/controllers/ProductController");
const env_1 = require("../../../env");
const S3Service_1 = require("../../core/services/S3Service");
const util_1 = require("util");
const product_1 = require("@spurtcommerce/product");
const CategoryService_1 = require("../../core/services/CategoryService");
const VendorService_1 = require("../../core/services/VendorService");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
const unlinkAsync = (0, util_1.promisify)(fs.unlink);
const rmdirAsync = (0, util_1.promisify)(fs.rm);
let VendorImportController = class VendorImportController {
    constructor(
    // private exportLogService: ExportLogService,
    imageService, categoryService, bulkImport, productController, s3Service, vendorService) {
        this.imageService = imageService;
        this.categoryService = categoryService;
        this.bulkImport = bulkImport;
        this.productController = productController;
        this.s3Service = s3Service;
        this.vendorService = vendorService;
    }
    // Bulk Product Import
    /**
     * @api {Post} /api/vendor-import-datas Vendor Bulk Product Import
     * @apiGroup Vendor Bulk Import
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} buffer buffer
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/vendor-import-datas
     * @apiErrorExample {json} product-import Error
     * HTTP/1.1 500 Internal server error
     */
    productImport(buffer, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const bufferValue = buffer.buffer.split(',').map((value) => parseInt(value, 10));
                const random = Math.floor((Math.random() * 100) + 1);
                const mainFileName = `./import_${random}.xlsx`;
                yield this.imageService.writeFile(mainFileName, new Uint8Array(bufferValue));
                const xlsxToJson = yield this.imageService.xlsxToJson(mainFileName);
                const urlsFromExcel = [];
                for (let rowIndex = 0; rowIndex < xlsxToJson.length; rowIndex++) {
                    const row = xlsxToJson[rowIndex];
                    for (const columnName in row) {
                        if (!Object.prototype.hasOwnProperty.call(row, columnName)) {
                            continue;
                        }
                        const value = row[columnName];
                        if (typeof value === 'string') {
                            const splitUrls = value
                                .split(',')
                                .map(u => u.trim())
                                .filter(u => u.startsWith('http'));
                            if (splitUrls.length > 0) {
                                console.log(`Row ${rowIndex} | Column ${columnName} | URLs =>`, splitUrls);
                            }
                            for (const singleUrl of splitUrls) {
                                urlsFromExcel.push({
                                    rowIndex,
                                    columnName,
                                    url: singleUrl,
                                });
                            }
                        }
                    }
                }
                let checkImageUpload = false;
                const fileUploadpath = [];
                if (urlsFromExcel.length > 0) {
                    const vendor = yield this.vendorService.findOne({
                        select: ['vendorPrefixId'],
                        where: { vendorId: request.user.vendorId },
                    });
                    for (const item of urlsFromExcel) {
                        try {
                            const { buffer: imageBuffer, mime, ext } = yield this.imageService.urlToBase64(item.url);
                            const fileName = this.imageService.generateRandomImageName(ext);
                            const s3Key = `${vendor.vendorPrefixId}/products/${fileName}`;
                            yield this.s3Service.imageUpload(s3Key, imageBuffer, mime, 0);
                            // const existingImage = xlsxToJson[item.rowIndex][item.columnName];
                            // xlsxToJson[item.rowIndex][item.columnName] =
                            //     existingImage
                            //         .split(',')
                            //         .filter(v => !v.startsWith('http'))
                            //         .concat(s3Key)
                            //         .join(',');
                            // xlsxToJson[item.rowIndex][item.columnName] = s3Key;
                            const existingImage = xlsxToJson[item.rowIndex][item.columnName];
                            const updatedValue = existingImage
                                .split(',')
                                .filter(v => !v.startsWith('http'))
                                .concat(s3Key)
                                .join(',');
                            xlsxToJson[item.rowIndex][item.columnName] = updatedValue;
                            fileUploadpath.push(s3Key);
                            xlsxToJson[item.rowIndex][`Errors`] = undefined;
                        }
                        catch (err) {
                            xlsxToJson[item.rowIndex][`Errors`] =
                                `${item.columnName}_IMAGE_UPLOAD_FAILED`;
                            checkImageUpload = true;
                        }
                    }
                }
                const vendorId = request.user.vendorId;
                const forExport = yield this.bulkImport.validateAndFormatData(xlsxToJson);
                // if (forExport.errorStatus === true) {
                //     return response.status(400).send({
                //         status: 0,
                //         message: 'Import validation failed',
                //         data: forExport.data,
                //     });
                // }
                const excel = require('exceljs');
                const workbook = new excel.Workbook();
                const worksheet = workbook.addWorksheet('Products Sheet');
                const workSheetColumns = [];
                const jsonColumns = Object.keys(forExport.data[0]);
                for (const resultValue of jsonColumns) {
                    workSheetColumns.push({ header: resultValue, key: resultValue, size: 16, width: 30 });
                }
                worksheet.columns = workSheetColumns;
                if (forExport.errorStatus || checkImageUpload) {
                    forExport.data.forEach((row, rowIndex) => {
                        const rowData = {};
                        workSheetColumns.forEach((header) => {
                            rowData[header.key] = row[header.key];
                        });
                        worksheet.addRow(rowData);
                    });
                    fs.unlinkSync(path.join(process.cwd(), mainFileName));
                    const fileName = './ErrorBulkProduct_' + Date.now() + '.xlsx';
                    yield workbook.xlsx.writeFile(fileName);
                    try {
                        if (fileUploadpath && fileUploadpath.length > 0) {
                            yield this.s3Service.deleteMultipleFile(fileUploadpath);
                        }
                    }
                    catch (err) {
                        console.log('S3 delete error (ignored):', err);
                    }
                    return response.status(200).send({ status: 1, fileName });
                }
                fs.unlinkSync(path.join(process.cwd(), mainFileName));
                const authorization = request.headers.authorization;
                const result = yield this.productController.bulkProductImport(xlsxToJson, authorization, vendorId);
                return response.status(200).send({ status: 1, message: result });
            }
            catch (error) {
                console.error('Error:', error);
                return response.status(400).send({ status: 0, message: 'Internal Server Error' });
            }
        });
    }
    // Get Error Bulk Product
    /**
     * @api {Get} /api/vendor-import-datas/error-bulk-import Vendor Error Bulk Product Import
     * @apiGroup Vendor Bulk Import
     * @apiParam (Request body) {String} fileName fileName
     * @apiSuccessExample {file} Success
     *     HTTP/1.1 200 OK
     *     Content-Type: application/octet-stream
     *     Content-Disposition: attachment; filename="export.csv"
     *     ... (binary file content)
     * @apiSampleRequest /api/vendor-import-datas/error-bulk-import
     * @apiErrorExample {json} error-bulk-product Error
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "error": "Internal server error"
     *     }
     */
    errorBulkProduct(fileName, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
    // Bulk Image Import
    // Get Error Bulk Product
    /**
     * @api {Post} /api/vendor-import-datas/import-image Bulk Image Import
     * @apiGroup Vendor Bulk Import
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} file File
     * @apiSuccessExample {file} Success
     *     HTTP/1.1 200 OK
     *     Content-Type: application/octet-stream
     *     Content-Disposition: attachment; filename="export.csv"
     *     ... (binary file content)
     * @apiSampleRequest /api/vendor-import-datas/import-image
     * @apiErrorExample {json} bulk-image-import Error
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "error": "Internal server error"
     *     }
     */
    bulkImageImport(file, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ext = file.originalname.split('.').pop().toLowerCase();
            const random = Math.floor(Math.random() * 10000);
            const zipPath = `./products_${random}.zip`;
            const extractPath = path.resolve(`products_${random}`);
            const cleanup = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield unlinkAsync(zipPath).catch(() => undefined);
                yield rmdirAsync(extractPath, { recursive: true }).catch(() => undefined);
            });
            try {
                if (ext !== 'zip') {
                    return response.status(400).send({
                        status: 0,
                        message: 'Uploaded file is not a zip',
                    });
                }
                yield this.imageService.writeFile(zipPath, file.buffer);
                yield this.imageService.extractZip(zipPath, extractPath);
                let rootPath = extractPath;
                while (true) {
                    let ent = yield fs.promises.readdir(rootPath, { withFileTypes: true });
                    ent = ent.filter(e => e.name !== '__MACOSX');
                    // if only one folder, go inside
                    if (ent.length === 1 && ent[0].isDirectory()) {
                        rootPath = path.join(rootPath, ent[0].name);
                        continue;
                    }
                    break;
                }
                const entries = yield fs.promises.readdir(rootPath, { withFileTypes: true });
                const rootFiles = entries
                    .filter(e => e.isFile())
                    .map(e => e.name.toLowerCase());
                const rootFolders = entries
                    .filter(e => e.isDirectory())
                    .map(e => e.name.toLowerCase());
                const imageZipName = rootFiles.find(f => f === 'image.zip');
                const imageFolderName = rootFolders.find(f => f === 'image');
                // if (!excelName) {
                //     await cleanup();
                //     return response.status(400).send({
                //         status: 0,
                //         message: 'productData.xlsx not found',
                //     });
                // }
                // let imageRootPath = '';
                let imageRootPath = '';
                const allowedTypes = env_1.env.availImageTypes.split(',').map(t => t.toLowerCase());
                const directImages = rootFiles.filter(f => allowedTypes.includes(f.split('.').pop()));
                if (directImages.length) {
                    imageRootPath = rootPath;
                }
                else if (imageZipName) {
                    const imageZipPath = path.join(rootPath, imageZipName);
                    const imageExtractPath = path.join(extractPath, 'image_zip');
                    yield this.imageService.extractZip(imageZipPath, imageExtractPath);
                    const imgEntries = yield fs.promises.readdir(imageExtractPath, { withFileTypes: true });
                    const imgFolder = imgEntries.find(e => e.isDirectory() && e.name.toLowerCase() === 'image');
                    imageRootPath = imgFolder
                        ? path.join(imageExtractPath, imgFolder.name)
                        : imageExtractPath;
                }
                else if (imageFolderName) {
                    imageRootPath = path.join(rootPath, imageFolderName);
                }
                else {
                    yield cleanup();
                    return response.status(400).send({
                        status: 0,
                        message: 'image.zip or image folder not found',
                    });
                }
                const imageFiles = yield fs.promises.readdir(imageRootPath);
                if (!imageFiles.length) {
                    yield cleanup();
                    return response.status(400).send({
                        status: 0,
                        message: 'No images found to upload',
                    });
                }
                const image2base64 = require('image-to-base64');
                for (const fileName of imageFiles) {
                    try {
                        const type = fileName.split('.').pop().toLowerCase();
                        if (!allowedTypes.includes(type)) {
                            continue;
                        }
                        const imagePath = path.join(imageRootPath, fileName);
                        const base64 = yield image2base64(imagePath);
                        const buffer = Buffer.from(base64, 'base64');
                        if (env_1.env.imageserver === 's3') {
                            yield this.s3Service.imageUpload(fileName, buffer, type);
                        }
                        else {
                            yield this.imageService.imageUpload(fileName, buffer);
                        }
                    }
                    catch (err) {
                        console.error('Error processing image:', fileName, err);
                        throw err; // will go to main catch
                    }
                }
                yield cleanup();
                return response.status(200).send({
                    status: 1,
                    message: 'Images imported successfully',
                });
            }
            catch (err) {
                console.error(err);
                yield cleanup();
                return response.status(400).send({
                    status: 0,
                    message: 'Unable to import images',
                });
            }
        });
    }
    /**
     * @api {Post} /api/vendor-import-datas/category Vendor Bulk Category Import
     * @apiGroup Vendor Bulk Import
     * @apiHeader {string} Authorization
     * @apiParam (Request body) {string} buffer buffer
     * @apiSuccessExample {json} Success
     * {
     *      "status": "1",
     *      "message": "Categories successfully created !!"
     * },
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/vendor-import-datas/category
     * @apiErrorExample {json} category-import Error
     * HTTP/1.1 500 Internal server error
     */
    // @Authorized()
    categoryImport(buffer, file, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                // const bufferValue = file.buffer;
                const bufferValue = buffer.buffer.split(',').map((value) => parseInt(value, 10));
                const random = Math.floor((Math.random() * 100) + 1);
                const mainFileName = `./category_import_${random}.xlsx`;
                yield this.imageService.writeFile(mainFileName, new Uint8Array(bufferValue));
                const xlsxToJson = yield this.imageService.xlsxToJson(mainFileName);
                const forExport = yield this.bulkImport.categoryValidationAndFormatData(xlsxToJson);
                // Export error files !!
                if (forExport.errorStatus) {
                    const excel = require('exceljs');
                    const workbook = new excel.Workbook();
                    const worksheet = workbook.addWorksheet('Products Sheet');
                    const workSheetColumns = [];
                    const jsonColumns = Object.keys(forExport.data[0]);
                    for (const resultValue of jsonColumns) {
                        workSheetColumns.push({ header: resultValue, key: resultValue, size: 16, width: 30 });
                    }
                    worksheet.columns = workSheetColumns;
                    forExport.data.forEach((row, rowIndex) => {
                        const rowData = {};
                        workSheetColumns.forEach((header) => {
                            rowData[header.key] = row[header.key];
                        });
                        worksheet.addRow(rowData);
                    });
                    fs.unlinkSync(path.join(process.cwd(), mainFileName));
                    // worksheet.addRows(rows);
                    const fileName = './ErrorBulkProduct_' + Date.now() + '.xlsx';
                    yield workbook.xlsx.writeFile(fileName);
                    return response.status(200).send({ status: 1, fileName });
                }
                // Create Category
                for (const data of xlsxToJson) {
                    const ifCategory = yield this.categoryService.findCategory(data === null || data === void 0 ? void 0 : data.Category_Name, 0);
                    if (!ifCategory) {
                        yield (0, product_1.categoryCreate)((0, typeormLoader_1.getDataSource)(), {
                            name: data === null || data === void 0 ? void 0 : data.Category_Name,
                            containerName: data === null || data === void 0 ? void 0 : data.Image,
                            containerPath: 'category/',
                            parentInt: (data === null || data === void 0 ? void 0 : data.Parent_Category) === '' ? 0 : data === null || data === void 0 ? void 0 : data.Parent_Category,
                            industryId: 0,
                            sortOrder: data === null || data === void 0 ? void 0 : data.Sort_Order,
                            categorySlug: data === null || data === void 0 ? void 0 : data.Category_Slug_Name,
                            categoryDescription: data === null || data === void 0 ? void 0 : data.Category_Description,
                            status: data === null || data === void 0 ? void 0 : data.Status,
                        });
                    }
                }
                fs.unlinkSync(path.join(process.cwd(), mainFileName));
                return response.status(200).send({ status: 1, message: 'Categories successfully created' });
            }
            catch (error) {
                console.error('Error:', error);
                return response.status(500).send({ error: 'Internal Server Error', data: error });
            }
        });
    }
};
exports.VendorImportController = VendorImportController;
tslib_1.__decorate([
    (0, routing_controllers_1.Authorized)('vendor'),
    (0, routing_controllers_1.Post)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorImportController.prototype, "productImport", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/error-bulk-import'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('fileName')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorImportController.prototype, "errorBulkProduct", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Authorized)('vendor'),
    (0, routing_controllers_1.Post)('/import-image'),
    tslib_1.__param(0, (0, routing_controllers_1.UploadedFile)('file')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorImportController.prototype, "bulkImageImport", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/category'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.UploadedFile)('file')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorImportController.prototype, "categoryImport", null);
exports.VendorImportController = VendorImportController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/vendor-import-datas'),
    tslib_1.__metadata("design:paramtypes", [ImageService_1.ImageService,
        CategoryService_1.CategoryService,
        BulkImportRequest_1.BulkImport,
        ProductController_1.ProductController,
        S3Service_1.S3Service,
        VendorService_1.VendorService])
], VendorImportController);
//# sourceMappingURL=VendorBulkImportController.js.map