"use strict";
/*
 * SpurtCommerce API
 * version 4.8.1
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const path = tslib_1.__importStar(require("path"));
const fs = tslib_1.__importStar(require("fs"));
const extract = require("extract-zip");
const routing_controllers_1 = require("routing-controllers");
const env_1 = require("../../../../src/env");
let ImageService = class ImageService {
    // Bucket list
    listFolders(limit = 0, marker = '', folderName = '') {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const filteredPath = path.normalize(folderName).replace(/^(\.\.(\/|\\|$))+/, '');
            const directoryPath = path.join(process.cwd(), 'uploads', filteredPath);
            const notAllowFolder = [];
            if (folderName === '') {
                notAllowFolder.push(...['category', 'logo', 'qrcode', 'storelogo', 'storeLogo', 'user', 'vendordocument', 'language', 'customer', 'blog', 'banner', 'video']);
            }
            const fileUnsanitized = yield this.readDir(directoryPath);
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
            }
            else {
                filess = files.slice(marker).slice(0, limit);
                val = files.splice(marker);
            }
            const vl = JSON.stringify(val);
            const parse = JSON.parse(vl);
            const markerValue = parse[limit];
            for (const file of filess) {
                const pathfile = path.resolve(directoryPath, file);
                const isDir = yield this.isDirCheck(pathfile);
                if (isDir) {
                    commonPrefix.push({
                        Prefix: folderName ? folderName + file + '/' : file + '/',
                    });
                }
                else {
                    contents.push({
                        Key: folderName ? folderName + file : file,
                    });
                }
            }
            return new Promise((resolve, reject) => {
                // passsing directoryPath and callback function
                const outputResponse = {};
                outputResponse.Name = 'uploads';
                outputResponse.Prefix = folderName;
                outputResponse.Delimiter = 100;
                outputResponse.Marker = '';
                if (markerValue) {
                    outputResponse.NextMarker = markerValue;
                    outputResponse.IsTruncated = true;
                }
                else {
                    outputResponse.NextMarker = '';
                    outputResponse.IsTruncated = false;
                }
                outputResponse.Contents = contents;
                outputResponse.CommonPrefixes = commonPrefix;
                resolve(outputResponse);
            });
        });
    }
    cvsToJson(uploadsFolder) {
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
    qrCode(filePath, Url) {
        const qrCode = require('qrcode');
        return new Promise((resolve, reject) => {
            qrCode.toFile(filePath, Url, (err) => {
                if (err) {
                    reject(err);
                }
                resolve({ data: 'success' });
            });
        });
    }
    convertJson(data) {
        const csvToJSON = require('csvtojson');
        const csvFilePath = data; // Replace with the path to your CSV file
        return new Promise((resolve, reject) => {
            csvToJSON()
                .fromFile(csvFilePath)
                .then((jsonArray, err) => {
                // Process the parsed CSV data
                if (jsonArray) {
                    resolve(jsonArray);
                }
                else {
                    reject(err);
                }
            });
        });
    }
    UIqrcode(folderName, base64Data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.writeFile(folderName, base64Data, (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve({ data: 'success' });
                });
            });
        });
    }
    // create folder
    createFolder(folderName = '') {
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
    imageUpload(folderName = '', base64Image) {
        const sizeInBytes = 4 * Math.ceil((base64Image.length / 3)) * 0.5624896334383812;
        const sizeInKb = sizeInBytes / 1024;
        const allowedFileSizeInKb = +env_1.env.imageUploadSize * 1024;
        if (sizeInKb > allowedFileSizeInKb) {
            throw new routing_controllers_1.BadRequestError(`File size too large, must be lees than ${+env_1.env.imageUploadSize} mb`);
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
    videoUpload(folderName = '', buffer) {
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
    resizeImage(imgName = '', imgPath = '', widthString = '', heightString = '') {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const directoryPath = path.join(process.cwd(), 'uploads' + '/' + imgPath + imgName);
            return new Promise((resolve, reject) => {
                const gm = require('gm').subClass({ imageMagick: true });
                return gm(directoryPath)
                    .resize(widthString, heightString)
                    .toBuffer((error, buffer) => {
                    if (error) {
                        return resolve(undefined);
                    }
                    else {
                        return resolve(buffer);
                    }
                });
            });
        });
    }
    // Image resize
    resizeImageBase64(directory, widthString = '', heightString = '') {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const directoryPath = path.join(process.cwd(), directory);
            const ext = directory.split('.');
            const imagePrefix = 'data:image/' + ext[1] + ';base64,';
            return new Promise((resolve, reject) => {
                const gm = require('gm').subClass({ imageMagick: true });
                return gm(directoryPath)
                    .resize(widthString, heightString)
                    .toBuffer((error, buffer) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(imagePrefix + buffer.toString('base64'));
                    }
                });
            });
        });
    }
    // Image resize
    getFile(directory) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const directoryPath = path.join(process.cwd(), directory);
            return new Promise((res, rej) => {
                fs.readFile(directoryPath, (err, data) => {
                    if (err) {
                        console.error('Error reading the file:', err);
                        return rej(err);
                    }
                    return res(data);
                });
            });
        });
    }
    isDirCheck(pathfile) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((subresolve, subreject) => {
                fs.stat(pathfile, (error, stat) => {
                    if (stat && stat.isDirectory()) {
                        subresolve(true);
                    }
                    else {
                        subresolve(false);
                    }
                });
            });
        });
    }
    readDir(pathfile) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((subresolve, subreject) => {
                fs.readdir(pathfile, (error, files) => {
                    if (error) {
                        subreject(error);
                    }
                    subresolve(files);
                });
            });
        });
    }
    deleteFile(fileName = '') {
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
    writeFile(fileName = '', buffer = '') {
        return new Promise((resolve, reject) => {
            fs.writeFile(fileName, buffer, ((err) => {
                if (err) {
                    reject(err);
                }
                resolve({ success: true, message: 'successfully write file' });
            }));
        });
    }
    convertXlToJson(dirpath) {
        return new Promise((resolve, reject) => {
            const xlsxj = require('xlsx-to-json');
            xlsxj({
                input: dirpath,
                // tslint:disable-next-line:no-null-keyword
                output: null,
                sheet: 'productData',
            }, ((err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            }));
        });
    }
    xlsxToJson(dirPath) {
        return new Promise((resolve, reject) => {
            try {
                const XLSX = require('xlsx');
                const workbook = XLSX.readFile(dirPath);
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
                resolve(jsonData);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    extractZip(fileName = '', distPath = '') {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield extract(fileName, { dir: distPath });
            resolve({ success: true, message: 'Successfully Extract Zip' });
        }));
    }
    // search folders
    getFolder(folderName = '', vendorPrefix) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const pathName = path.join(process.cwd(), 'uploads', vendorPrefix ? `${vendorPrefix}` : '');
                console.log(pathName, 'pathName');
                const unsanitised = yield this.readDir(pathName);
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
                                const isDir = yield this.isDirCheck(pathfile);
                                if (isDir) {
                                    commonPrefix.push({
                                        Prefix: (vendorPrefix ? `${vendorPrefix}/` : '') + _file + '/',
                                    });
                                }
                                else {
                                    contents.push({
                                        Key: (vendorPrefix ? `${vendorPrefix}/` : '') + _file,
                                    });
                                }
                            }
                        }
                        else {
                            for (const fileArray of _file) {
                                const lowerCaseName = fileArray.toLowerCase();
                                if (lowerCaseName.includes(folderName.toLowerCase())) {
                                    commonPrefix.push({ Prefix: (vendorPrefix ? `${vendorPrefix}/` : '') + fileArray + '/' });
                                }
                            }
                        }
                    }
                }
                else {
                    for (const file of files) {
                        const pathfile = path.resolve(path.join(process.cwd(), 'uploads', vendorPrefix ? vendorPrefix : '', file));
                        const isDir = yield this.isDirCheck(pathfile);
                        if (isDir) {
                            commonPrefix.push({
                                Prefix: (vendorPrefix ? `${vendorPrefix}/` : '') + file + '/',
                            });
                        }
                        else {
                            contents.push({
                                Key: (vendorPrefix ? `${vendorPrefix}/` : '') + file,
                            });
                        }
                    }
                }
                const outputResponse = {};
                outputResponse.IsTruncated = false;
                outputResponse.Name = 'uploads';
                outputResponse.Content = contents;
                outputResponse.Prefix = folderName;
                outputResponse.CommonPrefixes = commonPrefix;
                resolve(outputResponse);
            }));
        });
    }
    fileUpload(folderName = '', base64) {
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
    fileDownload(folderName = '', dataFile) {
        // Create the parameters for calling createBucket
        const filteredPath = path.normalize(folderName).replace(/^(\.\.(\/|\\|$))+/, '');
        const directoryPath = path.join(process.cwd(), 'uploads' + '/' + filteredPath + '/' + dataFile);
        return new Promise((resolve, reject) => {
            resolve(directoryPath);
        });
    }
    getDocument(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const directoryPath = path.join(process.cwd(), 'uploads' + '/' + key);
            return new Promise((resolve, reject) => {
                fs.readFile(directoryPath, (err, data) => {
                    if (err) {
                        throw err;
                    }
                    return resolve(data);
                });
            });
        });
    }
    escapeChar(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        });
    }
    escapeChars(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        });
    }
};
ImageService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], ImageService);
exports.ImageService = ImageService;
//# sourceMappingURL=ImageService.js.map