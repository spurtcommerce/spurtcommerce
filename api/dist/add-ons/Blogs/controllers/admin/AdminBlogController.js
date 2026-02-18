"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminBlogController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const Blog_1 = require("../../models/Blog");
const BlogService_1 = require("../../services/BlogService");
const env_1 = require("../../../../src/env");
const CreateBlogRequest_1 = require("./requests/CreateBlogRequest");
const DeleteBlogRequest_1 = require("./requests/DeleteBlogRequest");
const S3Service_1 = require("../../../../src/api/core/services/S3Service");
const ImageService_1 = require("../../../../src/api/core/services/ImageService");
const BlogRelatedService_1 = require("../../services/BlogRelatedService");
const BlogRelated_1 = require("../../models/BlogRelated");
const BlogCategoryService_1 = require("../../services/BlogCategoryService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const fetch = tslib_1.__importStar(require("node-fetch"));
const typedi_1 = require("typedi");
let AdminBlogController = class AdminBlogController {
    constructor(blogService, s3Service, blogRelatedService, blogCategortService, imageService) {
        this.blogService = blogService;
        this.s3Service = s3Service;
        this.blogRelatedService = blogRelatedService;
        this.blogCategortService = blogCategortService;
        this.imageService = imageService;
    }
    // Create Blog
    /**
     * @api {post} /api/blog Add Blog API
     * @apiGroup Blog
     * @apiParam (Request body) {String{..255}} title title
     * @apiParam (Request body) {Number} categoryId category id
     * @apiParam (Request body) {String} description description
     * @apiParam (Request body) {String} [image] image
     * @apiParam (Request body) {Number} status status/isActive
     * @apiParam (Request body) {String} relatedBlogId relatedBlogId
     * @apiParam (Request body) {String} blogSlug blogSlug
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "categoryId" : 1,
     *      "description" : ""
     *      "image" : "",
     *      "status" : "",
     *      "relatedBlogId" : "1",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New blog is created successfully",
     *      "status": "1",
     *      "data": {
     *         "image": "",
     *         "imagePath": "",
     *         "title": "",
     *         "categoryId": 1,
     *         "description": "",
     *         "isActive": "",
     *         "createdBy": "",
     *         "blogSlug": "",
     *         "createdDate": "",
     *         "modifiedBy": "",
     *         "modifiedDate": "",
     *         "id": 1
     *       }
     * }
     * @apiSampleRequest /api/blog
     * @apiErrorExample {json} Add Blog error
     * HTTP/1.1 500 Internal Server Error
     */
    createBlog(blogParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            const category = blogParam.categoryId;
            const getcategory = yield this.blogCategortService.findOne({ where: { blogCategoryId: category } });
            if (!getcategory) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Category Id.',
                };
                return response.status(400).send(errorResponse);
            }
            const image = blogParam.image;
            const newBlog = new Blog_1.Blog();
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
                const path = 'blog/';
                const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((path + name), base64Data, type);
                }
                else {
                    yield this.imageService.imageUpload((path + name), base64Data);
                }
                newBlog.image = name;
                newBlog.imagePath = path;
            }
            newBlog.title = blogParam.title;
            newBlog.categoryId = blogParam.categoryId;
            newBlog.description = (_a = blogParam.description) !== null && _a !== void 0 ? _a : '';
            newBlog.isActive = blogParam.status;
            newBlog.createdBy = request.user.userId;
            const metaTagTitle = blogParam.blogSlug ? blogParam.blogSlug : blogParam.title;
            const slug = metaTagTitle.trim();
            const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            newBlog.blogSlug = yield this.validate_slug(data);
            const blogSave = yield this.blogService.create(newBlog);
            // Add related blog
            if (blogParam.relatedBlogId) {
                const relatedBlog = blogParam.relatedBlogId;
                for (const relatedblog of relatedBlog) {
                    const newBlogRelated = new BlogRelated_1.BlogRelated();
                    newBlogRelated.blogId = blogSave.id;
                    newBlogRelated.relatedBlogId = relatedblog;
                    newBlogRelated.isActive = 1;
                    yield this.blogRelatedService.create(newBlogRelated);
                }
            }
            if (blogSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully created new blog.',
                    data: blogSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to create new blog. ',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Blog List
    /**
     * @api {get} /api/blog Blog List API
     * @apiGroup Blog
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} categoryId categoryId
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Blog list",
     *      "data": [
     *         {
     *        "createdDate": "",
     *        "id": 1,
     *        "title": "",
     *        "categoryId": 1,
     *        "description": "",
     *        "image": "",
     *        "imagePath": "",
     *        "isActive": "",
     *        "blogSlug": "",
     *        "categoryName": ""
     *          }
     *           ]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/blog
     * @apiErrorExample {json} Blog List error
     * HTTP/1.1 500 Internal Server Error
     */
    BlogList(limit, offset, keyword, title, categoryId, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['id', 'title', 'categoryId', 'description', 'image', 'imagePath', 'isActive', 'blogSlug', 'createdDate'];
            const search = [
                {
                    name: 'title',
                    op: 'like',
                    value: keyword,
                }, {
                    name: 'categoryId',
                    op: 'like',
                    value: categoryId,
                }, {
                    name: 'isActive',
                    op: 'where',
                    value: status,
                },
            ];
            if (title === null || title === void 0 ? void 0 : title.trim()) {
                search.push({
                    name: 'title',
                    op: 'like',
                    value: title,
                });
            }
            const WhereConditions = [];
            const getBlogList = yield this.blogService.list(limit, offset, select, search, WhereConditions, [], count);
            if (count) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got blog count',
                    data: getBlogList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const blogList = getBlogList.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const datas = val;
                    const getCategoryName = yield this.blogCategortService.findOne({
                        where: { blogCategoryId: val.categoryId },
                        select: ['name'],
                    });
                    if (getCategoryName) {
                        datas.categoryName = getCategoryName.name;
                    }
                    return datas;
                }));
                const results = yield Promise.all(blogList);
                const successResponse = {
                    status: 1,
                    message: 'Successfully got blog list',
                    data: results,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Update Blog
    /**
     * @api {put} /api/blog/:id Update Blog API
     * @apiGroup Blog
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String{..255}} title title
     * @apiParam (Request body) {Number} categoryId category id
     * @apiParam (Request body) {String} description description
     * @apiParam (Request body) {String} [image] image
     * @apiParam (Request body) {Number} status status/isActive
     * @apiParam (Request body) {String} relatedBlogId relatedBlogId
     * @apiParam (Request body) {String} blogSlug blogSlug
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "categoryId" : 1,
     *      "description" : ""
     *      "image" : "",
     *      "status" : "",
     *      "relatedBlogId" : "1",
     *      "blogSlug" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated blog.",
     *      "status": "1",
     *      "data": {
     *                     "createdDate": "",
     *                     "modifiedBy": "",
     *                     "modifiedDate": "",
     *                     "id": 1,
     *                     "title": "",
     *                     "categoryId": "1",
     *                     "description": "",
     *                     "image": "",
     *                     "imagePath": "",
     *                     "isActive": 1,
     *                     "blogSlug": ""
     *               }
     * }
     * @apiSampleRequest /api/blog/:id
     * @apiErrorExample {json} Update Blog error
     * HTTP/1.1 500 Internal Server Error
     */
    updateBlog(blogId, blogParam, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogService.findOne({ where: { id: blogId } });
            if (!blog) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid blog Id.',
                };
                return response.status(400).send(errorResponse);
            }
            const category = blogParam.categoryId;
            const getcategory = yield this.blogCategortService.findOne({ where: { blogCategoryId: category } });
            if (!getcategory) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Category Id.',
                };
                return response.status(400).send(errorResponse);
            }
            const image = blogParam.image;
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
                const path = 'blog/';
                const base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((path + name), base64Data, type);
                }
                else {
                    yield this.imageService.imageUpload((path + name), base64Data);
                }
                blog.image = name;
                blog.imagePath = path;
            }
            blog.title = blogParam.title;
            blog.categoryId = blogParam.categoryId;
            blog.description = blogParam.description;
            blog.isActive = blogParam.status;
            blog.createdBy = request.user.userId;
            const metaTagTitle = blogParam.blogSlug ? blogParam.blogSlug : blogParam.title;
            const slug = metaTagTitle.trim();
            const data = slug.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            blog.blogSlug = yield this.validate_slug(data);
            const blogSave = yield this.blogService.create(blog);
            const findBlog = yield this.blogRelatedService.findOne({
                where: {
                    blogId: blogSave.id,
                },
            });
            if (findBlog) {
                // delete previous related blog
                this.blogRelatedService.delete({ blogId: blogSave.id });
                // update related blog
                if (blogParam.relatedBlogId) {
                    const relatedBlog = blogParam.relatedBlogId;
                    for (const relatedblog of relatedBlog) {
                        const value = yield this.blogService.findOne({ where: { id: relatedblog } });
                        const newRelatedBlog = new BlogRelated_1.BlogRelated();
                        newRelatedBlog.blogId = blogSave.id;
                        newRelatedBlog.relatedBlogId = relatedblog;
                        newRelatedBlog.isActive = value.isActive;
                        yield this.blogRelatedService.create(newRelatedBlog);
                    }
                }
            }
            else {
                // update related blog
                if (blogParam.relatedBlogId) {
                    const relatedBlogs = blogParam.relatedBlogId;
                    for (const relatedblog of relatedBlogs) {
                        const value = yield this.blogService.findOne({ where: { id: relatedblog } });
                        const newRelatedBlog = new BlogRelated_1.BlogRelated();
                        newRelatedBlog.blogId = blogSave.id;
                        newRelatedBlog.relatedBlogId = relatedblog;
                        newRelatedBlog.isActive = value.isActive;
                        yield this.blogRelatedService.create(newRelatedBlog);
                    }
                }
            }
            if (blogSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated blog.',
                    data: blogSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the blog.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Delete Blog API
    /**
     * @api {delete} /api/blog/:id Delete Blog API
     * @apiGroup Blog
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} id  id
     * @apiParamExample {json} Input
     * {
     * "id" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Blog.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/blog/:id
     * @apiErrorExample {json} Delete Blog error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteBlog(blogId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const dataId = yield this.blogService.findOne({ where: { id: blogId } });
            if (!dataId) {
                const errorResponse = {
                    status: 0,
                    message: 'Please choose a blog that you want to delete. ',
                };
                return response.status(400).send(errorResponse);
            }
            else {
                yield this.blogService.delete({ id: dataId.id });
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted Blog',
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Delete Multiple Blog API
    /**
     * @api {post} /api/blog/delete-multiple-blog Delete Multiple Blog API
     * @apiGroup Blog
     * @apiHeader {String} Authorization
     * @apiParam {Number} blogId Blog Id
     * @apiParamExample {json} Input
     * {
     *   "BlogId" : "1"
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Blog.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/blog/delete-multiple-blog
     * @apiErrorExample {json} Delete multiple Blog error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteMultipleBlog(deleteBlog, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const blogData = deleteBlog.blogId.toString();
            const blog = blogData.split(',');
            const data = blog.map((id) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const dataId = yield this.blogService.findOne({ where: { id } });
                if (!dataId) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid Blog Id.',
                    };
                    return response.status(400).send(errorResponse);
                }
                else {
                    yield this.blogService.delete({ id: dataId.id });
                }
            }));
            const deleteBlogs = yield Promise.all(data);
            if (deleteBlogs) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted blog.',
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    downloadBlogSample(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const Excel = require('exceljs');
            const fs = require('fs');
            const path = require('path');
            const zipfolder = require('zip-a-folder');
            const os = require('os');
            // Create a unique temporary directory
            const tempDir = path.join(os.tmpdir(), `blog-sample-${Date.now()}`);
            const projectRoot = path.join(process.cwd());
            const sourceImagesDir = path.join(projectRoot, 'import-samples', 'blog', 'images');
            const tempContentDir = path.join(tempDir, 'blog-sample-content');
            const tempImagesDir = path.join(tempContentDir, 'images');
            const excelPath = path.join(tempContentDir, 'blogData.xlsx');
            const outputZip = path.join(tempDir, 'Blog.zip');
            try {
                // Create directories if they don't exist
                [sourceImagesDir, tempDir, tempContentDir, tempImagesDir].forEach(dir => {
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir, { recursive: true });
                    }
                });
                // Ensure at least 1 sample image exists
                // const defaultImage = path.join(sourceImagesDir, 'sample-blog.jpg');
                // if (!fs.existsSync(defaultImage)) {
                //     fs.writeFileSync(
                //         defaultImage,
                //         Buffer.from(
                //             'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
                //             'base64'
                //         )
                //     );
                // }
                // Copy all sample images
                const imageFiles = [];
                if (fs.existsSync(sourceImagesDir)) {
                    const files = fs.readdirSync(sourceImagesDir).filter(file => file.match(/\.(jpg|jpeg|png)$/i));
                    for (const file of files) {
                        const src = path.join(sourceImagesDir, file);
                        const dest = path.join(tempImagesDir, file);
                        if (fs.lstatSync(src).isFile()) {
                            fs.copyFileSync(src, dest);
                            imageFiles.push(file);
                        }
                    }
                }
                // Create Excel workbook
                const wb = new Excel.Workbook();
                // Main sheet
                const mainSheet = wb.addWorksheet('Blog_Sheet');
                mainSheet.columns = [
                    { header: 'Title', key: 'title', width: 30 },
                    { header: 'CategoryId', key: 'categoryId', width: 15 },
                    { header: 'Description', key: 'description', width: 40 },
                    { header: 'Status', key: 'status', width: 12 },
                    { header: 'Image', key: 'image', width: 30 },
                    { header: 'RelatedBlogIds', key: 'relatedBlogIds', width: 25 },
                ];
                mainSheet.addRow({});
                // Sample sheet
                // Sample sheet
                const sampleSheet = wb.addWorksheet('Sample_Sheet');
                // Set column widths
                sampleSheet.columns = [
                    { header: 'Title', key: 'title', width: 30 },
                    { header: 'CategoryId', key: 'categoryId', width: 15 },
                    { header: 'Description', key: 'description', width: 50 },
                    { header: 'Status', key: 'status', width: 10 },
                    { header: 'Image', key: 'image', width: 40 },
                    { header: 'RelatedBlogIds', key: 'relatedIds', width: 25 },
                ];
                // Add sample rows
                const sampleImage = imageFiles.length > 0 ? imageFiles[0] : 'sample-blog.jpg';
                sampleSheet.addRow([
                    'Sample Blog Title 1',
                    '1',
                    'Sample blog description',
                    '1',
                    sampleImage,
                    '2,3',
                ]);
                sampleSheet.addRow([
                    'Sample Blog Title 2',
                    '45',
                    'Sample blog description',
                    '1',
                    'https://example.com/sample.jpg',
                    '3,4,5',
                ]);
                // Category list sheet
                const categories = yield this.blogCategortService.list(0, 0, ['blogCategoryId', 'name'], [], [], {}, false);
                const categorySheet = wb.addWorksheet('CategoryList');
                categorySheet.addRow(['CategoryId', 'CategoryName']);
                categories.forEach((cat) => {
                    categorySheet.addRow([cat.blogCategoryId, cat.name]);
                });
                // Related blogs sheet
                const blogs = yield this.blogService.list(0, 0, ['id', 'title'], [], [], {}, false);
                const relatedSheet = wb.addWorksheet('RelatedBlogsList');
                relatedSheet.addRow(['BlogId', 'Title']);
                blogs.forEach((b) => {
                    relatedSheet.addRow([b.id, b.title]);
                });
                // Save Excel file
                yield wb.xlsx.writeFile(excelPath);
                // Create zip file
                yield zipfolder.zip(tempContentDir, outputZip);
                // Set response headers
                response.setHeader('Content-Type', 'application/zip');
                response.setHeader('Content-Disposition', 'attachment; filename=Blog-Sample.zip');
                response.setHeader('Content-Length', fs.statSync(outputZip).size);
                // Create read stream and pipe to response
                const fileStream = fs.createReadStream(outputZip);
                // Clean up after the response is finished
                const cleanup = () => {
                    try {
                        if (fs.existsSync(tempDir)) {
                            fs.rmSync(tempDir, { recursive: true, force: true });
                        }
                    }
                    catch (error) {
                        console.error('Error cleaning up temp files:', error);
                    }
                };
                // Handle response events
                response.on('finish', cleanup);
                response.on('error', cleanup);
                // Pipe the file to the response and return the stream
                return new Promise((resolve) => {
                    fileStream.pipe(response);
                    fileStream.on('end', () => {
                        console.log('File download completed');
                        cleanup();
                        resolve(response);
                    });
                    fileStream.on('error', (error) => {
                        console.error('File stream error:', error);
                        cleanup();
                        resolve(response);
                    });
                });
            }
            catch (error) {
                console.error('Error in downloadBlogSample:', error);
                // Clean up on error
                try {
                    if (fs.existsSync(tempDir)) {
                        fs.rmSync(tempDir, { recursive: true, force: true });
                    }
                }
                catch (cleanupError) {
                    console.error('Error during cleanup:', cleanupError);
                }
                // Only send error response if headers haven't been sent yet
                if (!response.headersSent) {
                    response.status(500).send({
                        status: 0,
                        message: 'Failed to generate sample file: ' + error.message,
                    });
                }
            }
        });
    }
    importBlogData(files, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const StreamZip = require('node-stream-zip');
            const random = Math.floor(Math.random() * 100) + 1;
            const name = files.originalname;
            const type = name.split('.').pop();
            const mainFileName = `./blog_${random}.${type}`;
            const fs = require('fs');
            const path = require('path');
            try {
                // Write the uploaded file
                yield fs.promises.writeFile(mainFileName, files.buffer);
                // Check zip contains valid files
                const zip = new StreamZip({ file: path.join(process.cwd(), mainFileName) });
                const acceptedFiles = ['xlsx'];
                const zipRead = yield new Promise((resolve) => {
                    zip.on('ready', () => {
                        var _a, _b;
                        const errExtension = [];
                        for (const entry of Object.values(zip.entries())) {
                            const entryName = ((_a = Object.values(entry)[16]) === null || _a === void 0 ? void 0 : _a.toString()) || '';
                            // Skip directories and the images folder
                            if (entryName.endsWith('/') || entryName === 'images/') {
                                continue;
                            }
                            const fileExt = (_b = entryName.split('.').pop()) === null || _b === void 0 ? void 0 : _b.toLowerCase();
                            // Only validate files that aren't in the images directory
                            if (fileExt && !acceptedFiles.includes(fileExt) && !entryName.startsWith('images/')) {
                                errExtension.push(fileExt);
                            }
                        }
                        zip.close();
                        resolve(errExtension);
                    });
                });
                if (zipRead.length > 0) {
                    yield this.cleanupFiles(mainFileName, `blog_${random}`);
                    return response.status(400).send({
                        status: 0,
                        message: 'The file you uploaded contains some invalid extensions',
                    });
                }
                // Extract the zip file
                const distPath = path.resolve(`blog_${random}`);
                yield this.imageService.extractZip(mainFileName, distPath);
                const directoryPath = path.join(process.cwd(), `blog_${random}`);
                const mainFiles = fs.readdirSync(directoryPath);
                // Process each file in the extracted directory
                for (const fileName of mainFiles) {
                    const fileExt = (_a = fileName.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                    if (fileExt === 'xlsx' && fileName === 'blogData.xlsx') {
                        const filePath = path.join(directoryPath, fileName);
                        const result = yield this.imageService.xlsxToJson(filePath);
                        // Validate and process blog data
                        for (const blogData of result) {
                            try {
                                if (!blogData.Title || !blogData.Description || !blogData.CategoryId) {
                                    throw new Error('Missing required fields in blog data');
                                }
                                if (blogData.CategoryId) {
                                    const getcategory = yield this.blogCategortService.findOne({ where: { blogCategoryId: blogData.CategoryId } });
                                    if (!getcategory) {
                                        const errorResponse = {
                                            status: 0,
                                            message: 'Invalid Category Id.',
                                        };
                                        return response.status(400).send(errorResponse);
                                    }
                                }
                                const blog = new Blog_1.Blog();
                                blog.title = blogData.Title;
                                blog.description = blogData.Description;
                                blog.categoryId = blogData.CategoryId;
                                blog.isActive = blogData.Status || 1;
                                blog.createdBy = request.user.userId;
                                if (!blogData.blogSlug) {
                                    blog.blogSlug = yield this.generateSlug(blogData.Title);
                                }
                                else {
                                    blog.blogSlug = blogData.blogSlug;
                                }
                                if (blogData.Image) {
                                    try {
                                        // Check if the image is a URL
                                        if (blogData.Image.startsWith('http://') || blogData.Image.startsWith('https://')) {
                                            // Download image from URL
                                            const responses = yield fetch(blogData.Image);
                                            if (!responses.ok) {
                                                throw new Error(`Failed to download image from ${blogData.Image}: ${responses.statusText}`);
                                            }
                                            const imageBuffer = yield responses.buffer();
                                            const contentType = responses.headers.get('content-type');
                                            let imageExt = 'jpg';
                                            if (contentType) {
                                                const match = contentType.match(/\/(jpeg|jpg|png)/);
                                                if (match) {
                                                    imageExt = match[1] === 'jpeg' ? 'jpg' : match[1];
                                                }
                                            }
                                            const imageName = `blog-${Date.now()}-${Math.floor(Math.random() * 1000)}.${imageExt}`;
                                            const imagePath = 'blog/';
                                            if (env_1.env.imageserver === 's3') {
                                                yield this.s3Service.imageUpload((imagePath + imageName), imageBuffer, imageExt);
                                            }
                                            else {
                                                yield this.imageService.imageUpload((imagePath + imageName), imageBuffer);
                                            }
                                            blog.image = imageName;
                                            blog.imagePath = imagePath;
                                        }
                                        else {
                                            blog.image = blogData.Image;
                                            blog.imagePath = 'blog/';
                                        }
                                    }
                                    catch (error) {
                                        console.error(`Error processing image for blog ${blogData.Title || 'unknown'}:`, error);
                                        // Continue without image if there's an error
                                        blog.image = '';
                                        blog.imagePath = '';
                                    }
                                }
                                const savedBlog = yield this.blogService.create(blog);
                                if (blogData.RelatedBlogIds) {
                                    const relatedBlogs = String(blogData.RelatedBlogIds).split(',').map(id => id.trim());
                                    for (const relatedBlogId of relatedBlogs) {
                                        if (relatedBlogId) {
                                            const blogRelated = new BlogRelated_1.BlogRelated();
                                            blogRelated.blogId = savedBlog.id;
                                            blogRelated.relatedBlogId = parseInt(relatedBlogId, 10);
                                            blogRelated.isActive = 1;
                                            yield this.blogRelatedService.create(blogRelated);
                                        }
                                    }
                                }
                            }
                            catch (error) {
                                console.error(`Error processing blog entry: ${error.message}`);
                                continue; // Skip to next blog entry if there's an error
                            }
                        }
                    }
                    else if (fs.statSync(path.join(directoryPath, fileName)).isDirectory() && fileName === 'images') {
                        // Process images directory
                        const imagesPath = path.join(directoryPath, fileName);
                        const imageFiles = fs.readdirSync(imagesPath);
                        const allowedTypes = ['jpg', 'jpeg', 'png'];
                        for (const imageFile of imageFiles) {
                            try {
                                const imagePath = path.join(imagesPath, imageFile);
                                const fileExte = (_b = imageFile.split('.').pop()) === null || _b === void 0 ? void 0 : _b.toLowerCase();
                                // Validate file extension
                                if (!fileExte || !allowedTypes.includes(fileExte)) {
                                    console.warn(`Skipping invalid image type: ${imageFile}`);
                                    continue;
                                }
                                // Read and validate file
                                const stats = yield fs.promises.stat(imagePath);
                                if (stats.size === 0) {
                                    console.warn(`Skipping empty file: ${imageFile}`);
                                    continue;
                                }
                                const imageBuffer = yield fs.promises.readFile(imagePath);
                                const paths = 'blog/';
                                if (env_1.env.imageserver === 's3') {
                                    yield this.s3Service.imageUpload((paths + imageFile), imageBuffer, fileExt);
                                }
                                else {
                                    yield this.imageService.imageUpload((paths + imageFile), imageBuffer);
                                }
                            }
                            catch (error) {
                                console.error(`Error processing image ${imageFile}:`, error);
                                // Continue with next image
                            }
                        }
                    }
                }
                // Cleanup
                yield this.cleanupFiles(mainFileName, `blog_${random}`);
                return response.status(200).send({
                    status: 1,
                    message: 'Blogs imported successfully',
                });
            }
            catch (error) {
                console.error('Error in blog import:', error);
                yield this.cleanupFiles(mainFileName, `blog_${random}`);
                return response.status(400).send({
                    status: 0,
                    message: error.message || 'Failed to import blogs',
                });
            }
        });
    }
    // Blog Detail
    /**
     * @api {get} /api/blog/blog-detail Blog Detail API
     * @apiGroup Blog
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} blogId Blog Id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Blog detail",
     *      "data": {
     *                  "createdBy": "",
     *                  "createdDate": "",
     *                  "modifiedBy": "",
     *                  "modifiedDate": "",
     *                  "id": 1,
     *                  "title": "",
     *                  "categoryId": 1,
     *                  "description": "",
     *                  "image": "",
     *                  "imagePath": "",
     *                  "isActive": "",
     *                  "blogSlug": "",
     *                  "categoryName": "",
     *                  "blogRelated": [
     *                                   {
     *                                       "id": 1,
     *                                       "title": "",
     *                                       "image": "",
     *                                       "imagePath": ""
     *                                   }
     *                                 ]
     *               }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/blog/blog-detail
     * @apiErrorExample {json} Blog Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    BlogDetail(blogId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            const blog = yield this.blogService.findOne({
                where: {
                    id: blogId,
                },
            });
            if (!blog) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Blog Id',
                };
                return response.status(400).send(errorResponse);
            }
            const category = yield this.blogCategortService.findOne({
                where: {
                    blogCategoryId: blog.categoryId,
                },
            });
            if (category) {
                blog.categoryName = category.name;
            }
            blog.blogRelated = yield this.blogRelatedService.findAll({ where: { blogId: blog.id } }).then((val) => {
                const relatedBlog = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const idBlog = value.relatedBlogId;
                    const blogDetail = yield this.blogService.findOne({
                        select: ['id', 'title', 'image', 'imagePath'],
                        where: { id: idBlog },
                    });
                    return (blogDetail);
                }));
                const resultData = Promise.all(relatedBlog);
                return resultData;
            });
            blog.description = (_a = blog.description) !== null && _a !== void 0 ? _a : '';
            const successResponse = {
                status: 1,
                message: 'Successfully got blog list',
                data: blog,
            };
            return response.status(200).send(successResponse);
        });
    }
    generateSlug(title) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            const slugCount = yield this.blogService.checkSlug(slug, 0);
            if (slugCount > 0) {
                slug = `${slug}-${Date.now()}`;
            }
            return slug;
        });
    }
    // Blog Count API
    /**
     * @api {get} /api/blog/blog-count Blog Count API
     * @apiGroup Blog
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get blog count",
     *      "data": {
     *                    "totalBlog": "1",
     *                    "activeBlog": "1",
     *                    "inActiveBlog": "1"
     *               },
     *      "status": 1
     * }
     * @apiSampleRequest /api/blog/blog-count
     * @apiErrorExample {json} Blog Count error
     * HTTP/1.1 500 Internal Server Error
     */
    blogCount(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const blog = {};
            const select = [];
            const search = [];
            const WhereConditions = [];
            const allBlogCount = yield this.blogService.list(0, 0, select, search, WhereConditions, [], 1);
            const whereConditionsActive = [
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
            ];
            const activeBlogCount = yield this.blogService.list(0, 0, select, search, whereConditionsActive, [], 1);
            const whereConditionsInActive = [
                {
                    name: 'isActive',
                    op: 'where',
                    value: 0,
                },
            ];
            const inActiveBlogCount = yield this.blogService.list(0, 0, select, search, whereConditionsInActive, [], 1);
            blog.totalBlog = allBlogCount;
            blog.activeBlog = activeBlogCount;
            blog.inActiveBlog = inActiveBlogCount;
            const successResponse = {
                status: 1,
                message: 'Successfully got the blog count',
                data: blog,
            };
            return response.status(200).send(successResponse);
        });
    }
    validate_slug($slug_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function* ($slug, $id = 0, $count = 0) {
            const slugCount = yield this.blogService.checkSlug($slug, $id, $count);
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
    cleanupFiles(mainFile, tempDir) {
        const fs = require('fs');
        const path = require('path');
        const rimraf = require('rimraf');
        return new Promise((resolve, reject) => {
            // Remove temporary directory
            rimraf(path.join(process.cwd(), tempDir), (err) => {
                if (err) {
                    console.error('Error removing temp directory:', err);
                }
                // Remove main file if it exists
                const mainFilePath = path.join(process.cwd(), mainFile);
                if (fs.existsSync(mainFilePath)) {
                    fs.unlink(mainFilePath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error('Error removing file:', unlinkErr);
                        }
                        resolve();
                    });
                }
                else {
                    resolve();
                }
            });
        });
    }
};
exports.AdminBlogController = AdminBlogController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(['admin', 'create-blogs']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateBlogRequest_1.CreateBlog, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminBlogController.prototype, "createBlog", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(['admin', 'list-blogs']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('title')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('categoryId')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(7, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminBlogController.prototype, "BlogList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-blogs']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateBlogRequest_1.CreateBlog, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminBlogController.prototype, "updateBlog", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'delete-blogs']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminBlogController.prototype, "deleteBlog", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/delete-multiple-blog'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DeleteBlogRequest_1.DeleteBlog, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminBlogController.prototype, "deleteMultipleBlog", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/download-blog-sample'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminBlogController.prototype, "downloadBlogSample", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/import-blog-data'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.UploadedFile)('file')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminBlogController.prototype, "importBlogData", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/blog-detail'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('blogId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminBlogController.prototype, "BlogDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/blog-count'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminBlogController.prototype, "blogCount", null);
exports.AdminBlogController = AdminBlogController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/blog'),
    tslib_1.__metadata("design:paramtypes", [BlogService_1.BlogService,
        S3Service_1.S3Service,
        BlogRelatedService_1.BlogRelatedService,
        BlogCategoryService_1.BlogCategoryService,
        ImageService_1.ImageService])
], AdminBlogController);
//# sourceMappingURL=AdminBlogController.js.map