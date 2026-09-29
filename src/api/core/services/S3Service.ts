/*
 * SpurtCommerce API
 * version 1.0.0
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
import AWS from 'aws-sdk';

const s3 = new S3({
    region: aws_setup.AWS_DEFAULT_REGION,
});
const s3Client = new S3Client({
    region: aws_setup.AWS_DEFAULT_REGION,
});
const s3theme = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
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
        return new Promise((resolve, reject) => {
            const sharp = require('sharp');
            return sharp(buffer)
                .resize(+widthString, +heightString)
                .toBuffer((error: any, data: any) => {
                    if (error) {
                        return reject(error);
                    } else {
                        return resolve(data);
                    }
                });
        });
    }

    public async imageNotResize(imgName: string = '', imgPath: string = ''): Promise<any> {
        const client = new S3Client({
            region: aws_setup.AWS_DEFAULT_REGION,
        });
        const response = await client.send(new GetObjectCommand({
            Bucket: aws_setup.AWS_BUCKET,
            Key: imgPath + imgName,
        }));

        const byteArray = await response.Body.transformToByteArray();
        const buffer = Buffer.from(byteArray);
        return buffer;
    }
    // Image resize
    public resizeImageBase64(imgName: string = '', imgPath: string = '', widthString: string, heightString: string): Promise<any> {
        const ext = imgName.split('.');
        const imagePrefix = 'data:image/' + ext[1] + ';base64,';

        const getParams = {
            Bucket: aws_setup.AWS_BUCKET, // your bucket name,
            Key: imgPath + imgName, // path to the object you're looking for
        };
        const streamToBuffer = async (stream: any): Promise<Buffer> => {
            return new Promise((resolve, reject) => {
                const chunks: any[] = [];
                stream.on('data', (chunk: any) => chunks.push(chunk));
                stream.on('end', () => resolve(Buffer.concat(chunks)));
                stream.on('error', reject);
            });
        };
        return new Promise((resolve, reject) => {
            s3.getObject(getParams, async (err: any, data: any) => {
                const imageBuffer = await streamToBuffer(data.Body);
                if (err) {
                    return reject(err);
                }
                if (data) {
                    const sharp = require('sharp');
                    return sharp(imageBuffer)
                        .resize(+widthString, +heightString)
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

    public imageBase64(imgName: string = '', imgPath: string = ''): Promise<any> {
        const ext = imgName.split('.');
        const imagePrefix = 'data:image/' + ext[1] + ';base64,';

        const getParams = {
            Bucket: aws_setup.AWS_BUCKET, // your bucket name,
            Key: imgPath + imgName, // path to the object you're looking for
        };
        const streamToBuffer = async (stream: any): Promise<Buffer> => {
            return new Promise((resolve, reject) => {
                const chunks: any[] = [];
                stream.on('data', (chunk: any) => chunks.push(chunk));
                stream.on('end', () => resolve(Buffer.concat(chunks)));
                stream.on('error', reject);
            });
        };
        return new Promise((resolve, reject) => {
            s3.getObject(getParams, async (err: any, data: any) => {
                const imageBuffer = await streamToBuffer(data.Body);

                if (err) {
                    return reject(err);
                }

                if (data) {
                    try {
                        resolve(imagePrefix + imageBuffer.toString('base64'));
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    resolve(false);
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
            Key: folderName + dataFile,
        });

        try {
            const response = await s3.send(command);
            const str = await response.Body.transformToByteArray();
            fs.writeFileSync(directoryPath, str);
            return directoryPath;
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

    public async deleteMultipleFile(filePaths: string[]): Promise<any> {
        if (filePaths.length > 900) {
            const lengths = Math.ceil(filePaths.length / 900);

            for (let i = 0; i < lengths; i++) {
                await this.deleteS3Batch(filePaths.splice(0, 900));
            }
        } else {
            await this.deleteS3Batch(filePaths);
        }
    }

    public async uploadThemeImageToS3(slug: string, localImagePath: string): Promise<any> {
        const fileContent = fs.readFileSync(localImagePath);

        const fileName = `${slug}.jpg`;
        const folder = 'themes/';
        const s3Key = folder + fileName;

        const params = {
          Bucket: process.env.AWS_BUCKET,
          Key: s3Key,
          Body: fileContent,
          ContentType: 'image/jpeg',
          ACL: 'public-read',
        };

        await s3theme.upload(params).promise();

        return {
          fileName,
          path: folder,
          key: s3Key,
        };
      }

    private async deleteS3Batch(filePaths: string[]): Promise<any> {
        const params = {
            Bucket: aws_setup.AWS_BUCKET,
            Delete: {
                Objects: filePaths.map((path) => ({ Key: path })),
            },
        };

        return new Promise((resolve, reject) => {
            s3.deleteObjects(params, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
}
