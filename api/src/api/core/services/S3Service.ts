/*
 * SpurtCommerce API
 * version 4.8.0
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import * as AWS from 'aws-sdk'; // Load the SDK for JavaScript
import {Service} from 'typedi';
import {aws_setup} from '../../../env';
import * as fs from 'fs';

const s3 = new AWS.S3();

@Service()
export class S3Service {
    // Bucket list
    public listBucker(limit: number = 0, marker: string = '', folderName: string = ''): Promise<any> {
        AWS.config.update({accessKeyId: aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: aws_setup.AWS_SECRET_ACCESS_KEY});
        // Create the parameters for calling createBucket
        const bucketParams = {
            Bucket: aws_setup.AWS_BUCKET,
            MaxKeys: limit,
            Delimiter: '/',
            Prefix: folderName,
            Marker: marker,
        };

        return new Promise((resolve, reject) => {
            return s3.listObjects(bucketParams, (err: any, data: any) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }

    // create folder
    public createFolder(folderName: string = ''): Promise<any> {
        AWS.config.update({accessKeyId: aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: aws_setup.AWS_SECRET_ACCESS_KEY});
        // Create the parameters for calling createBucket
        const bucketParams = {
            Bucket: aws_setup.AWS_BUCKET,
            Key: folderName,
        };

        return new Promise((resolve, reject) => {
            return s3.putObject(bucketParams, (err: any, data: any) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }

    // delete folder
    public deleteFolder(folderName: string = ''): Promise<any> {
        AWS.config.update({accessKeyId: aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: aws_setup.AWS_SECRET_ACCESS_KEY});
        // Create the parameters for calling createBucket
        const bucketParams = {
            Bucket: aws_setup.AWS_BUCKET,
            Prefix: folderName,
        };

        return new Promise((resolve, reject) => {
            s3.listObjects(bucketParams, (err: any, data: any) => {
                if (err) {
                    reject(err);
                }
                const objects = data.Contents.map(object => ({Key: object.Key}));
                return s3.deleteObjects({
                    Bucket: aws_setup.AWS_BUCKET,
                    Delete: {
                        Objects: objects,
                        Quiet: true,
                    },
                }, (error: any, val: any) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(val);
                });
            });
        });
    }

    // delete file
    public deleteFile(fileName: string = ''): Promise<any> {
        AWS.config.update({accessKeyId: aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: aws_setup.AWS_SECRET_ACCESS_KEY});
        // Create the parameters for calling createBucket
        const bucketParams = {
            Bucket: aws_setup.AWS_BUCKET,
            Key: fileName,
        };

        return new Promise((resolve, reject) => {
            return s3.deleteObject(bucketParams, (err: any, data: any) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }

    // Image resize
    public resizeImage(imgName: string = '', imgPath: string = '', widthString: string = '', heightString: string = ''): Promise<any> {
        AWS.config.update({accessKeyId: aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: aws_setup.AWS_SECRET_ACCESS_KEY});
        // Create the parameters for calling createBucket
        const getParams = {
            Bucket: aws_setup.AWS_BUCKET, // your bucket name,
            Key: imgPath + imgName, // path to the object you're looking for
        };
        return new Promise((resolve, reject) => {
            s3.getObject(getParams, (err: any, data: any) => {
                if (err) {
                    return reject(err);
                }
                if (data) {
                    const gm = require('gm').subClass({imageMagick: true});
                    return gm(data.Body)
                        .resize(widthString, heightString)
                        .toBuffer((error: any, buffer: any) => {
                            if (error) {
                                throw error;
                            } else {
                                return resolve(buffer);
                            }
                        });
                } else {
                    return resolve(false);
                }
            });
        });
    }

    // Image resize
    public resizeImageBase64(imgName: string = '', imgPath: string = '', widthString: string = '', heightString: string = ''): Promise<any> {
        AWS.config.update({accessKeyId: aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: aws_setup.AWS_SECRET_ACCESS_KEY});
        const ext = imgName.split('.');
        const imagePrefix = 'data:image/' + ext[1] + ';base64,';
        // Create the parameters for calling createBucket
        const getParams = {
            Bucket: aws_setup.AWS_BUCKET, // your bucket name,
            Key: imgPath + imgName, // path to the object you're looking for
        };
        return new Promise((resolve, reject) => {
            s3.getObject(getParams, (err: any, data: any) => {
                if (err) {
                    return reject(err);
                }
                if (data) {
                    const gm = require('gm').subClass({imageMagick: true});
                    return gm(data.Body)
                        .resize(widthString, heightString)
                        .toBuffer((error: any, buffer: any) => {
                            if (error) {
                                throw error;
                            } else {
                                resolve(imagePrefix + buffer.toString('base64'));
                            }
                        });
                } else {
                    return resolve(false);
                }
            });
        });
    }

    // delete file
    public imageUpload(folderName: string = '', base64Image: any, imageType: string): Promise<any> {
        AWS.config.update({accessKeyId: aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: aws_setup.AWS_SECRET_ACCESS_KEY});
        const params = {
            Bucket: aws_setup.AWS_BUCKET,
            Key: folderName, // type is not required
            Body: base64Image,
            ACL: 'public-read',
            ContentEncoding: 'base64',
            ContentType: `image/${imageType}`,
        };
        return new Promise((resolve, reject) => {
            return s3.upload(params, (err, data) => {
                if (err) {
                    return reject(err);
                }
                const locationArray = data.Location.split('/');
                locationArray.pop();
                const locationPath = locationArray.join('/');
                return resolve({path: locationPath});
            });
        });
    }

    // delete file
    public videoUpload(folderName: string = '', base64Image: any, imageType: string): Promise<any> {
        AWS.config.update({accessKeyId: aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: aws_setup.AWS_SECRET_ACCESS_KEY});
        const params = {
            Bucket: aws_setup.AWS_BUCKET,
            Key: folderName, // type is not required
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
                return resolve({path: locationPath});
            });
        });
    }

    // search folder
    public getFolder(folderName: string = ''): Promise<any> {
        AWS.config.update({accessKeyId: aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: aws_setup.AWS_SECRET_ACCESS_KEY});
        // Create the parameters for calling createBucket
        const bucketParams = {
            Bucket: aws_setup.AWS_BUCKET,
            Prefix: folderName,
            Delimiter: '/',
        };

        return new Promise((resolve, reject) => {
            return s3.listObjects(bucketParams, (err: any, data: any) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }

    public fileUpload(folderName: string = '', base64Data: any, imageType: string): Promise<any> {
        AWS.config.update({accessKeyId: aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: aws_setup.AWS_SECRET_ACCESS_KEY});
        const params = {
            Bucket: aws_setup.AWS_BUCKET,
            Key: folderName, // type is not required
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
                return resolve({path: locationPath});
            });
        });
    }

    public fileDownload(folderName: string = '', dataFile: any): Promise<any> {
        AWS.config.update({accessKeyId: aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: aws_setup.AWS_SECRET_ACCESS_KEY});
        const params = {
            Bucket: aws_setup.AWS_BUCKET,
            Key: folderName + dataFile, // type is not required
        };
        return new Promise((resolve, reject) => {
            s3.getObject(params, (err, data: any) => {
                if (err) {
                    return reject(err);
                }
                fs.writeFileSync(dataFile, data.Body);
                return resolve(dataFile);
            });
        });
    }

    public videoFileDownload(folderName: string = '', dataFile: any, directoryPath: string = ''): Promise<any> {
        AWS.config.update({accessKeyId: aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: aws_setup.AWS_SECRET_ACCESS_KEY});
        const params = {
            Bucket: aws_setup.AWS_BUCKET,
            Key: folderName + '/' + dataFile, // type is not required
        };
        return new Promise((resolve, reject) => {
            s3.getObject(params, (err, data: any) => {
                if (err) {
                    return reject(err);
                }
                fs.writeFileSync(directoryPath, data.Body);
                return resolve(directoryPath);
            });
        });
    }
}
