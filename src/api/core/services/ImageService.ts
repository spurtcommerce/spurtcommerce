/*
 * SpurtCommerce API
 * version 4.8.1
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import * as path from 'path';
import * as fs from 'fs';
import extract = require('extract-zip');
import { BadRequestError } from 'routing-controllers';
import { env } from '../../../../src/env';

@Service()
export class ImageService {
    // Bucket list
    public async listFolders(limit: number = 0, marker: string = '', folderName: string = ''): Promise<any> {
        const filteredPath = path.normalize(folderName).replace(/^(\.\.(\/|\\|$))+/, '');
        const directoryPath = path.join(process.cwd(), 'uploads', filteredPath);
        const notAllowFolder = [];
        if (folderName === '') {
            notAllowFolder.push(...['category', 'logo', 'qrcode', 'storelogo', 'storeLogo', 'user', 'vendordocument', 'language', 'customer', 'blog', 'banner', 'video']);
        }
        const fileUnsanitized = await this.readDir(directoryPath);
        const files = fileUnsanitized.filter((file) => notAllowFolder.length ? !notAllowFolder.includes(file) : true);
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
    public cvsToJson(uploadsFolder: any): Promise<any> {
        const csv = require('csvtojson');
        console.log(csv);
        return new Promise((resolve) => {
            console.log('inside the function');
            csv()
                .fromFile(uploadsFolder)
                .then((jsonArray) => {
                    resolve(jsonArray);
                });
        });
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    public qrCode(filePath: any, Url: any): Promise<any> {
        const qrCode = require('qrcode');
        return new Promise((resolve, reject) => {
            qrCode.toFile(filePath, Url, (err: any) => {
                if (err) {
                    reject(err);
                }
                resolve({ data: 'success' });
            });
        });
    }

    public convertJson(data: any): Promise<any> {
        const csvToJSON = require('csvtojson');
        const csvFilePath = data; // Replace with the path to your CSV file
        return new Promise((resolve, reject) => {
            csvToJSON()
                .fromFile(csvFilePath)
                .then((jsonArray, err) => {
                    // Process the parsed CSV data
                    if (jsonArray) {
                        resolve(jsonArray);
                    } else {
                        reject(err);
                    }
                });
        });
    }
    public async UIqrcode(folderName: string, base64Data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.writeFile(folderName, base64Data, (err) => {
                if (err) {
                    reject(err);
                }
                resolve({ data: 'success' });
            });
        });

    }

    // create folder
    public createFolder(folderName: string = ''): Promise<any> {
        const filteredPath = path.normalize(folderName).replace(/^(\.\.(\/|\\|$))+/, '');
        const directoryPath = path.join(process.cwd(), 'uploads', filteredPath);
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

        const sizeInBytes = 4 * Math.ceil((base64Image.length / 3)) * 0.5624896334383812;
        const sizeInKb = sizeInBytes / 1024;
        const allowedFileSizeInKb = +env.imageUploadSize * 1024;

        if (sizeInKb > allowedFileSizeInKb) {
            throw new BadRequestError(`File size too large, must be lees than ${+env.imageUploadSize} mb`);
        }

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
                        return resolve(undefined);
                    } else {
                        return resolve(buffer);
                    }
                });
        });
    }

    // Image resize
    public async resizeImageBase64(directory: string, widthString: string = '', heightString: string = ''): Promise<any> {
        const directoryPath = path.join(process.cwd(), directory);
        const ext = directory.split('.');
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

    // Image resize
    public async getFile(directory: string): Promise<any> {
        const directoryPath = path.join(process.cwd(), directory);
        return new Promise((res, rej) => {
            fs.readFile(directoryPath, (err: NodeJS.ErrnoException | null, data: Buffer) => {
                if (err) {
                    console.error('Error reading the file:', err);
                    return rej(err);
                }
                return res(data);
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

    public xlsxToJson(dirPath: any): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const XLSX = require('xlsx');
                const workbook = XLSX.readFile(dirPath);
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
                resolve(jsonData);
            } catch (err) {
                reject(err);
            }
        });
    }

    public extractZip(fileName: string = '', distPath: any = ''): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await extract(fileName, { dir: distPath });
            resolve({ success: true, message: 'Successfully Extract Zip' });
        });
    }

    // search folders
    public async getFolder(folderName: string = '', vendorPrefix?: string): Promise<any> {

        return new Promise(async (resolve, reject) => {
            const pathName = path.join(process.cwd(), 'uploads', vendorPrefix ? `${vendorPrefix}` : '');
            console.log(pathName, 'pathName');
            const unsanitised: any = await this.readDir(pathName);
            const notAllowFolder = ['category', 'logo', 'qrcode', 'storelogo', 'storeLogo', 'user', 'vendordocument', 'language', 'customer', 'blog', 'banner', 'video'];
            // notAllowFolder.push('products');
            const files = unsanitised.filter((file) => (notAllowFolder.length && !vendorPrefix) ? !notAllowFolder.includes(file) : true);
            // const files = unsanitised;
            const contents = [];
            const commonPrefix = [];
            console.log(files, 'files');
            if (folderName !== '') {
                for (const _file of files) {
                    if (Array.isArray(_file) === false) {
                        const filesName = _file.toLowerCase();
                        if (filesName.includes(folderName.toLowerCase())) {
                            const pathfile = path.resolve(path.join(process.cwd(), 'uploads', vendorPrefix ? vendorPrefix : '', _file));
                            const isDir = await this.isDirCheck(pathfile);
                            if (isDir) {
                                commonPrefix.push({
                                    Prefix: (vendorPrefix ? `${vendorPrefix}/` : '') + _file + '/',
                                });
                            } else {
                                contents.push({
                                    Key: (vendorPrefix ? `${vendorPrefix}/` : '') + _file,
                                });
                            }
                        }
                    } else {
                        for (const fileArray of _file) {
                            const lowerCaseName = fileArray.toLowerCase();
                            if (lowerCaseName.includes(folderName.toLowerCase())) {
                                commonPrefix.push({ Prefix: (vendorPrefix ? `${vendorPrefix}/` : '') + fileArray + '/' });
                            }
                        }
                    }
                }
            } else {
                for (const file of files) {
                    const pathfile = path.resolve(path.join(process.cwd(), 'uploads', vendorPrefix ? vendorPrefix : '', file));
                    const isDir = await this.isDirCheck(pathfile);
                    if (isDir) {
                        commonPrefix.push({
                            Prefix: (vendorPrefix ? `${vendorPrefix}/` : '') + file + '/',
                        });
                    } else {
                        contents.push({
                            Key: (vendorPrefix ? `${vendorPrefix}/` : '') + file,
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

    public async getDocument(key: string): Promise<any> {
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + key);
        return new Promise((resolve, reject) => {
            fs.readFile(directoryPath, (err, data) => {
                if (err) {
                    throw err;
                }
                return resolve(data);
            });
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

    public async escapeChars(data: string): Promise<any> {
        const val = data
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quotes;/g, '"')
            .replace(/&quot;/g, `'`)
            .replace(/&sbquo;/g, ',')
            .replace(/&equals;/g, '=')
            .replace(/&hyphen;/g, '-')
            .replace(/&hellip;/g, '…')
            .replace(/&commat;/g, '@')
            .replace(/&copy;/g, '©')
            .replace(/&hash;/g, '#')
            .replace(/&ldquo;/g, '“')
            .replace(/&rsquo;/g, '’')
            .replace(/&trade;/g, '™')
            .replace(/&reg;/g, '®')
            .replace(/&ndash;/g, '–')
            .replace(/&eacute;/g, 'é')
            .replace(/&euro;/g, '€')
            .replace(/&pound;/g, '£')
            .replace(/&quot;/g, '');
        return val;
    }
}
