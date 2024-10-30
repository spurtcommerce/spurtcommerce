"use strict";
/*
 * SpurtCommerce API
 * version 5.0.0
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const tslib_1 = require("tslib");
// import * as AWS from 'aws-sdk'; // Load the SDK for JavaScript
const typedi_1 = require("typedi");
const env_1 = require("../../../env");
const fs = tslib_1.__importStar(require("fs"));
const client_s3_1 = require("@aws-sdk/client-s3");
const routing_controllers_1 = require("routing-controllers");
const s3 = new client_s3_1.S3({
    region: env_1.aws_setup.AWS_DEFAULT_REGION,
});
const s3Client = new client_s3_1.S3Client({
    region: env_1.aws_setup.AWS_DEFAULT_REGION,
});
let S3Service = class S3Service {
    // Bucket list
    listBucker(limit = 0, marker = '', folderName = '') {
        const bucketParams = {
            Bucket: env_1.aws_setup.AWS_BUCKET,
            MaxKeys: limit,
            Delimiter: '/',
            Prefix: folderName,
            Marker: marker,
        };
        return new Promise((resolve, reject) => {
            return s3.listObjects(bucketParams, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
    // create folder
    createFolder(folderName = '') {
        const bucketParams = {
            Bucket: env_1.aws_setup.AWS_BUCKET,
            Key: folderName,
        };
        return new Promise((resolve, reject) => {
            return s3.putObject(bucketParams, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
    // delete folder
    deleteFolder(folderName = '') {
        const bucketParams = {
            Bucket: env_1.aws_setup.AWS_BUCKET,
            Prefix: folderName,
        };
        return new Promise((resolve, reject) => {
            s3.listObjects(bucketParams, (err, data) => {
                if (err) {
                    reject(err);
                }
                const objects = data.Contents.map(object => ({ Key: object.Key }));
                return s3.deleteObjects({
                    Bucket: env_1.aws_setup.AWS_BUCKET,
                    Delete: {
                        Objects: objects,
                        Quiet: true,
                    },
                }, (error, val) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(val);
                });
            });
        });
    }
    // delete file
    deleteFile(fileName = '') {
        const bucketParams = {
            Bucket: env_1.aws_setup.AWS_BUCKET,
            Key: fileName,
        };
        return new Promise((resolve, reject) => {
            return s3.deleteObject(bucketParams, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
    // Image resize
    resizeImage(imgName = '', imgPath = '', widthString = '', heightString = '') {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const client = new client_s3_1.S3Client({
                region: env_1.aws_setup.AWS_DEFAULT_REGION,
            });
            const response = yield client.send(new client_s3_1.GetObjectCommand({
                Bucket: env_1.aws_setup.AWS_BUCKET,
                Key: imgPath + imgName,
            }));
            const byteArray = yield response.Body.transformToByteArray();
            const buffer = Buffer.from(byteArray);
            return new Promise((resolve) => {
                const gm = require('gm').subClass({ imageMagick: true });
                return gm(buffer)
                    .resize(widthString, heightString)
                    .toBuffer((error, data) => {
                    if (error) {
                        throw error;
                    }
                    else {
                        return resolve(data);
                    }
                });
            });
        });
    }
    // Image resize
    resizeImageBase64(imgName = '', imgPath = '', widthString, heightString) {
        const ext = imgName.split('.');
        const imagePrefix = 'data:image/' + ext[1] + ';base64,';
        const getParams = {
            Bucket: env_1.aws_setup.AWS_BUCKET,
            Key: imgPath + imgName, // path to the object you're looking for
        };
        return new Promise((resolve, reject) => {
            s3.getObject(getParams, (err, data) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return reject(err);
                }
                if (data) {
                    const gm = require('gm').subClass({ imageMagick: true });
                    return gm(data.Body)
                        .resize(widthString, heightString)
                        .toBuffer((error, buffer) => {
                        if (error) {
                            throw error;
                        }
                        else {
                            resolve(imagePrefix + buffer.toString('base64'));
                        }
                    });
                }
                else {
                    return resolve(false);
                }
            }));
        });
    }
    // delete file
    imageUpload(folderName = '', base64Image, imageType, fileType) {
        const sizeInBytes = 4 * Math.ceil((base64Image.length / 3)) * 0.5624896334383812;
        const sizeInKb = sizeInBytes / 1024;
        const allowedFileSizeInKb = +env_1.env.imageUploadSize * 1024;
        if (sizeInKb > allowedFileSizeInKb) {
            throw new routing_controllers_1.BadRequestError(`File size too large, must be lees than ${+env_1.env.imageUploadSize} mb`);
        }
        const command = new client_s3_1.PutObjectCommand({
            Bucket: env_1.aws_setup.AWS_BUCKET,
            Key: folderName,
            Body: base64Image,
            ContentEncoding: 'base64',
            ContentType: fileType === 0 ? imageType : imageType,
        });
        return new Promise((resolve, reject) => {
            return s3Client.send(command, (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    }
    // delete file
    videoUpload(folderName = '', base64Image, imageType) {
        const command = new client_s3_1.PutObjectCommand({
            Bucket: env_1.aws_setup.AWS_BUCKET,
            Key: folderName,
            Body: base64Image,
        });
        return new Promise((resolve, reject) => {
            return s3Client.send(command, (err, data) => {
                if (err) {
                    return reject(err);
                }
                // const locationArray = data.Location.split('/');
                // locationArray.pop();
                // const locationPath = locationArray.join('/');
                return resolve(data);
            });
        });
    }
    // search folder
    getFolder(folderName = '', vendorPrefix) {
        const bucketParams = {
            Bucket: env_1.aws_setup.AWS_BUCKET,
            Prefix: vendorPrefix ? `${vendorPrefix}/${folderName}` : folderName,
            Delimiter: '/',
        };
        return new Promise((resolve, reject) => {
            return s3.listObjects(bucketParams, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
    fileUpload(folderName = '', base64Data, imageType) {
        const command = new client_s3_1.PutObjectCommand({
            Bucket: env_1.aws_setup.AWS_BUCKET,
            Key: folderName,
            Body: base64Data,
        });
        return new Promise((resolve, reject) => {
            return s3Client.send(command, (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    }
    fileDownload(folderName = '', dataFile) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const command = new client_s3_1.GetObjectCommand({
                Bucket: env_1.aws_setup.AWS_BUCKET,
                Key: folderName + dataFile,
            });
            try {
                const response = yield s3.send(command);
                const str = yield response.Body.transformToByteArray();
                fs.writeFileSync(dataFile, str);
                return dataFile;
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    videoFileDownload(folderName = '', dataFile, directoryPath = '') {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const command = new client_s3_1.GetObjectCommand({
                Bucket: env_1.aws_setup.AWS_BUCKET,
                Key: folderName + '/' + dataFile,
            });
            try {
                const response = yield s3.send(command);
                const str = yield response.Body.transformToByteArray();
                fs.writeFileSync(directoryPath, str);
                return directoryPath;
                console.log(str);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    getDocument(key) {
        // Create the parameters for calling createBucket
        const getParams = {
            Bucket: env_1.aws_setup.AWS_BUCKET,
            Key: key, // path to the object you're looking for
        };
        return new Promise((resolve, reject) => {
            s3.getObject(getParams, (err, data) => {
                if (err) {
                    return reject(err);
                }
                if (data) {
                    return resolve(data.Body.transformToByteArray());
                }
                else {
                    return resolve(false);
                }
            });
        });
    }
};
S3Service = tslib_1.__decorate([
    (0, typedi_1.Service)()
], S3Service);
exports.S3Service = S3Service;
//# sourceMappingURL=S3Service.js.map