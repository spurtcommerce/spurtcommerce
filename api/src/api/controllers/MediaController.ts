/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import * as AWS from 'aws-sdk'; // Load the SDK for JavaScript
import {Authorized, Body, Get, JsonController, Post, QueryParam, Req, Res} from 'routing-controllers';
import {FolderNameRequest} from './requests/CreateFolderNameRequest';
import {FileNameRequest} from './requests/CreateFileNameRequest';
import {S3Service} from '../services/S3Service';
import {ImageService} from '../services/ImageService';
import {aws_setup, env} from '../../env';

AWS.config.update({
    accessKeyId: aws_setup.AWS_ACCESS_KEY_ID,
    secretAccessKey: aws_setup.AWS_SECRET_ACCESS_KEY,
    region: aws_setup.AWS_DEFAULT_REGION,
});

// const s3 = new AWS.S3();

@JsonController('/media')
export class MediaController {
    constructor(private s3Service: S3Service,
                private imageService: ImageService) {
    }

    // Get Bucket Object List API
    /**
     * @api {get} /api/media/bucket-object-list bucket-object-list
     * @apiGroup media
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit list limit
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
    @Authorized()
    public async ObjectList(@QueryParam('folderName') folderName: string, @QueryParam('limit') limit: number, @Req() request: any, @Res() response: any): Promise<any> {
        console.log('working');
        console.log('S3 folderName:- ' + folderName);
        console.log('S3 Limit:- ' + limit);

        let val: any;

        if (env.imageserver === 's3') {
            val = await this.s3Service.listBucker(limit, folderName);
        } else {
            val = await this.imageService.listFolders(limit, folderName);
        }

        console.log(val);

        if (val) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get bucket object list',
                data: val,
            };
            return response.status(200).send(successResponse);
        }
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
    @Authorized()
    public async CreateFolder(@Body({validate: true}) folderNameValidation: FolderNameRequest, @Req() request: any, @Res() response: any): Promise<any> {
        console.log('working');
        console.log('S3 folderName:- ' + folderNameValidation.folderName);

        let val: any;
        if (env.imageserver === 's3') {
            val = await this.s3Service.createFolder(folderNameValidation.folderName);
        } else {
            val = await this.imageService.createFolder(folderNameValidation.folderName);
        }

        if (val) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created folder',
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
    @Authorized()
    public async DeleteFolder(@Body({validate: true}) folderNameValidation: FolderNameRequest, @Req() request: any, @Res() response: any): Promise<any> {
        console.log('working');
        console.log('S3 folderName:- ' + folderNameValidation.folderName);
        const val: any = await this.s3Service.deleteFolder(folderNameValidation.folderName);
        console.log(val);

        if (val) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted folder',
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
    @Authorized()
    public async DeleteFile(@QueryParam('fileName') fileName: string, @Req() request: any, @Res() response: any): Promise<any> {
        console.log('working');
        console.log('S3 fileName:- ' + fileName);
        let val: any;
        if (env.imageserver === 's3') {
            val = await this.s3Service.deleteFile(fileName);
        } else {
            val = await this.imageService.deleteFile(fileName);
        }
        console.log(val);

        if (val) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted file',
            };
            return response.status(200).send(successResponse);
        }
    }

    //  Upload Image File
    /**
     * @api {post} /api/media/upload-file  Upload File
     * @apiGroup media
     * @apiParam (Request body) {String} image image
     * @apiParam (Request body) {String} path Directory Name
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
    @Authorized()
    public async uploadFile(@Body({validate: true}) fileNameRequest: FileNameRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const base64 = fileNameRequest.image;
        const path = fileNameRequest.path;
        AWS.config.update({accessKeyId: aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: aws_setup.AWS_SECRET_ACCESS_KEY});
        const base64Data = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        const type = base64.split(';')[0].split('/')[1];
        const name = 'Img_' + Date.now() + '.' + type;
        let val: any;
        if (env.imageserver === 's3') {
            val = await this.s3Service.imageUpload((path === '' ? name : path + name), base64Data, type);
        } else {
            val = await this.imageService.imageUpload((path === '' ? name : path + name), base64Data);
        }
        console.log(val);
        const successResponse: any = {
            status: 1,
            message: 'Image successfully uploaded',
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
        console.log('Dim' + width + height);
        const widthString = width;
        const heightString = height;
        const imgPath = path;
        const imgName = name;
        console.log('Dim' + width + height);
        console.log('Path' + imgPath);
        console.log('filename' + imgName);
        const ext = imgName.split('.');
        console.log('ext ' + ext[1]);
        if (ext[1] === 'jpg' || ext[1] === 'jpeg' || ext[1] === 'png') {
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
                return response.status(400).send({status: 0, message: 'Only allow jpg/jpeg/png format image!'});
            }
        } else {
            return response.status(400).send({status: 0, message: 'Only allow jpg/jpeg/png format image!'});
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
    @Authorized()
    public async getFolder(@QueryParam('folderName') folderName: string, @Req() request: any, @Res() response: any): Promise<any> {
        console.log('working');
        console.log('S3 folderName:- ' + folderName);
        let val: any;
        if (env.imageserver === 's3') {
            val = await this.s3Service.getFolder(folderName);
        } else {
            val = await this.imageService.getFolder(folderName);
        }
        console.log(val);

        if (val) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got folder details',
                data: val,
            };
            return response.status(200).send(successResponse);
        }
    }
}
