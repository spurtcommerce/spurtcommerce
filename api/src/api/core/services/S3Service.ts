/*
 * SpurtCommerce API
 * version 5.0.0
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

// import * as AWS from 'aws-sdk'; // Load the SDK for JavaScript
import { Service } from 'typedi';
import { aws_setup, env } from '../../../env';
import * as fs from 'fs';
import { S3, PutObjectCommand, S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { BadRequestError } from 'routing-controllers';

const s3 = new S3({
    region: aws_setup.AWS_DEFAULT_REGION,
});
const s3Client = new S3Client({
    region: aws_setup.AWS_DEFAULT_REGION,
});

@Service()
export class S3Service {
    // Bucket list
    public listBucker(limit: number = 0, marker: string = '', folderName: string = ''): Promise<any> {
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
        const bucketParams = {
            Bucket: aws_setup.AWS_BUCKET,
            Prefix: folderName,
        };

        return new Promise((resolve, reject) => {
            s3.listObjects(bucketParams, (err: any, data: any) => {
                if (err) {
                    reject(err);
                }
                const objects = data.Contents.map(object => ({ Key: object.Key }));
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
    public async resizeImage(imgName: string = '', imgPath: string = '', widthString: string = '', heightString: string = ''): Promise<any> {
        const client = new S3Client({
            region: aws_setup.AWS_DEFAULT_REGION,
        });
        const response = await client.send(new GetObjectCommand({
            Bucket: aws_setup.AWS_BUCKET,
            Key: imgPath + imgName,
        }));

        const byteArray = await response.Body.transformToByteArray();
        const buffer = Buffer.from(byteArray);
        return new Promise((resolve) => {
            const gm = require('gm').subClass({ imageMagick: true });
            return gm(buffer)
                .resize(widthString, heightString)
                .toBuffer((error: any, data: any) => {
                    if (error) {
                        throw error;
                    } else {
                        return resolve(data);
                    }
                });
        });
    }

    // Image resize
    public resizeImageBase64(imgName: string = '', imgPath: string = '', widthString: string, heightString: string): Promise<any> {
        const ext = imgName.split('.');
        const imagePrefix = 'data:image/' + ext[1] + ';base64,';

        const getParams = {
            Bucket: aws_setup.AWS_BUCKET, // your bucket name,
            Key: imgPath + imgName, // path to the object you're looking for
        };
        return new Promise((resolve, reject) => {
            s3.getObject(getParams, async (err: any, data: any) => {
                if (err) {
                    return reject(err);
                }
                if (data) {
                    const gm = require('gm').subClass({ imageMagick: true });
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
    public imageUpload(folderName: string = '', base64Image: any, imageType: string, fileType?: number): Promise<any> {

        const sizeInBytes = 4 * Math.ceil((base64Image.length / 3)) * 0.5624896334383812;
        const sizeInKb = sizeInBytes / 1024;
        const allowedFileSizeInKb = +env.imageUploadSize * 1024;

        if (sizeInKb > allowedFileSizeInKb) {
            throw new BadRequestError(`File size too large, must be lees than ${+env.imageUploadSize} mb`);
        }

        const command = new PutObjectCommand({
            Bucket: aws_setup.AWS_BUCKET,
            Key: folderName, // type is not required
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
    public videoUpload(folderName: string = '', base64Image: any, imageType: string): Promise<any> {

        const command = new PutObjectCommand({
            Bucket: aws_setup.AWS_BUCKET,
            Key: folderName, // type is not required
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
    public getFolder(folderName: string = '', vendorPrefix?: string): Promise<any> {
        const bucketParams = {
            Bucket: aws_setup.AWS_BUCKET,
            Prefix: vendorPrefix ? `${vendorPrefix}/${folderName}` : folderName,
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
        const command = new PutObjectCommand({
            Bucket: aws_setup.AWS_BUCKET,
            Key: folderName, // type is not required
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

    public async fileDownload(folderName: string = '', dataFile: any): Promise<any> {
        const command = new GetObjectCommand({
            Bucket: aws_setup.AWS_BUCKET,
            Key: folderName + dataFile,
        });
        try {
            const response = await s3.send(command);
            const str = await response.Body.transformToByteArray();

            fs.writeFileSync(dataFile, str);
            return dataFile;
        } catch (err) {
            console.error(err);
        }
    }

    public async videoFileDownload(folderName: string = '', dataFile: any, directoryPath: string = ''): Promise<any> {

        const command = new GetObjectCommand({
            Bucket: aws_setup.AWS_BUCKET,
            Key: folderName + '/' + dataFile,
        });

        try {
            const response = await s3.send(command);
            const str = await response.Body.transformToByteArray();

            fs.writeFileSync(directoryPath, str);
            return directoryPath;

            console.log(str);
        } catch (err) {
            console.error(err);
        }

    }

    public getDocument(key: string): Promise<any> {
        // Create the parameters for calling createBucket
        const getParams = {
            Bucket: aws_setup.AWS_BUCKET, // your bucket name,
            Key: key, // path to the object you're looking for
        };
        return new Promise((resolve, reject) => {
            s3.getObject(getParams, (err: any, data: any) => {
                if (err) {
                    return reject(err);
                }
                if (data) {
                    return resolve(data.Body.transformToByteArray());
                } else {
                    return resolve(false);
                }
            });
        });
    }
}
