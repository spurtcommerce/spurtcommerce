/*
 * SpurtCommerce API
 * version 4.8.0
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import * as AWS from 'aws-sdk'; // Load the SDK for JavaScript
import { Authorized, Body, Get, JsonController, Post, QueryParam, Req, Res, UploadedFile } from 'routing-controllers';
import { FolderNameRequest } from './requests/CreateFolderNameRequest';
import { FileNameRequest } from './requests/CreateFileNameRequest';
import { S3Service } from '../../core/services/S3Service';
import { ImageService } from '../../core/services/ImageService';
import { aws_setup, env } from '../../../env';
import { SettingService } from '../../core/services/SettingService';
import { CurrencyService } from '../../core/services/CurrencyService';
import * as fs from 'fs';
import * as globPath from 'path';
import { DeleteMultipleImage } from './requests/DeleteMultipleImage';
import { MultipleImageUpload } from './requests/MultipleImageUpload';

AWS.config.update({
    accessKeyId: aws_setup.AWS_ACCESS_KEY_ID,
    secretAccessKey: aws_setup.AWS_SECRET_ACCESS_KEY,
    region: aws_setup.AWS_DEFAULT_REGION,
});

@JsonController('/media')
export class MediaController {
    constructor(private s3Service: S3Service,
                private imageService: ImageService,
                private settingService: SettingService,
                private currencyService: CurrencyService) {
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
    @Get('/bucket-object-list')
    @Authorized('admin')
    public async ObjectList(@QueryParam('folderName') folderName: string, @QueryParam('limit') limit: number, @QueryParam('marker') marker: string, @Req() request: any, @Res() response: any): Promise<any> {
        let val: any;
        if (env.imageserver === 's3') {
            val = await this.s3Service.listBucker(limit, marker, folderName.toLowerCase());
            val.Contents.forEach((item, index) => {
                const str = item.Key;
                if (str.charAt(str.length - 1) === '/') {
                    val.Contents.splice(index, 1);
                }
            });
            val.Contents.sort((a: any, b: any) => {
                return b.LastModified - a.LastModified;
            });
        } else {
            val = await this.imageService.listFolders(limit, marker, folderName.toLowerCase());
        }
        if (val) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get bucket object list',
                data: val,
            };
            return response.status(200).send(successResponse);
        }
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
    @Get('/bucket-object-count')
    @Authorized('admin')
    public async ObjectCount(@QueryParam('folderName') folderName: string, @QueryParam('limit') limit: number, @QueryParam('marker') marker: string, @Req() request: any, @Res() response: any): Promise<any> {
        let isTruncated = true;
        let count: any = 0;
        while (isTruncated) {
            try {
                const respons = await await this.s3Service.listBucker(limit, marker, folderName);
                count += respons.Contents.length + respons.CommonPrefixes.length;
                isTruncated = respons.IsTruncated;
                if (isTruncated) {
                    marker = respons.Contents.slice(-1)[0].Key;
                }
            } catch (error) {
                throw error;
            }
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully get bucket object list',
            data: { bucketObjectCount: count },
        };
        return response.status(200).send(successResponse);
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
    @Post('/create-folder')
    @Authorized('admin')
    public async CreateFolder(@Body({ validate: true }) folderNameValidation: FolderNameRequest, @Req() request: any, @Res() response: any): Promise<any> {
        let val: any;
        if (env.imageserver === 's3') {
            val = await this.s3Service.createFolder(folderNameValidation.folderName);
        } else {
            val = await this.imageService.createFolder(folderNameValidation.folderName);
        }
        if (val) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created the folder.',
                data: val,
            };
            return response.status(200).send(successResponse);
        }
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
    @Post('/delete-folder')
    @Authorized('admin')
    public async DeleteFolder(@Body({ validate: true }) folderNameValidation: FolderNameRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const val: any = await this.s3Service.deleteFolder(folderNameValidation.folderName);
        if (val) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the folder.',
            };
            return response.status(200).send(successResponse);
        }
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
    @Get('/delete-file')
    @Authorized('admin')
    public async DeleteFile(@QueryParam('fileName') fileName: string, @Req() request: any, @Res() response: any): Promise<any> {
        if (fileName === '') {
            const successResponse: any = {
                status: 0,
                message: 'Please choose a file.',
            };
            return response.status(400).send(successResponse);
        }
        let val: any;
        if (env.imageserver === 's3') {
            val = await this.s3Service.deleteFile(fileName);
        } else {
            val = await this.imageService.deleteFile(fileName);
        }
        if (val) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the file.',
            };
            return response.status(200).send(successResponse);
        }
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
    @Post('/upload-file')
    @Authorized('admin')
    public async uploadFile(@Body({ validate: true }) fileNameRequest: FileNameRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const base64 = fileNameRequest.image;
        const path = fileNameRequest.path;
        AWS.config.update({ accessKeyId: aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: aws_setup.AWS_SECRET_ACCESS_KEY });
        const base64Data = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        const type = base64.split(';')[0].split('/')[1];
        const availableTypes = env.availImageTypes.split(',');
                if (!availableTypes.includes(type)) {
                    const errorTypeResponse: any = {
                        status: 0,
                        message: 'Only ' + env.availImageTypes + ' types are allowed',
                    };
                    return response.status(400).send(errorTypeResponse);
                }
                let name;
                const fileName = fileNameRequest.fileName;
                if (fileName) {
                    const originalName = fileName.split('.')[0];
                    name = originalName + '_' + Date.now() + '.' + type;
                } else {
         name = 'Img_' + Date.now() + '.' + type;
        }
        const stringLength = base64.replace(/^data:image\/\w+;base64,/, '').length;
        const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
        const sizeInKb = sizeInBytes / 1024;
        let val: any;
        if (+sizeInKb <= 4096) {
            if (env.imageserver === 's3') {
                val = await this.s3Service.imageUpload((path === '' ? name : path + name), base64Data, type);
            } else {
                val = await this.imageService.imageUpload((path === '' ? name : path + name), base64Data);
            }
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Not able to update as the file size is too large.',
            };
            return response.status(400).send(errorResponse);
        }
        const successResponse: any = {
            status: 1,
            message: 'Image successfully uploaded.',
            data: {
                image: name,
                path: val.path,
            },
        };
        return response.status(200).send(successResponse);
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
    @Post('/upload-video')
    @Authorized('admin')
    public async uploadVideo(@UploadedFile('file') files: any, @Req() request: any, @Res() response: any): Promise<any> {
        const name = files.originalname;
        const path = 'video/';
        let val: any;
        if (env.imageserver === 's3') {
            val = await this.s3Service.videoUpload((path + name), files.buffer, 'multipart/form-data');
        } else {
            val = await this.imageService.videoUpload((path + name), files.buffer);
        }
        const successResponse: any = {
            status: 1,
            message: 'Video successfully uploaded.',
            data: {
                image: name,
                path: val.path,
            },
        };
        return response.status(200).send(successResponse);
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
    @Get('/image-resize')
    public async image_resize(@QueryParam('width') width: string, @QueryParam('height') height: string, @QueryParam('name') name: string, @QueryParam('path') path: string, @Req() request: any, @Res() response: any): Promise<any> {
        const widthString = width;
        const heightString = height;
        const imgPath = path;
        const imgName = name;
        const ext = imgName.split('.');
        if (ext[1] === 'jpg' || ext[1] === 'jpeg' || ext[1] === 'png' || ext[1] === 'PNG' || ext[1] === 'JPG') {
            let val: any;
            if (env.imageserver === 's3') {
                val = await this.s3Service.resizeImage(imgName, imgPath, widthString, heightString);
            } else {
                val = await this.imageService.resizeImage(imgName, imgPath, widthString, heightString);
            }
            if (val) {
                return new Promise(() => {
                    response.writeHead(200, { 'Content-Type': 'image/jpeg' });
                    response.write(val, 'binary');
                    response.end(undefined, 'binary');
                });
            } else {
                return response.status(400).send({ status: 0, message: 'Only jpg/jpeg/png/PNG/JPG formats are allowed for image upload.' });
            }
        } else {
            return response.status(400).send({ status: 0, message: 'Only jpg/jpeg/png/PNG/JPG formats are allowed for image upload.' });
        }
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
    @Get('/search-folder')
    @Authorized('admin')
    public async getFolder(@QueryParam('folderName') folderName: string, @Req() request: any, @Res() response: any): Promise<any> {
        let val: any;
        const originalFileName = folderName.toLowerCase();
        if (env.imageserver === 's3') {
            const fileName = folderName;
            const firstIndex = fileName[0];
            const array = [];
            array.push(firstIndex.toLowerCase());
            array.push(firstIndex.toUpperCase());
            const initialtData: any = [];
            const contents = [];
            const commonPrefixes = [];
            const finalContents = [];
            const finalCommonPrefixes = [];
            let i = 1;
            for (const data of array) {
                val = await this.s3Service.getFolder(data);
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
            const mapping = await initialtData.map(async (value: any) => {
                value.Contents = finalContents;
                value.CommonPrefixes = finalCommonPrefixes;
                value.Prefix = folderName;
                return value;
            });
            const resultData = await Promise.all(mapping);

            if (resultData) {
                const successResponse: any = {
                    status: 1,
                    message: 'Successfully got folder details',
                    data: resultData[0],
                };
                return response.status(200).send(successResponse);
            }
        } else {
            val = await this.imageService.getFolder(folderName);
        }
        if (val) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got folder details',
                data: val,
            };
            return response.status(200).send(successResponse);
        }
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
    @Get('/video-preview-s3')
    public async video_preview_s3(@QueryParam('name') filename: string, @QueryParam('path') path: string, @Res() response: any)
        : Promise<any> {
        const directoryPath = globPath.join(process.cwd(), 'uploads' + '/video/' + filename);
        const fileExists = await fs.existsSync(directoryPath);
        if (fileExists) {
            // file exists
            return new Promise((resolve, reject) => {
                return response.sendFile(directoryPath, filename);
            });
        }
        const finalPath = String(path[path.length - 1]) === '/' ? path.substring(0, path.length - 1) : path;
        const val = await this.s3Service.videoFileDownload(finalPath, filename, directoryPath);
        if (val) {
            return new Promise((resolve, reject) => {
                return response.sendFile(val, filename);
            });
        }
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
    @Get('/get-settings')
    public async settingsList(@Res() response: any): Promise<any> {
        const select = '';
        const relation = [];
        const WhereConditions = [];
        const limit = 1;
        const settings: any = await this.settingService.list(limit, select, relation, WhereConditions);
        const promise = settings.map(async (result: any) => {
            const currencyData: any = await this.currencyService.findOne({ where: { currencyId: result.storeCurrencyId } });
            const temp: any = result;
            if (currencyData) {
                temp.currencyCode = currencyData.code;
                temp.symbolLeft = currencyData.symbolLeft;
                temp.symbolRight = currencyData.symbolRight;
            } else {
                temp.currencyCode = '';
                temp.symbolLeft = '';
                temp.symbolRight = '';
            }
            return temp;
        });
        const value = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get settings',
            data: value,
        };
        return response.status(200).send(successResponse);
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
     @Post('/upload-multi-image')
    //  @Authorized('admin')
     public async multiImage(@Body({ validate: true }) multipleImage: MultipleImageUpload, @Res() response: any): Promise<any> {
        let val: any;
        const images: any = multipleImage.image;
        let result: any;
        result = images.map(async value => {
            const fileName = value.fileName;
            const imgPath = value.path;
            const imageValue = value.image;
            const imageType = imageValue.split(';')[0].split('/')[1];
            const originalName = fileName.split('.')[0];
            const imageName = originalName.toLowerCase() + Date.now() + '.' + imageType;
            const base64Data = new Buffer(imageValue.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            const availableTypes = env.availImageTypes.split(',');
            const stringLength = imageValue.replace(/^data:image\/\w+;base64,/, '').length;
            AWS.config.update({ accessKeyId: aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: aws_setup.AWS_SECRET_ACCESS_KEY });
            if (!availableTypes.includes(imageType)) {
                const errorTypeResponse: any = {
                    status: 0,
                    message: 'Only ' + env.availImageTypes + ' types are allowed',
                };
                return response.status(400).send(errorTypeResponse);
            }
            const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
            const sizeInKb = sizeInBytes / 1024;
            if (+sizeInKb <= 4096) {
                if (env.imageserver === 's3') {
                    console.log('hii working s3 service.....');
                    val = await this.s3Service.imageUpload((imgPath === '' ? imageName : imgPath + imageName), base64Data, imageType);
                } else {
                    val = await this.imageService.imageUpload((imgPath === '' ? imageName : imgPath + imageName), base64Data);
                }
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Not able to update as the file size is too large.',
                };
                return response.status(400).send(errorResponse);
            }
            return val;
        });

        const PromiseValue = await Promise.all(result);
        if (PromiseValue) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully upload the image',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse = {
                status: 0,
                message: 'cannot upload the image',
            };
            return response.status(400).send(errorResponse);
        }
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
     @Post('/multiple-delete')
     @Authorized('admin')
     public async deleteMultipleImage(@Body({ validate: true }) deleteFileNameRequest: DeleteMultipleImage, @Res() response: any): Promise<any> {
         const image = deleteFileNameRequest.delete;
         let val;
         const result = image.map(async value => {
             if (env.imageserver === 's3') {
                 val = await this.s3Service.deleteFile(value.pathName + value.fileName);
             } else {
                 val = await this.imageService.deleteFile(value.pathName + value.fileName);
             }
             return val;
         });
         const finalResult = await Promise.all(result);
         if (finalResult) {
             const successResponse: any = {
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
     }
}
