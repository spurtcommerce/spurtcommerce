"use strict";
/*
 * SpurtCommerce API
 * version 4.8.4
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const tslib_1 = require("tslib");
const AWS = tslib_1.__importStar(require("aws-sdk")); // Load the SDK for JavaScript
const typedi_1 = require("typedi");
const env_1 = require("../../../env");
const fs = tslib_1.__importStar(require("fs"));
const s3 = new AWS.S3();
let S3Service = class S3Service {
    // Bucket list
    listBucker(limit = 0, marker = '', folderName = '') {
        AWS.config.update({ accessKeyId: env_1.aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: env_1.aws_setup.AWS_SECRET_ACCESS_KEY });
        // Create the parameters for calling createBucket
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
        AWS.config.update({ accessKeyId: env_1.aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: env_1.aws_setup.AWS_SECRET_ACCESS_KEY });
        // Create the parameters for calling createBucket
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
        AWS.config.update({ accessKeyId: env_1.aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: env_1.aws_setup.AWS_SECRET_ACCESS_KEY });
        // Create the parameters for calling createBucket
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
        AWS.config.update({ accessKeyId: env_1.aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: env_1.aws_setup.AWS_SECRET_ACCESS_KEY });
        // Create the parameters for calling createBucket
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
        AWS.config.update({ accessKeyId: env_1.aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: env_1.aws_setup.AWS_SECRET_ACCESS_KEY });
        // Create the parameters for calling createBucket
        const getParams = {
            Bucket: env_1.aws_setup.AWS_BUCKET,
            Key: imgPath + imgName, // path to the object you're looking for
        };
        return new Promise((resolve, reject) => {
            s3.getObject(getParams, (err, data) => {
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
                            return resolve(buffer);
                        }
                    });
                }
                else {
                    return resolve(false);
                }
            });
        });
    }
    // Image resize
    resizeImageBase64(imgName = '', imgPath = '', widthString, heightString) {
        AWS.config.update({ accessKeyId: env_1.aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: env_1.aws_setup.AWS_SECRET_ACCESS_KEY });
        const ext = imgName.split('.');
        const imagePrefix = 'data:image/' + ext[1] + ';base64,';
        // Create the parameters for calling createBucket
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
    imageUpload(folderName = '', base64Image, imageType) {
        AWS.config.update({ accessKeyId: env_1.aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: env_1.aws_setup.AWS_SECRET_ACCESS_KEY });
        const params = {
            Bucket: env_1.aws_setup.AWS_BUCKET,
            Key: folderName,
            Body: base64Image,
            ACL: 'public-read',
            ContentEncoding: 'base64',
            ContentType: imageType,
        };
        console.log('awsParams:', params);
        return new Promise((resolve, reject) => {
            return s3.upload(params, (err, data) => {
                if (err) {
                    return reject(err);
                }
                console.log('data:', data);
                const locationArray = data.Location.split('/');
                console.log('locationArray before pop:', locationArray);
                locationArray.pop();
                console.log('locationArray after pop:', locationArray);
                const locationPath = locationArray.join('/');
                console.log('locationPath:', locationPath);
                return resolve({ path: locationPath });
            });
        });
    }
    // delete file
    videoUpload(folderName = '', base64Image, imageType) {
        AWS.config.update({ accessKeyId: env_1.aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: env_1.aws_setup.AWS_SECRET_ACCESS_KEY });
        const params = {
            Bucket: env_1.aws_setup.AWS_BUCKET,
            Key: folderName,
            Body: base64Image,
            ACL: 'public-read',
            ContentEncoding: 'base64',
            ContentType: `${imageType}`,
        };
        return new Promise((resolve, reject) => {
            return s3.upload(params, (err, data) => {
                if (err) {
                    return reject(err);
                }
                const locationArray = data.Location.split('/');
                locationArray.pop();
                const locationPath = locationArray.join('/');
                return resolve({ path: locationPath });
            });
        });
    }
    // search folder
    getFolder(folderName = '') {
        AWS.config.update({ accessKeyId: env_1.aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: env_1.aws_setup.AWS_SECRET_ACCESS_KEY });
        // Create the parameters for calling createBucket
        const bucketParams = {
            Bucket: env_1.aws_setup.AWS_BUCKET,
            Prefix: folderName,
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
        AWS.config.update({ accessKeyId: env_1.aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: env_1.aws_setup.AWS_SECRET_ACCESS_KEY });
        const params = {
            Bucket: env_1.aws_setup.AWS_BUCKET,
            Key: folderName,
            Body: base64Data,
            ACL: 'public-read',
            ContentEncoding: 'base64',
            ContentType: imageType,
        };
        return new Promise((resolve, reject) => {
            return s3.upload(params, (err, data) => {
                if (err) {
                    return reject(err);
                }
                const locationArray = data.Location.split('/');
                locationArray.pop();
                const locationPath = locationArray.join('/');
                return resolve({ path: locationPath });
            });
        });
    }
    fileDownload(folderName = '', dataFile) {
        AWS.config.update({ accessKeyId: env_1.aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: env_1.aws_setup.AWS_SECRET_ACCESS_KEY });
        const params = {
            Bucket: env_1.aws_setup.AWS_BUCKET,
            Key: folderName + dataFile, // type is not required
        };
        return new Promise((resolve, reject) => {
            s3.getObject(params, (err, data) => {
                if (err) {
                    return reject(err);
                }
                fs.writeFileSync(dataFile, data.Body);
                return resolve(dataFile);
            });
        });
    }
    videoFileDownload(folderName = '', dataFile, directoryPath = '') {
        AWS.config.update({ accessKeyId: env_1.aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: env_1.aws_setup.AWS_SECRET_ACCESS_KEY });
        const params = {
            Bucket: env_1.aws_setup.AWS_BUCKET,
            Key: folderName + '/' + dataFile, // type is not required
        };
        return new Promise((resolve, reject) => {
            s3.getObject(params, (err, data) => {
                if (err) {
                    return reject(err);
                }
                fs.writeFileSync(directoryPath, data.Body);
                return resolve(directoryPath);
            });
        });
    }
};
S3Service = tslib_1.__decorate([
    (0, typedi_1.Service)()
], S3Service);
exports.S3Service = S3Service;
//# sourceMappingURL=S3Service.js.map