"use strict";
/*
 * SpurtCommerce API
 * version 4.8.1
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const tslib_1 = require("tslib");
const AWS = tslib_1.__importStar(require("aws-sdk")); // Load the SDK for JavaScript
const routing_controllers_1 = require("routing-controllers");
const CreateFolderNameRequest_1 = require("./requests/CreateFolderNameRequest");
const CreateFileNameRequest_1 = require("./requests/CreateFileNameRequest");
const S3Service_1 = require("../../core/services/S3Service");
const ImageService_1 = require("../../core/services/ImageService");
const env_1 = require("../../../env");
const SettingService_1 = require("../../core/services/SettingService");
const CurrencyService_1 = require("../../core/services/CurrencyService");
const fs = tslib_1.__importStar(require("fs"));
const globPath = tslib_1.__importStar(require("path"));
const DeleteMultipleImage_1 = require("./requests/DeleteMultipleImage");
const MultipleImageUpload_1 = require("./requests/MultipleImageUpload");
AWS.config.update({
    accessKeyId: env_1.aws_setup.AWS_ACCESS_KEY_ID,
    secretAccessKey: env_1.aws_setup.AWS_SECRET_ACCESS_KEY,
    region: env_1.aws_setup.AWS_DEFAULT_REGION,
});
// const s3 = new AWS.S3();
let MediaController = class MediaController {
    constructor(s3Service, imageService, settingService, currencyService) {
        this.s3Service = s3Service;
        this.imageService = imageService;
        this.settingService = settingService;
        this.currencyService = currencyService;
    }
    // Get Bucket Object List API
    /**
     * @api {get} /api/media/bucket-object-list bucket-object-list
     * @apiGroup media
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit list limit
     * @apiParam (Request body) {String} marker from where to list
     * @apiParam (Request body) {String} folderName Specific Folder Name
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "folderName" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get bucket object list!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/media/bucket-object-list
     * @apiErrorExample {json} media error
     * HTTP/1.1 500 Internal Server Error
     */
    ObjectList(folderName, limit, marker, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let val;
            if (env_1.env.imageserver === 's3') {
                val = yield this.s3Service.listBucker(limit, marker, folderName.toLowerCase());
                val.Contents.forEach((item, index) => {
                    const str = item.Key;
                    if (str.charAt(str.length - 1) === '/') {
                        val.Contents.splice(index, 1);
                    }
                });
                val.Contents.sort((a, b) => {
                    return b.LastModified - a.LastModified;
                });
                console.log(JSON.stringify(val.Contents) + 'contents');
            }
            else {
                val = yield this.imageService.listFolders(limit, marker, folderName.toLowerCase());
            }
            if (val) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully get bucket object list',
                    data: val,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Get Bucket Object COUNT API
    /**
     * @api {get} /api/media/bucket-object-count bucket-object-count
     * @apiGroup media
     * @apiParam (Request body) {Number} limit list limit
     * @apiParam (Request body) {Number} marker from where to list
     * @apiParam (Request body) {String} folderName Specific Folder Name
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "folderName" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get bucket object count!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/media/bucket-object-count
     * @apiErrorExample {json} media error
     * HTTP/1.1 500 Internal Server Error
     */
    ObjectCount(folderName, limit, marker, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let isTruncated = true;
            let count = 0;
            while (isTruncated) {
                try {
                    const respons = yield yield this.s3Service.listBucker(limit, marker, folderName);
                    count += respons.Contents.length + respons.CommonPrefixes.length;
                    isTruncated = respons.IsTruncated;
                    if (isTruncated) {
                        marker = respons.Contents.slice(-1)[0].Key;
                    }
                }
                catch (error) {
                    throw error;
                }
            }
            const successResponse = {
                status: 1,
                message: 'Successfully get bucket object list',
                data: { bucketObjectCount: count },
            };
            return response.status(200).send(successResponse);
        });
    }
    // Create Bucket Object --- Like Folder
    /**
     * @api {post} /api/media/create-folder Create Folder
     * @apiGroup media
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} folderName Specific Folder Name
     * @apiParamExample {json} Input
     * {
     *      "folderName" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Created folder!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/media/create-folder
     * @apiErrorExample {json} media error
     * HTTP/1.1 500 Internal Server Error
     */
    CreateFolder(folderNameValidation, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let val;
            if (env_1.env.imageserver === 's3') {
                val = yield this.s3Service.createFolder(folderNameValidation.folderName);
            }
            else {
                val = yield this.imageService.createFolder(folderNameValidation.folderName);
            }
            if (val) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully created the folder.',
                    data: val,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Delete Bucket Object --- Like Folder
    /**
     * @api {post} /api/media/delete-folder delete folder API
     * @apiGroup media
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} folderName Specific Folder Name
     * @apiParamExample {json} Input
     * {
     *      "folderName" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Deleted folder!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/media/delete-folder
     * @apiErrorExample {json} media error
     * HTTP/1.1 500 Internal Server Error
     */
    DeleteFolder(folderNameValidation, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const val = yield this.s3Service.deleteFolder(folderNameValidation.folderName);
            if (val) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the folder.',
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Delete file API
    /**
     * @api {get} /api/media/delete-file delete file API
     * @apiGroup media
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} fileName  File Name
     * @apiParamExample {json} Input
     * {
     *      "fileName" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Deleted file!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/media/delete-file
     * @apiErrorExample {json} media error
     * HTTP/1.1 500 Internal Server Error
     */
    DeleteFile(fileName, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (fileName === '') {
                const successResponse = {
                    status: 0,
                    message: 'Please choose a file.',
                };
                return response.status(400).send(successResponse);
            }
            let val;
            if (env_1.env.imageserver === 's3') {
                val = yield this.s3Service.deleteFile(fileName);
            }
            else {
                val = yield this.imageService.deleteFile(fileName);
            }
            if (val) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the file.',
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    //  Upload Image File
    /**
     * @api {post} /api/media/upload-file  Upload File
     * @apiGroup media
     * @apiParam (Request body) {String} image image
     * @apiParam (Request body) {String} [path] Directory Name
     * @apiParam (Request body) {String} [fileName] fileName
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     *    {
     *      "file":"",
     *      "path" : "",
     *    }
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "message": "Successfully upload file",
     *      "status": "1"
     *    }
     * @apiSampleRequest /api/media/upload-file
     * @apiErrorExample {json} media error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *        "message": "Unable to upload file",
     *        "status": 0,
     *    }
     */
    uploadFile(fileNameRequest, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const base64 = fileNameRequest.image;
            const path = fileNameRequest.path;
            AWS.config.update({ accessKeyId: env_1.aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: env_1.aws_setup.AWS_SECRET_ACCESS_KEY });
            const base64Data = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            const type = base64.split(';')[0].split('/')[1];
            const availableTypes = env_1.env.availImageTypes.split(',');
            if (!availableTypes.includes(type)) {
                const errorTypeResponse = {
                    status: 0,
                    message: 'Only ' + env_1.env.availImageTypes + ' types are allowed',
                };
                return response.status(400).send(errorTypeResponse);
            }
            let name;
            const fileName = fileNameRequest.fileName;
            if (fileName) {
                const originalName = fileName.split('.')[0];
                name = originalName + '_' + Date.now() + '.' + type;
            }
            else {
                name = 'Img_' + Date.now() + '.' + type;
            }
            const stringLength = base64.replace(/^data:image\/\w+;base64,/, '').length;
            const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
            const sizeInKb = sizeInBytes / 1024;
            let val;
            if (+sizeInKb <= 4096) {
                if (env_1.env.imageserver === 's3') {
                    val = yield this.s3Service.imageUpload((path === '' ? name : path + name), base64Data, type);
                }
                else {
                    val = yield this.imageService.imageUpload((path === '' ? name : path + name), base64Data);
                }
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Not able to update as the file size is too large.',
                };
                return response.status(400).send(errorResponse);
            }
            const successResponse = {
                status: 1,
                message: 'Image successfully uploaded.',
                data: {
                    image: name,
                    path: val.path,
                },
            };
            return response.status(200).send(successResponse);
        });
    }
    //  Upload Video File
    /**
     * @api {post} /api/media/upload-video  Upload video
     * @apiGroup media
     * @apiParam (Request body) {String} file File
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     *    {
     *      "file":"",
     *    }
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "message": "Successfully upload file",
     *      "status": "1"
     *    }
     * @apiSampleRequest /api/media/upload-video
     * @apiErrorExample {json} media error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *        "message": "Unable to upload file",
     *        "status": 0,
     *    }
     */
    uploadVideo(files, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const name = files.originalname;
            const path = 'video/';
            let val;
            if (env_1.env.imageserver === 's3') {
                val = yield this.s3Service.videoUpload((path + name), files.buffer, 'multipart/form-data');
            }
            else {
                val = yield this.imageService.videoUpload((path + name), files.buffer);
            }
            const successResponse = {
                status: 1,
                message: 'Video successfully uploaded.',
                data: {
                    image: name,
                    path: val.path,
                },
            };
            return response.status(200).send(successResponse);
        });
    }
    // image resize API
    /**
     * @api {get} /api/media/image-resize  Resize Image On The Fly
     * @apiGroup Resize-Image
     * @apiParam (Request body) {String} width width
     * @apiParam (Request body) {String} height height
     * @apiParam (Request body) {String} name name
     * @apiParam (Request body) {String} path path
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "message": "Successfully resize image",
     *      "status": "1"
     *    }
     *    @apiSampleRequest /api/media/image-resize
     * @apiErrorExample {json} media error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *        "message": "Unable to resize the image",
     *        "status": 0,
     *    }
     */
    image_resize(width, height, name, path, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const widthString = width;
            const heightString = height;
            const imgPath = path;
            const imgName = name;
            const ext = imgName.split('.');
            if (ext[1] === 'jpg' || ext[1] === 'jpeg' || ext[1] === 'png' || ext[1] === 'PNG' || ext[1] === 'JPG') {
                let val;
                if (env_1.env.imageserver === 's3') {
                    val = yield this.s3Service.resizeImage(imgName, imgPath, widthString, heightString);
                }
                else {
                    val = yield this.imageService.resizeImage(imgName, imgPath, widthString, heightString);
                }
                if (val) {
                    return new Promise(() => {
                        response.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        response.write(val, 'binary');
                        response.end(undefined, 'binary');
                    });
                }
                else {
                    return response.status(400).send({ status: 0, message: 'Only jpg/jpeg/png/PNG/JPG formats are allowed for image upload.' });
                }
            }
            else {
                return response.status(400).send({ status: 0, message: 'Only jpg/jpeg/png/PNG/JPG formats are allowed for image upload.' });
            }
        });
    }
    // Get folder API
    /**
     * @api {get} /api/media/search-folder search Folder API
     * @apiGroup media
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} folderName  folderName
     * @apiParamExample {json} Input
     * {
     *      "FolderName" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Folder!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/media/search-folder
     * @apiErrorExample {json} media error
     * HTTP/1.1 500 Internal Server Error
     */
    getFolder(folderName, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let val;
            const originalFileName = folderName.toLowerCase();
            if (env_1.env.imageserver === 's3') {
                const fileName = folderName;
                const firstIndex = fileName[0];
                const array = [];
                array.push(firstIndex.toLowerCase());
                array.push(firstIndex.toUpperCase());
                const initialtData = [];
                const contents = [];
                const commonPrefixes = [];
                const finalContents = [];
                const finalCommonPrefixes = [];
                let i = 1;
                for (const data of array) {
                    val = yield this.s3Service.getFolder(data);
                    if (i === 1) {
                        initialtData.push(val);
                    }
                    i++;
                    contents.push(val.Contents);
                    commonPrefixes.push(val.CommonPrefixes);
                }
                // contents
                for (const data of contents) {
                    for (const values of data) {
                        const strValue = values.Key.toLowerCase();
                        if (strValue.includes(originalFileName)) {
                            finalContents.push(values);
                        }
                    }
                }
                // finalommonPrefixes
                for (const data of commonPrefixes) {
                    for (const values of data) {
                        const strValue = values.Prefix.toLowerCase();
                        if (strValue.includes(originalFileName)) {
                            finalCommonPrefixes.push(values);
                        }
                    }
                }
                const mapping = yield initialtData.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    value.Contents = finalContents;
                    value.CommonPrefixes = finalCommonPrefixes;
                    value.Prefix = folderName;
                    return value;
                }));
                const resultData = yield Promise.all(mapping);
                if (resultData) {
                    const successResponse = {
                        status: 1,
                        message: 'Successfully got folder details',
                        data: resultData[0],
                    };
                    return response.status(200).send(successResponse);
                }
            }
            else {
                val = yield this.imageService.getFolder(folderName);
            }
            if (val) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got folder details',
                    data: val,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Video preview API
    /**
     * @api {get} /api/media/video-preview-s3 video-preview-s3 API
     * @apiGroup media
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} name  name
     * @apiParam (Request body) {String} path  path
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "path" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get video preview!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/media/video-preview-s3
     * @apiErrorExample {json} media error
     * HTTP/1.1 500 Internal Server Error
     */
    video_preview_s3(filename, path, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const directoryPath = globPath.join(process.cwd(), 'uploads' + '/video/' + filename);
            const fileExists = yield fs.existsSync(directoryPath);
            if (fileExists) {
                // file exists
                return new Promise((resolve, reject) => {
                    return response.sendFile(directoryPath, filename);
                });
            }
            const finalPath = String(path[path.length - 1]) === '/' ? path.substring(0, path.length - 1) : path;
            const val = yield this.s3Service.videoFileDownload(finalPath, filename, directoryPath);
            if (val) {
                return new Promise((resolve, reject) => {
                    return response.sendFile(val, filename);
                });
            }
        });
    }
    // Get Settings list API
    /**
     * @api {get} /api/media/get-settings Get Setting common API
     * @apiGroup Settings
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get settings",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/media/get-settings
     * @apiErrorExample {json} getSettings error
     * HTTP/1.1 500 Internal Server Error
     */
    settingsList(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = '';
            const relation = [];
            const WhereConditions = [];
            const limit = 1;
            const settings = yield this.settingService.list(limit, select, relation, WhereConditions);
            const promise = settings.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const currencyData = yield this.currencyService.findOne({ where: { currencyId: result.storeCurrencyId } });
                const temp = result;
                if (currencyData) {
                    temp.currencyCode = currencyData.code;
                    temp.symbolLeft = currencyData.symbolLeft;
                    temp.symbolRight = currencyData.symbolRight;
                }
                else {
                    temp.currencyCode = '';
                    temp.symbolLeft = '';
                    temp.symbolRight = '';
                }
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully get settings',
                data: value,
            };
            return response.status(200).send(successResponse);
        });
    }
    // upload multi image
    /**
     * @api {Post} /api/media/upload-multi-image multi image-upload
     * @apiHeader {String} Authorization
     * @apiGroup media
     * @apiParam (Request body) {String} image image
     * @apiParam (Request body) {String} fileName fileName
     * @apiSuccessExample {json} Success
     * {
     *      "status": "1"
     *      "message": "successfully uploaded the multiple images"
     * }
     * HTTP/1.1 200 OK
     * @apiSampleRequest /api/media/upload-multi-image
     * @apiErrorExample {json} media error
     * HTTP/1.1 500 Internal Server Error
     */
    multiImage(multipleImage, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let val;
            const images = multipleImage.image;
            let result;
            result = images.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const fileName = value.fileName;
                const imgPath = value.path;
                const imageValue = value.image;
                const imageType = imageValue.split(';')[0].split('/')[1];
                const originalName = fileName.split('.')[0];
                const imageName = originalName.toLowerCase() + Date.now() + '.' + imageType;
                const base64Data = Buffer.from(imageValue.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const availableTypes = env_1.env.availImageTypes.split(',');
                const stringLength = imageValue.replace(/^data:image\/\w+;base64,/, '').length;
                AWS.config.update({ accessKeyId: env_1.aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: env_1.aws_setup.AWS_SECRET_ACCESS_KEY });
                if (!availableTypes.includes(imageType)) {
                    const errorTypeResponse = {
                        status: 0,
                        message: 'Only ' + env_1.env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
                const sizeInKb = sizeInBytes / 1024;
                if (+sizeInKb <= 4096) {
                    if (env_1.env.imageserver === 's3') {
                        console.log('hii working s3 service.....');
                        val = yield this.s3Service.imageUpload((imgPath === '' ? imageName : imgPath + imageName), base64Data, imageType);
                    }
                    else {
                        val = yield this.imageService.imageUpload((imgPath === '' ? imageName : imgPath + imageName), base64Data);
                    }
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'Not able to update as the file size is too large.',
                    };
                    return response.status(400).send(errorResponse);
                }
                return val;
            }));
            const PromiseValue = yield Promise.all(result);
            if (PromiseValue) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully upload the image',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'cannot upload the image',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // delete multiple image
    /**
     * @api {Post} /api/media/multiple-delete delete multiple image
     * @apiHeader {String} Authorization
     * @apiGroup media
     * @apiParam (Request body) {String} delete deleting image imgPath
     * @apiSuccessExample {json} Success
     * {
     *      "status": "1",
     *      "message": "successfully delete the multiple images"
     * }
     * HTTP/1.1 200 OK
     * @apiSampleRequest /api/media/multiple-delete
     * @apiErrorExample {json} media error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteMultipleImage(deleteFileNameRequest, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const image = deleteFileNameRequest.delete;
            let val;
            const result = image.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (env_1.env.imageserver === 's3') {
                    val = yield this.s3Service.deleteFile(value.pathName + value.fileName);
                }
                else {
                    val = yield this.imageService.deleteFile(value.pathName + value.fileName);
                }
                return val;
            }));
            const finalResult = yield Promise.all(result);
            if (finalResult) {
                const successResponse = {
                    status: 1,
                    message: 'successfully deleted the multiple images',
                };
                return response.status(200).send(successResponse);
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to delete multiple images',
            };
            return response.status(400).send(errorResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/bucket-object-list'),
    (0, routing_controllers_1.Authorized)('admin'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('folderName')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('marker')),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "ObjectList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/bucket-object-count'),
    (0, routing_controllers_1.Authorized)('admin'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('folderName')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('marker')),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "ObjectCount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/create-folder'),
    (0, routing_controllers_1.Authorized)('admin'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateFolderNameRequest_1.FolderNameRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "CreateFolder", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/delete-folder'),
    (0, routing_controllers_1.Authorized)('admin'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateFolderNameRequest_1.FolderNameRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "DeleteFolder", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/delete-file'),
    (0, routing_controllers_1.Authorized)('admin'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('fileName')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "DeleteFile", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/upload-file'),
    (0, routing_controllers_1.Authorized)('admin'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateFileNameRequest_1.FileNameRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "uploadFile", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/upload-video'),
    (0, routing_controllers_1.Authorized)('admin'),
    tslib_1.__param(0, (0, routing_controllers_1.UploadedFile)('file')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "uploadVideo", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/image-resize'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('width')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('height')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('name')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('path')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "image_resize", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/search-folder'),
    (0, routing_controllers_1.Authorized)('admin'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('folderName')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "getFolder", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/video-preview-s3'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('name')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('path')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "video_preview_s3", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/get-settings'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "settingsList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/upload-multi-image')
    //  @Authorized('admin')
    ,
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [MultipleImageUpload_1.MultipleImageUpload, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "multiImage", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/multiple-delete'),
    (0, routing_controllers_1.Authorized)('admin'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DeleteMultipleImage_1.DeleteMultipleImage, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "deleteMultipleImage", null);
MediaController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/media'),
    tslib_1.__metadata("design:paramtypes", [S3Service_1.S3Service,
        ImageService_1.ImageService,
        SettingService_1.SettingService,
        CurrencyService_1.CurrencyService])
], MediaController);
exports.MediaController = MediaController;
//# sourceMappingURL=MediaController.js.map