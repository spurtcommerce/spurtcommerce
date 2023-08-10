"use strict";
/*
 * SpurtCommerce API
 * version 4.8.2
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
let ImageService = class ImageService {
    // Bucket list
    listFolders(limit = 0, marker = '', folderName = '') {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const filteredPath = path.normalize(folderName).replace(/^(\.\.(\/|\\|$))+/, '');
            const directoryPath = path.join(process.cwd(), 'uploads' + '/' + filteredPath);
            const files = yield this.readDir(directoryPath);
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
    // create folder
    createFolder(folderName = '') {
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
    imageUpload(folderName = '', base64Image) {
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
                        reject(error);
                    }
                    else {
                        resolve(buffer);
                    }
                });
            });
        });
    }
    // Image resize
    resizeImageBase64(imgName = '', imgPath = '', widthString = '', heightString = '') {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const directoryPath = path.join(process.cwd(), 'uploads' + '/' + imgPath + imgName);
            const ext = imgName.split('.');
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
    extractZip(fileName = '', distPath = '') {
        return new Promise((resolve, reject) => {
            extract(fileName, { dir: distPath }, ((er) => {
                if (er) {
                    reject(er);
                }
                resolve({ success: true, message: 'Successfully Extract Zip' });
            }));
        });
    }
    // search folders
    getFolder(folderName = '') {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const pathName = path.join(process.cwd(), 'uploads');
                const files = yield this.readDir(pathName);
                const contents = [];
                const commonPrefix = [];
                if (folderName !== '') {
                    files.forEach((file) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        if (Array.isArray(file) === false) {
                            const filesName = file.toLowerCase();
                            if (filesName.includes(folderName.toLowerCase())) {
                                commonPrefix.push({ Prefix: file + '/' });
                            }
                        }
                        else {
                            for (const fileArray of file) {
                                const lowerCaseName = fileArray.toLowerCase();
                                if (lowerCaseName.includes(folderName.toLowerCase())) {
                                    commonPrefix.push({ Prefix: fileArray + '/' });
                                }
                            }
                        }
                    }));
                }
                else {
                    for (const file of files) {
                        const pathfile = path.resolve(path.join(process.cwd(), 'uploads' + '/' + file));
                        const isDir = yield this.isDirCheck(pathfile);
                        if (isDir) {
                            commonPrefix.push({
                                Prefix: file + '/',
                            });
                        }
                        else {
                            contents.push({
                                Key: file,
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
};
ImageService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], ImageService);
exports.ImageService = ImageService;
//# sourceMappingURL=ImageService.js.map