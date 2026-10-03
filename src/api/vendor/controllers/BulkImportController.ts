/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { JsonController, Post, Req, Res, Body, Authorized, Get, QueryParam, UploadedFile } from 'routing-controllers';
import { ImageService } from '../../core/services/ImageService';
import { BulkImport } from './requests/BulkImportRequest';
import fs = require('fs');
import * as path from 'path';
import { ProductController } from './ProductController';
import { env } from '../../../env';
import { S3Service } from '../../core/services/S3Service';
import { promisify } from 'util';
import moment from 'moment';
import { CategoryService } from '../../core/services/CategoryService';
import { CategoryPathService } from '../../core/services/CategoryPathService';
const unlinkAsync = promisify(fs.unlink);
const rmdirAsync = promisify(fs.rm);
import { Service } from 'typedi';

@Service()
@JsonController('/import-datas')
export class ImportController {
    constructor(
        private imageService: ImageService,
        private categoryService: CategoryService,
        private bulkImport: BulkImport,
        private productController: ProductController,
        private s3Service: S3Service,
        private categoryPathService: CategoryPathService
    ) { }

    // Bulk Product Import
    /**
     * @api {Post} /api/import-datas Bulk Product Import
     * @apiGroup Bulk Import
     * @apiHeader {string} Authorization
     * @apiParam (Request body) {string} buffer buffer
     * @apiSuccessExample {json} Success
     * {
     *      "status": "1",
     *      "message": "Bulk product data created successfully"
     * },
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/import-datas
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal server error
     */

    @Authorized(['vendor', 'custom-import'])
    @Post()
    public async productImport(@Body({ validate: true }) buffer: any, @Res() response: any, @Req() request: any): Promise<any> {
        try {
            const bufferValue = buffer.buffer;
            const random = Math.floor((Math.random() * 100) + 1);
            const mainFileName = `./import_${random}.xlsx`;
            await this.imageService.writeFile(mainFileName, new Uint8Array(bufferValue));
            const xlsxToJson = await this.imageService.xlsxToJson(mainFileName);
            const forExport = await this.bulkImport.validateAndFormatData(xlsxToJson);
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
                await workbook.xlsx.writeFile(fileName);
                return response.status(200).send({ status: 1, fileName });
            }
            fs.unlinkSync(path.join(process.cwd(), mainFileName));
            const authorization = request.headers.authorization;
            const result = await this.productController.bulkProductImport(xlsxToJson, authorization, request.user.tenantId);
            return response.status(200).send({ status: 1, message: result });
        } catch (error) {
            console.error('Error:', error);
            return response.status(400).send({ status: 0, message: 'Internal Server Error' });
        }
    }
    // Get Error Bulk Product
    /**
     * @api {Get} /api/import-datas/error-bulk-import Bulk Product Import
     * @apiGroup Bulk Import
     * @apiHeader {string} Authorization
     * @apiParam (Request body) {String} file File
     * @apiSuccessExample {file} Success
     *     HTTP/1.1 200 OK
     *     Content-Type: application/octet-stream
     *     Content-Disposition: attachment; filename="export.csv"
     *     ... (binary file content)
     * @apiSampleRequest /api/import-datas/error-bulk-import
     * @apiErrorExample {json} Error
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "error": "Internal server error"
     *     }
     */
    @Authorized('vendor')
    @Get('/error-bulk-import')
    public async errorBulkProduct(@QueryParam('fileName') fileName: string, @Res() response: any, @Req() request: any): Promise<any> {
        return new Promise((resolve, reject) => {
            response.download(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
            });
        });
    }

    // Bulk Image Import
    // Get Error Bulk Product
    /**
     * @api {Post} /api/import-datas/import-image Bulk Image Import
     * @apiGroup Bulk Import
     * @apiHeader {string} Authorization
     * @apiParam (Request body) {String} file File
     * @apiSuccessExample {file} Success
     *     HTTP/1.1 200 OK
     *     Content-Type: application/octet-stream
     *     Content-Disposition: attachment; filename="export.csv"
     *     ... (binary file content)
     * @apiSampleRequest /api/import-datas/import-image
     * @apiErrorExample {json} Error
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "error": "Internal server error"
     *     }
     */
    @Authorized('vendor')
    @Post('/import-image')
    public async bulkImageImport(@UploadedFile('file') file: any, @Res() response: any): Promise<any> {
        const name = file.originalname;
        const filenameArr = name.split('.');
        const random = Math.floor((Math.random() * 100) + 1);
        const mainFileName = `./images_${random}.${filenameArr[1]}`;
        const distPath = path.resolve(`images_${random}`);
        const cleanup = async () => {
            await unlinkAsync(mainFileName).catch((err) => err);
            await rmdirAsync(distPath, { recursive: true }).catch((err) => err);
        };

        try {
            await this.imageService.writeFile(mainFileName, file.buffer);

            if (filenameArr[1] === 'zip') {
                await this.imageService.extractZip(mainFileName, distPath);
                const files = await this.productController.readDir(`${distPath}/${filenameArr[0]}`);

                const availableTypes = env.availImageTypes.split(',');

                for (const fileName of files) {
                    const fileType = fileName.split('.')[1];
                    if (!availableTypes.includes(fileType)) {
                        await cleanup();
                        return response.status(400).send({ status: 0, message: `Only ${env.availImageTypes} types are allowed` });
                    }
                }

                for (const fileName of files) {
                    const imageType = fileName.split('.')[1];
                    const imagePath = `${distPath}/${filenameArr[0]}/${fileName}`;

                    try {
                        const image2base64 = require('image-to-base64');
                        const responsee = await image2base64(imagePath);
                        const base64Data = Buffer.from(responsee, 'base64');

                        if (env.imageserver === 's3') {
                            await this.s3Service.imageUpload(fileName, base64Data, imageType);
                        } else {
                            await this.imageService.imageUpload(fileName, base64Data);
                        }
                    } catch (error) {
                        await cleanup();
                        throw error;
                    }
                }

                await cleanup();
                return response.status(200).send({ status: 1, message: 'Images have been imported successfully.' });
            }
        } catch (err) {
            console.log(err);
            await cleanup();
            return response.status(400).send({ status: 0, message: 'Unable to import the given images.' });
        }
    }
    /**
     * @api {Post} /api/import-datas/category Bulk Product Import
     * @apiGroup Bulk Import
     * @apiHeader {string} Authorization
     * @apiParam (Request body) {string} buffer buffer
     * @apiSuccessExample {json} Success
     * {
     *      "status": "1",
     *      "message": "Categories successfully created !!"
     * },
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/import-datas/category
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal server error
     */
    @Authorized('vendor')
    @Post('/category')
    public async categoryImport(@Body({ validate: true }) payload: any, @Res() response: any, @Req() request: any): Promise<any> {
        try {
            const bufferValue = payload.buffer.split(',').map((value) => parseInt(value, 10));
            const random = Math.floor((Math.random() * 100) + 1);
            const mainFileName = `./category_import_${random}.xlsx`;
            await this.imageService.writeFile(mainFileName, new Uint8Array(bufferValue));
            const xlsxToJson = await this.imageService.xlsxToJson(mainFileName);
            const forExport = await this.bulkImport.categoryValidationAndFormatData(xlsxToJson);

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
                const fileName = './ErrorBulkProduct_' + Date.now() + '.xlsx';
                await workbook.xlsx.writeFile(fileName);
                return response.status(200).send({ status: 1, fileName });
            }

            // Create Category
            for (const data of xlsxToJson) {
                const ifCategory = await this.categoryService.findCategory(data?.Category_Name, 0, request.user.tenantId);
                if (!ifCategory) {
                    const newCategory = {} as any;
                    newCategory.name = data?.Category_Name;
                    newCategory.image = data?.Image;
                    newCategory.imagePath = 'category/';
                    newCategory.parentInt = data?.Parent_Category === '' ? 0 : data?.Parent_Category;
                    newCategory.sortOrder = data?.Sort_Order;
                    newCategory.industryId = 0;
                    const metaTagTitle = data?.Category_Slug_Name ? data?.Category_Slug_Name : data?.Category_Name;
                    const slug = metaTagTitle.trim();
                    const slugData = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                    newCategory.categorySlug = await this.validate_category_slug(slugData, 0, 0, request.user.tenantId);
                    newCategory.isActive = data?.Status;
                    newCategory.categoryDescription = data?.Category_Description ? this.categoryService.escapeChar(data?.Category_Description) : '';
                    newCategory.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    newCategory.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
                    const categorySave: any = await this.categoryService.create(newCategory);

                    const getAllPath: any = await this.categoryPathService.find({
                        where: { categoryId: payload.parentInt },
                        order: { level: 'ASC' },
                    });

                    let level = 0;
                    for (const val of getAllPath) {
                        const CategoryPathLoop = {} as any;
                        CategoryPathLoop.categoryId = categorySave.categoryId;
                        CategoryPathLoop.pathId = val.pathId;
                        CategoryPathLoop.level = level;
                        await this.categoryPathService.create(CategoryPathLoop);
                        level++;
                    }

                    const newCategoryPath = {} as any;
                    newCategoryPath.categoryId = categorySave.categoryId;
                    newCategoryPath.pathId = categorySave.categoryId;
                    newCategoryPath.level = level;
                    await this.categoryPathService.create(newCategoryPath);
                }
            }
            fs.unlinkSync(path.join(process.cwd(), mainFileName));
            return response.status(200).send({ status: 1, message: 'Categories have been successfully created.' });
        } catch (error) {
            console.error('Error:', error);
            return response.status(500).send({ error: 'An internal server error occurred.', data: error });
        }
    }
    @Authorized('vendor')
    @Post('/get-buffer')
    public async checking(@UploadedFile('files') files: any, @Res() response: any): Promise<any> {
        const bufferData: any = {};
        bufferData.originalname = files.originalname;
        bufferData.buffer = files.buffer;
        return response.status(200).send({ status: 1, message: 'Success', data: bufferData });
    }

    public async validate_category_slug(slug: string, id: number = 0, count: number = 0, tenantId: number): Promise<string> {
        const slugCount = await this.categoryService.checkSlugData(slug, id, count, tenantId);
        if (slugCount) {
            if (!count) {
                count = 1;
            } else {
                count++;
            }
            return await this.validate_category_slug(slug, id, count, tenantId);

        } else {
            if (count > 0) {
                slug = slug + count;
            }
            return slug;
        }
    }
}
