"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const BannerService_1 = require("../../core/services/BannerService");
const env_1 = require("../../../env");
const Banner_1 = require("../../core/models/Banner");
const CreateBannerRequest_1 = require("./requests/CreateBannerRequest");
const UpdateBannerRequest_1 = require("./requests/UpdateBannerRequest");
const S3Service_1 = require("../../core/services/S3Service");
const ImageService_1 = require("../../core/services/ImageService");
const DeleteBannerRequest_1 = require("./requests/DeleteBannerRequest");
const fs = tslib_1.__importStar(require("fs"));
const ProductService_1 = require("../../core/services/ProductService");
const CategoryService_1 = require("../../core/services/CategoryService");
let BannerController = class BannerController {
    constructor(bannerService, s3Service, imageService, productService, categoryService) {
        this.bannerService = bannerService;
        this.s3Service = s3Service;
        this.imageService = imageService;
        this.productService = productService;
        this.categoryService = categoryService;
    }
    // Create Banner
    /**
     * @api {post} /api/banner Add Banner API
     * @apiGroup Banner
     * @apiParam (Request body) {String{..255}} title title
     * @apiParam (Request body) {String} [content] content
     * @apiParam (Request body) {String} image image
     * @apiParam (Request body) {String} [link] link
     * @apiParam (Request body) {String} [position] position
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} [linkType] linkType
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "content" : "",
     *      "image" : "",
     *      "link" : "",
     *      "position" : "",
     *      "status" : "",
     *      "linkType" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New banner is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/banner
     * @apiErrorExample {json} Banner error
     * HTTP/1.1 500 Internal Server Error
     */
    createBanner(bannerParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (+bannerParam.linkType !== 1 && (bannerParam.link === undefined || bannerParam.link === '')) {
                return response.status(400).send({
                    status: 0,
                    message: 'link is required',
                });
            }
            const image = bannerParam.image;
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
                const path = 'banner/';
                const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((path + name), base64Data, type);
                }
                else {
                    yield this.imageService.imageUpload((path + name), base64Data);
                }
                const newBanner = new Banner_1.Banner();
                newBanner.title = bannerParam.title;
                newBanner.content = bannerParam.content;
                newBanner.image = name;
                newBanner.imagePath = path;
                let link;
                link = bannerParam.link;
                if (+bannerParam.linkType === 2) {
                    const product = yield this.productService.findOne({
                        where: {
                            productSlug: link,
                        },
                    });
                    if (!product) {
                        return response.status(400).send({
                            status: 0,
                            message: 'Invalid product slug.',
                        });
                    }
                    newBanner.linkType = bannerParam.linkType;
                }
                else if (+bannerParam.linkType === 3) {
                    const category = yield this.categoryService.findOne({
                        where: {
                            categorySlug: link,
                        },
                    });
                    if (!category) {
                        return response.status(400).send({
                            status: 0,
                            message: 'Invalid category slug',
                        });
                    }
                    newBanner.linkType = bannerParam.linkType;
                }
                else {
                    newBanner.linkType = bannerParam.linkType;
                }
                newBanner.link = link;
                newBanner.position = bannerParam.position;
                newBanner.isActive = bannerParam.status;
                const bannerSave = yield this.bannerService.create(newBanner);
                if (bannerSave) {
                    const successResponse = {
                        status: 1,
                        message: 'Successfully created new banner.',
                        data: bannerSave,
                    };
                    return response.status(200).send(successResponse);
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'Unable to create new banner. ',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
        });
    }
    // Banner List
    /**
     * @api {get} /api/banner Banner List API
     * @apiGroup Banner
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got banner list",
     *      "data":"{
     *      "bannerId": "",
     *      "title": "",
     *      "content": "",
     *      "image": "",
     *      "imagePath": "",
     *      "link": "",
     *      "position": "",
     *      }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/banner
     * @apiErrorExample {json} Banner error
     * HTTP/1.1 500 Internal Server Error
     */
    bannerList(limit, offset, keyword, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['bannerId', 'title', 'image', 'imagePath', 'content', 'link', 'position', 'isActive', 'linkType'];
            const search = [
                {
                    name: 'title',
                    op: 'like',
                    value: keyword,
                }, {
                    name: 'isActive',
                    op: 'like',
                    value: status,
                },
            ];
            const WhereConditions = [];
            const bannerList = yield this.bannerService.list(limit, offset, select, search, WhereConditions, count);
            if (count) {
                const successRes = {
                    status: 1,
                    message: 'Successfully got banner count',
                    data: bannerList,
                };
                return response.status(200).send(successRes);
            }
            const list = bannerList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                if (+temp.linkType === 2) {
                    const productRedirectUrl = env_1.env.productRedirectUrl;
                    temp.link = productRedirectUrl.concat(temp.link);
                }
                else if (+temp.linkType === 3) {
                    const categoryRedirectUrl = env_1.env.categoryRedirectUrl;
                    temp.link = categoryRedirectUrl.concat(temp.link);
                }
                else {
                    temp.link = temp.link;
                }
                return temp;
            }));
            const result = yield Promise.all(list);
            const successResponse = {
                status: 1,
                message: 'Successfully got banner list',
                data: result,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Delete Banner
    /**
     * @api {delete} /api/banner/:id Delete Banner API
     * @apiGroup Banner
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "bannerId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Banner.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/banner/:id
     * @apiErrorExample {json} Banner error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteBanner(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const banner = yield this.bannerService.findOne({
                where: {
                    bannerId: id,
                },
            });
            if (!banner) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Banner Id.',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteBanner = yield this.bannerService.delete(banner);
            if (deleteBanner) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted banner.',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to delete banner.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Update Banner
    /**
     * @api {put} /api/banner/:id Update Banner API
     * @apiGroup Banner
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} bannerId Banner bannerId
     * @apiParam (Request body) {String{..255}} title Banner title
     * @apiParam (Request body) {String} image Banner image
     * @apiParam (Request body) {String} [content] Banner content
     * @apiParam (Request body) {String{..255}} [link] Banner link
     * @apiParam (Request body) {Number} [position] Banner position
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} [linkType] 1--> static 2--> product 3--> category
     * @apiParamExample {json} Input
     * {
     *      "bannerId" : "",
     *      "title" : "",
     *      "image" : "",
     *      "content" : "",
     *      "link" : "",
     *      "position" : "",
     *      "status" : "",
     *      "linkType" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated banner.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/banner/:id
     * @apiErrorExample {json} Banner error
     * HTTP/1.1 500 Internal Server Error
     */
    updateBanner(bannerParam, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (+bannerParam.linkType !== 1 && (bannerParam.link === undefined || bannerParam.link === '')) {
                return response.status(400).send({
                    status: 0,
                    message: 'link is required',
                });
            }
            const banner = yield this.bannerService.findOne({
                where: {
                    bannerId: bannerParam.bannerId,
                },
            });
            if (!banner) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Banner Id.',
                };
                return response.status(400).send(errorResponse);
            }
            const image = bannerParam.image;
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
                const path = 'banner/';
                const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((path + name), base64Data, type);
                }
                else {
                    yield this.imageService.imageUpload((path + name), base64Data);
                }
                banner.image = name;
                banner.imagePath = path;
            }
            banner.title = bannerParam.title;
            banner.content = bannerParam.content;
            let link;
            link = bannerParam.link;
            if (+bannerParam.linkType === 2) {
                const product = yield this.productService.findOne({
                    where: {
                        productSlug: link,
                    },
                });
                if (!product) {
                    return response.status(400).send({
                        status: 0,
                        message: 'Invalid product slug.',
                    });
                }
                banner.linkType = bannerParam.linkType;
            }
            else if (+bannerParam.linkType === 3) {
                const category = yield this.categoryService.findOne({
                    where: {
                        categorySlug: link,
                    },
                });
                if (!category) {
                    return response.status(400).send({
                        status: 0,
                        message: 'Invalid category slug',
                    });
                }
                banner.linkType = bannerParam.linkType;
            }
            else {
                banner.linkType = bannerParam.linkType;
            }
            banner.link = link;
            banner.position = bannerParam.position;
            banner.isActive = bannerParam.status;
            const bannerSave = yield this.bannerService.create(banner);
            if (bannerSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated banner.',
                    data: bannerSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the banner. ',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Delete Multiple Banner API
    /**
     * @api {post} /api/banner/delete-banner Delete Multiple Banner API
     * @apiGroup Banner
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} bannerId  bannerId
     * @apiParamExample {json} Input
     * {
     * "bannerId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Banner.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/banner/delete-banner
     * @apiErrorExample {json} bannerDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteMultipleBanner(bannerDelete, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const bannerIdNo = bannerDelete.bannerId.toString();
            const bannerid = bannerIdNo.split(',');
            for (const id of bannerid) {
                const dataId = yield this.bannerService.findOne(id);
                if (dataId === undefined) {
                    const errorResponse = {
                        status: 0,
                        message: 'Please choose a banner that you want to delete.',
                    };
                    return response.status(400).send(errorResponse);
                }
                else {
                    const deleteBannerId = parseInt(id, 10);
                    yield this.bannerService.delete(deleteBannerId);
                }
            }
            const successResponse = {
                status: 1,
                message: 'Successfully deleted Banner.',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Banner Count API
    /**
     * @api {get} /api/banner/banner-count Banner Count API
     * @apiGroup Banner
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get banner count",
     *      "data":{},
     *      "status": "1"
     * }
     * @apiSampleRequest /api/banner/banner-count
     * @apiErrorExample {json} Banner error
     * HTTP/1.1 500 Internal Server Error
     */
    bannerCount(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const banner = {};
            const select = [];
            const search = [];
            const WhereConditions = [];
            const allBannerCount = yield this.bannerService.list(0, 0, select, search, WhereConditions, 1);
            const whereConditionsActive = [
                {
                    name: 'isActive',
                    op: 'like',
                    value: 1,
                },
            ];
            const activeBannerCount = yield this.bannerService.list(0, 0, select, search, whereConditionsActive, 1);
            const whereConditionsInActive = [
                {
                    name: 'isActive',
                    op: 'like',
                    value: 0,
                },
            ];
            const inActiveBannerCount = yield this.bannerService.list(0, 0, select, search, whereConditionsInActive, 1);
            banner.totalBanner = allBannerCount;
            banner.activeBanner = activeBannerCount;
            banner.inActiveBanner = inActiveBannerCount;
            const successResponse = {
                status: 1,
                message: 'Successfully got the banner count',
                data: banner,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Blog Detail
    /**
     * @api {get} /api/banner/banner-detail Banner Detail API
     * @apiGroup Banner
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} bannerId BannerId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Banner detail",
     *      "data": "{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/banner/banner-detail
     * @apiErrorExample {json} banner Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    BannerDetail(bannerId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const banner = yield this.bannerService.findOne({
                where: {
                    bannerId,
                },
            });
            if (!banner) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Banner Id',
                };
                return response.status(400).send(errorResponse);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got banner detail',
                data: banner,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Banner Excel Document download
    /**
     * @api {get} /api/banner/banner-excel-list Banner Excel
     * @apiGroup Banner
     * @apiParam (Request body) {String} bannerId bannerId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Banner Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/banner/banner-excel-list
     * @apiErrorExample {json} banner Excel List error
     * HTTP/1.1 500 Internal Server Error
     */
    bannerView(bannerId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('banner excel Sheet');
            const rows = [];
            if (bannerId === '') {
                const errorResponse = {
                    status: 0,
                    message: 'choose atleast one banner',
                };
                return response.status(400).send(errorResponse);
            }
            const bannerid = bannerId.split(',');
            for (const id of bannerid) {
                const dataId = yield this.bannerService.findOne({ where: { bannerId: id } });
                if (dataId === undefined) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid bannerId',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            // Excel sheet column define
            worksheet.columns = [
                { header: 'title', key: 'title', size: 16, width: 15 },
                { header: 'link', key: 'link', size: 16, width: 15 },
                { header: 'position', key: 'position', size: 16, width: 15 },
                { header: 'image url', key: 'image', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            for (const id of bannerid) {
                const dataId = yield this.bannerService.findOne(id);
                const image = env_1.env.imageUrl + '?path=' + dataId.imagePath + '&name=' + dataId.image + '&width=100&height=100';
                rows.push([dataId.title, dataId.link, dataId.position, image]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './BannerExcel_' + Date.now() + '.xlsx';
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
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(['admin', 'create-banners']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateBannerRequest_1.CreateBanner, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BannerController.prototype, "createBanner", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(['admin', 'list-banners']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BannerController.prototype, "bannerList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BannerController.prototype, "deleteBanner", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-banners']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateBannerRequest_1.UpdateBanner, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BannerController.prototype, "updateBanner", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/delete-banner'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-banners']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DeleteBannerRequest_1.DeleteBannerRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BannerController.prototype, "deleteMultipleBanner", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/banner-count'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BannerController.prototype, "bannerCount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/banner-detail'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('bannerId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BannerController.prototype, "BannerDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/banner-excel-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('bannerId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BannerController.prototype, "bannerView", null);
BannerController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/banner'),
    tslib_1.__metadata("design:paramtypes", [BannerService_1.BannerService, S3Service_1.S3Service,
        ImageService_1.ImageService, ProductService_1.ProductService, CategoryService_1.CategoryService])
], BannerController);
exports.BannerController = BannerController;
//# sourceMappingURL=BannerController.js.map