"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteMapController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const SiteMapService_1 = require("../../services/SiteMapService");
const UserService_1 = require("../../../../src/api/core/services/UserService");
const SiteMapModel_1 = require("../../models/SiteMapModel");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const CategoryService_1 = require("../../../../src/api/core/services/CategoryService");
const PageService_1 = require("../../../../src/api/core/services/PageService");
const sitemap_1 = require("sitemap");
const stream_1 = require("stream");
const fs = tslib_1.__importStar(require("fs"));
const env_1 = require("../../../../src/env");
const path = tslib_1.__importStar(require("path"));
let SiteMapController = class SiteMapController {
    constructor(siteMapService, userService, productService, categoryService, pageService) {
        this.siteMapService = siteMapService;
        this.userService = userService;
        this.productService = productService;
        this.categoryService = categoryService;
        this.pageService = pageService;
    }
    // Create site map
    /**
     * @api {Post} /api/site-map Create site map
     * @apiGroup Site Map
     * @apiHeader {string} Authorization
     * @apiSuccessExample {json} Success
     * {
     *      "status": "1",
     *      "message": "Successfully created !!"
     * },
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/site-map
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal server error
     */
    createSiteMap(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const userData = yield this.userService.findOne({
                where: {
                    userId: request.user.userId,
                    deleteFlag: 0,
                },
            });
            if (!userData) {
                const errorMessage = {
                    status: 0,
                    message: 'Invalid user !!',
                };
                return response.status(400).send(errorMessage);
            }
            const allURLs = [];
            allURLs.push(env_1.env.storeRedirectUrl);
            const findProduct = yield this.productService.find({ select: ['productSlug'], where: { isActive: 1 } });
            const productDefaultUrl = env_1.env.storeRedirectUrl + '/products/productdetails/';
            findProduct.map((val) => {
                if (val.productSlug) {
                    const productUrl = productDefaultUrl + val.productSlug;
                    allURLs.push(productUrl);
                }
            });
            const findCategory = yield this.categoryService.find({ select: ['categorySlug'], where: { isActive: 1 } });
            const categoryDefaultUrl = env_1.env.storeRedirectUrl + '/products/';
            findCategory.map((val) => {
                if (val.categorySlug) {
                    const categoryUrl = categoryDefaultUrl + val.categorySlug;
                    allURLs.push(categoryUrl);
                }
            });
            const findPages = yield this.pageService.find({ select: ['slugName'], where: { isActive: 1 } });
            const pageDefaultUrl = env_1.env.storeRedirectUrl + '/page-detail/';
            findPages.map((val) => {
                if (val.slugName) {
                    const pagesUrl = pageDefaultUrl + val.slugName;
                    allURLs.push(pagesUrl);
                }
            });
            const arr = ['/auth/sign-in', '/auth/sign-up', '/contact', '/vendor', '/wishlist'];
            arr.map((val) => {
                if (val) {
                    const staticUrl = env_1.env.storeRedirectUrl + val;
                    allURLs.push(staticUrl);
                }
            });
            if (allURLs) {
                const currentDate = Date.now();
                const pathName = 'sitemap/';
                const fileName = 'sitemap_' + currentDate + '.xml';
                yield this.urlsToSitemap(env_1.env.storeRedirectUrl, allURLs.sort(), pathName, fileName);
                const newSiteMap = new SiteMapModel_1.SiteMap();
                newSiteMap.userId = userData.userId;
                newSiteMap.userName = userData.firstName + ' ' + userData.lastName;
                newSiteMap.pathName = pathName;
                newSiteMap.fileName = fileName;
                const createSiteMap = yield this.siteMapService.create(newSiteMap);
                if (createSiteMap) {
                    const successExample = {
                        status: 1,
                        message: 'Successfully created !!',
                        data: createSiteMap,
                    };
                    return response.status(200).send(successExample);
                }
                const errorResponse = {
                    status: 0,
                    message: 'Unable to created the data !!',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // List the site map
    /**
     * @api {Get} /api/site-map Site map list
     * @apiGroup Site Map
     * @apiHeader {string} Authorization
     * @apiSuccessExample {json} Success
     * {
     *      "status": "1",
     *      "message": "Successfully got the list !!"
     * },
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/site-map
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal server error
     */
    listSiteMap(limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const siteMapList = yield this.siteMapService.list(limit, offset, [], [], [], count);
            if (count) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the count !!',
                    count: siteMapList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the list !!',
                    data: siteMapList,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Delete the site map
    /**
     * @api {Delete} /api/site-map/:id Delete site map
     * @apiGroup Site Map
     * @apiHeader {string} Authorization
     * @apiSuccessExample {json} Success
     * {
     *      "status": "1",
     *      "message": "Successfully Deleted the data !!"
     * },
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/site-map/:id
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal server error
     */
    deleteSiteMap(id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deleteData = yield this.siteMapService.delete(id);
            if (deleteData) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully Deleted the data !!',
                };
                return response.status(200).send(successResponse);
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to Deleted the data !!',
            };
            return response.status(400).send(errorResponse);
        });
    }
    // Download SiteMap API
    /**
     * @api {Get} /api/site-map/get-sitemap Get Sitemap API
     * @apiGroup Site Map
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} pathName pathName
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Get the Sitemap..!",
     *      "status": "1"
     *       "data":{}
     * }
     * @apiSampleRequest /api/site-map/get-sitemap
     * @apiErrorExample {json} Get Profile error
     * HTTP/1.1 500 Internal Server Error
     */
    // Get Profile Function
    getSitempap(pathName, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const pathDir = path.join(process.cwd(), pathName);
                response.download(pathDir, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        return response.end();
                    }
                });
            });
        });
    }
    urlsToSitemap(URL, allURLs, pathName, fileName) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const links = allURLs.map((url) => {
                return { url, changefreq: 'weekly', priority: 0.5 };
            });
            const stream = new sitemap_1.SitemapStream({ hostname: URL });
            const data = yield (0, sitemap_1.streamToPromise)(stream_1.Readable.from(links).pipe(stream));
            return new Promise((resolve, reject) => {
                const filePath = pathName + '/' + fileName;
                fs.writeFile(filePath, data.toString(), (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log('sitemap created');
                    resolve('sitemap created');
                });
            });
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Post)(),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SiteMapController.prototype, "createSiteMap", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Get)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SiteMapController.prototype, "listSiteMap", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Delete)('/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SiteMapController.prototype, "deleteSiteMap", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/get-sitemap'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('pathName')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SiteMapController.prototype, "getSitempap", null);
SiteMapController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/site-map'),
    tslib_1.__metadata("design:paramtypes", [SiteMapService_1.SiteMapService,
        UserService_1.UserService,
        ProductService_1.ProductService,
        CategoryService_1.CategoryService,
        PageService_1.PageService])
], SiteMapController);
exports.SiteMapController = SiteMapController;
//# sourceMappingURL=SiteMapController.js.map