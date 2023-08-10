/*
 * SpurtCommerce API
 * version 4.8.2
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import * as path from 'path';
import * as fs from 'fs';
import extract = require('extract-zip');

@Service()
export class ImageService {
    // Bucket list
    public async listFolders(limit: number = 0, marker: string = '', folderName: string = ''): Promise<any> {
        const filteredPath = path.normalize(folderName).replace(/^(\.\.(\/|\\|$))+/, '');
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + filteredPath);
        const files = await this.readDir(directoryPath);
        console.log(JSON.stringify(files) + 'files');
        const contents = [];
        const commonPrefix = [];
        let filess;
        let val;
        if (marker) {
            const index = files.indexOf(marker);
            filess = files.slice(index).slice(0, limit);
            val = files.splice(index);
        } else {
            filess = files.slice(marker).slice(0, limit);
            val = files.splice(marker);
        }
        const vl = JSON.stringify(val);
        const parse = JSON.parse(vl);
        const markerValue = parse[limit];
        for (const file of filess) {
            const pathfile = path.resolve(directoryPath, file);
            const isDir = await this.isDirCheck(pathfile);
            if (isDir) {
                commonPrefix.push({
                    Prefix: folderName ? folderName + file + '/' : file + '/',
                });
            } else {
                contents.push({
                    Key: folderName ? folderName + file : file,
                });
            }
        }
        return new Promise((resolve, reject) => {
            // passsing directoryPath and callback function
            const outputResponse: any = {};
            outputResponse.Name = 'uploads';
            outputResponse.Prefix = folderName;
            outputResponse.Delimiter = 100;
            outputResponse.Marker = '';
            if (markerValue) {
                outputResponse.NextMarker = markerValue;
                outputResponse.IsTruncated = true;
            } else {
                outputResponse.NextMarker = '';
                outputResponse.IsTruncated = false;
            }
            outputResponse.Contents = contents;
            outputResponse.CommonPrefixes = commonPrefix;
            resolve(outputResponse);
        });
    }

    // create folder
    public createFolder(folderName: string = ''): Promise<any> {
        const filteredPath = path.normalize(folderName).replace(/^(\.\.(\/|\\|$))+/, '');
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + filteredPath);
        return new Promise((resolve, reject) => {
            if (fs.existsSync(directoryPath)) {
                resolve({ ETAG: new Date() });
            }
            fs.mkdir(directoryPath, { recursive: true }, (err) => {
                if (err) {
                    reject(err);
                }
                resolve({ ETAG: new Date() });
            });
        });
    }

    // upload image
    public imageUpload(folderName: string = '', base64Image: any): Promise<any> {
        const filteredPath = path.normalize(folderName).replace(/^(\.\.(\/|\\|$))+/, '');
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + filteredPath);
        return new Promise((resolve, reject) => {
            fs.writeFile(directoryPath, base64Image, 'base64', (err) => {
                if (err) {
                    reject(err);
                }
                const locationArray = directoryPath.split('/');
                locationArray.pop();
                const locationPath = locationArray.join('/');
                resolve({ success: true, path: locationPath });
            });
        });
    }

    // upload image
    public videoUpload(folderName: string = '', buffer: any): Promise<any> {
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + folderName);
        return new Promise((resolve, reject) => {
            fs.writeFile(directoryPath, buffer, (err) => {
                if (err) {
                    reject(err);
                }
                const locationArray = directoryPath.split('/');
                locationArray.pop();
                const locationPath = locationArray.join('/');
                resolve({ success: true, path: locationPath });
            });
        });
    }

    // Image resize
    public async resizeImage(imgName: string = '', imgPath: string = '', widthString: string = '', heightString: string = ''): Promise<any> {
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + imgPath + imgName);
        return new Promise((resolve, reject) => {
            const gm = require('gm').subClass({ imageMagick: true });
            return gm(directoryPath)
                .resize(widthString, heightString)
                .toBuffer((error: any, buffer: any) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(buffer);
                    }
                });
        });
    }

    // Image resize
    public async resizeImageBase64(imgName: string = '', imgPath: string = '', widthString: string = '', heightString: string = ''): Promise<any> {
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + imgPath + imgName);
        const ext = imgName.split('.');
        const imagePrefix = 'data:image/' + ext[1] + ';base64,';
        return new Promise((resolve, reject) => {
            const gm = require('gm').subClass({ imageMagick: true });
            return gm(directoryPath)
                .resize(widthString, heightString)
                .toBuffer((error: any, buffer: any) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(imagePrefix + buffer.toString('base64'));
                    }
                });
        });
    }

    public async isDirCheck(pathfile: string): Promise<boolean> {
        return new Promise<boolean>((subresolve, subreject) => {
            fs.stat(pathfile, (error, stat) => {
                if (stat && stat.isDirectory()) {
                    subresolve(true);
                } else {
                    subresolve(false);
                }
            });
        });
    }

    public async readDir(pathfile: string): Promise<any> {
        return new Promise<any>((subresolve, subreject) => {
            fs.readdir(pathfile, (error, files) => {
                if (error) {
                    subreject(error);
                }
                subresolve(files);
            });
        });
    }

    public deleteFile(fileName: string = ''): Promise<any> {
        // Create the parameters for calling createBucket
        const filteredPath = path.normalize(fileName).replace(/^(\.\.(\/|\\|$))+/, '');
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + filteredPath);
        return new Promise((resolve, reject) => {

            fs.unlink(directoryPath, (err) => {
                if (err) {
                    reject(err);
                }
                resolve({ success: true, message: 'successfully deleted file' });
            });
        });
    }

    public writeFile(fileName: string = '', buffer: any = ''): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.writeFile(fileName, buffer, ((err) => {
                if (err) {
                    reject(err);
                }
                resolve({ success: true, message: 'successfully write file' });
            }));
        });
    }

    public convertXlToJson(dirpath: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const xlsxj = require('xlsx-to-json');
            xlsxj({
                input: dirpath,
                // tslint:disable-next-line:no-null-keyword
                output: null,
                sheet: 'productData',
            }, ((err: any, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }));
        });
    }

    public extractZip(fileName: string = '', distPath: any = ''): Promise<any> {
        return new Promise((resolve, reject) => {
            extract(fileName, { dir: distPath }, ((er: any) => {
                if (er) {
                    reject(er);
                }
                resolve({ success: true, message: 'Successfully Extract Zip' });
            }));
        });
    }

    // search folders
    public async getFolder(folderName: string = ''): Promise<any> {

        return new Promise(async (resolve, reject) => {
            const pathName = path.join(process.cwd(), 'uploads');
            const files: any = await this.readDir(pathName);
            const contents = [];
            const commonPrefix = [];
            if (folderName !== '') {
                files.forEach(async (file: any) => {
                    if (Array.isArray(file) === false) {
                        const filesName = file.toLowerCase();
                        if (filesName.includes(folderName.toLowerCase())) {
                            commonPrefix.push({ Prefix: file + '/' });
                        }
                    } else {
                        for (const fileArray of file ) {
                            const lowerCaseName = fileArray.toLowerCase();
                            if (lowerCaseName.includes(folderName.toLowerCase())) {
                                commonPrefix.push({ Prefix: fileArray + '/' });
                            }
                        }
                    }
                });
            } else {
                for (const file of files) {
                    const pathfile = path.resolve(path.join(process.cwd(), 'uploads' + '/' + file));
                    const isDir = await this.isDirCheck(pathfile);
                    if (isDir) {
                        commonPrefix.push({
                            Prefix: file + '/',
                        });
                    } else {
                        contents.push({
                            Key: file,
                        });
                    }

                }
            }

            const outputResponse: any = {};
            outputResponse.IsTruncated = false;
            outputResponse.Name = 'uploads';
            outputResponse.Content = contents;
            outputResponse.Prefix = folderName;
            outputResponse.CommonPrefixes = commonPrefix;
            resolve(outputResponse);
        });
    }

    public fileUpload(folderName: string = '', base64: any): Promise<any> {
        // Create the parameters for calling createBucket
        const filteredPath = path.normalize(folderName).replace(/^(\.\.(\/|\\|$))+/, '');
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + filteredPath);
        return new Promise((resolve, reject) => {
            fs.writeFile(directoryPath, base64, 'base64', (err) => {
                if (err) {
                    reject(err);
                }
                const locationArray = directoryPath.split('/');
                locationArray.pop();
                const locationPath = locationArray.join('/');
                resolve({ success: true, path: locationPath });
            });
        });
    }

    public fileDownload(folderName: string = '', dataFile: any): Promise<any> {
        // Create the parameters for calling createBucket
        const filteredPath = path.normalize(folderName).replace(/^(\.\.(\/|\\|$))+/, '');
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + filteredPath + '/' + dataFile);
        return new Promise((resolve, reject) => {
            resolve(directoryPath);
        });
    }

    public async escapeChar(data: string): Promise<string> {
        const val = data
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/,/g, '&sbquo;')
        .replace(/=/g, '&#61;')
        .replace(/-/g, '&#45;')
        .replace(/…/g, '&hellip;')
        .replace(/@/g, '&commat;')
        .replace(/©/g, '&copy;')
        .replace(/#/g, '&#35;')
        .replace(/“/g, '&ldquo;')
        .replace(/’/g, '&rsquo;')
        .replace(/‘/g, '&lsquo;')
        .replace(/™/g, '&trade;')
        .replace(/®/g, '&reg;')
        .replace(/–/g, '&ndash;')
        .replace(/é/g, '&eacute;')
        .replace(/€/g, '&euro;')
        .replace(/£/g, '&pound;');
        return val;
    }
}
