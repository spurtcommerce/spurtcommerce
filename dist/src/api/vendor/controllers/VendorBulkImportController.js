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
const typeorm_1 = require("typeorm");
const product_1 = require("@spurtcommerce/product");
const CategoryService_1 = require("../../core/services/CategoryService");
const unlinkAsync = (0, util_1.promisify)(fs.unlink);
const rmdirAsync = (0, util_1.promisify)(fs.rm);
let VendorImportController = class VendorImportController {
    constructor(
    // private exportLogService: ExportLogService,
    imageService, categoryService, bulkImport, productController, s3Service) {
        this.imageService = imageService;
        this.categoryService = categoryService;
        this.bulkImport = bulkImport;
        this.productController = productController;
        this.s3Service = s3Service;
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
    productImport(file, buffer, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                // const bufferValue = file.buffer;
                const bufferValue = buffer.buffer.split(',').map((value) => parseInt(value, 10));
                const random = Math.floor((Math.random() * 100) + 1);
                const mainFileName = `./import_${random}.xlsx`;
                yield this.imageService.writeFile(mainFileName, new Uint8Array(bufferValue));
                const xlsxToJson = yield this.imageService.xlsxToJson(mainFileName);
                const forExport = yield this.bulkImport.validateAndFormatData(xlsxToJson);
                const excel = require('exceljs');
                const workbook = new excel.Workbook();
                const worksheet = workbook.addWorksheet('Products Sheet');
                const workSheetColumns = [];
                const jsonColumns = Object.keys(forExport.data[0]);
                for (const resultValue of jsonColumns) {
                    workSheetColumns.push({ header: resultValue, key: resultValue, size: 16, width: 30 });
                }
                worksheet.columns = workSheetColumns;
                if (forExport.errorStatus) {
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
                    return response.status(200).send({ status: 1, fileName });
                }
                fs.unlinkSync(path.join(process.cwd(), mainFileName));
                const addVendorId = xlsxToJson.map((value) => {
                    const temp = value;
                    temp.VendorId = request.user.vendorId;
                    return temp;
                });
                const authorization = request.headers.authorization;
                const result = yield this.productController.bulkProductImport(addVendorId, authorization);
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
            const name = file.originalname;
            const filenameArr = name.split('.');
            const random = Math.floor((Math.random() * 100) + 1);
            const mainFileName = `./images_${random}.${filenameArr[1]}`;
            const distPath = path.resolve(`images_${random}`);
            const cleanup = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield unlinkAsync(mainFileName).catch((err) => err);
                yield rmdirAsync(distPath, { recursive: true }).catch((err) => err);
            });
            try {
                yield this.imageService.writeFile(mainFileName, file.buffer);
                if (filenameArr[1] === 'zip') {
                    yield this.imageService.extractZip(mainFileName, distPath);
                    const files = yield this.productController.readDir(`${distPath}/${filenameArr[0]}`);
                    const availableTypes = env_1.env.availImageTypes.split(',');
                    for (const fileName of files) {
                        const fileType = fileName.split('.')[1];
                        if (!availableTypes.includes(fileType)) {
                            yield cleanup();
                            return response.status(400).send({ status: 0, message: `Only ${env_1.env.availImageTypes} types are allowed` });
                        }
                    }
                    for (const fileName of files) {
                        const imageType = fileName.split('.')[1];
                        const imagePath = `${distPath}/${filenameArr[0]}/${fileName}`;
                        try {
                            const image2base64 = require('image-to-base64');
                            const responsee = yield image2base64(imagePath);
                            const base64Data = Buffer.from(responsee, 'base64');
                            if (env_1.env.imageserver === 's3') {
                                yield this.s3Service.imageUpload(fileName, base64Data, imageType);
                            }
                            else {
                                yield this.imageService.imageUpload(fileName, base64Data);
                            }
                        }
                        catch (error) {
                            yield cleanup();
                            throw error;
                        }
                    }
                    yield cleanup();
                    return response.status(200).send({ status: 1, message: 'Given images imported successfully' });
                }
            }
            catch (err) {
                console.log(err);
                yield cleanup();
                return response.status(400).send({ status: 0, message: 'Unable to import given images' });
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
                        yield (0, product_1.categoryCreate)((0, typeorm_1.getConnection)(), {
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
tslib_1.__decorate([
    (0, routing_controllers_1.Authorized)('vendor'),
    (0, routing_controllers_1.Post)(),
    tslib_1.__param(0, (0, routing_controllers_1.UploadedFile)('file')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object]),
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
VendorImportController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/vendor-import-datas'),
    tslib_1.__metadata("design:paramtypes", [ImageService_1.ImageService,
        CategoryService_1.CategoryService,
        BulkImportRequest_1.BulkImport,
        ProductController_1.ProductController,
        S3Service_1.S3Service])
], VendorImportController);
exports.VendorImportController = VendorImportController;
//# sourceMappingURL=VendorBulkImportController.js.map