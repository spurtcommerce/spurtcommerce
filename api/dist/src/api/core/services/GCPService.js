"use strict";
/*
 * SpurtCommerce API
 * version 4.8.1
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GCPService = void 0;
const tslib_1 = require("tslib");
const storage_1 = require("@google-cloud/storage");
const axios_1 = tslib_1.__importDefault(require("axios"));
const typedi_1 = require("typedi");
const env_1 = require("../../../env");
const storage = new storage_1.Storage({
    keyFilename: env_1.gcp.GCP_CDN_FILEPATH,
    projectId: env_1.gcp.GCP_CDN_PROJECT_ID,
});
const bucket = env_1.gcp.GCP_CDN_BUCKET ? storage.bucket(env_1.gcp.GCP_CDN_BUCKET) : undefined;
let GCPService = class GCPService {
    uploadFile(path, data, type) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const filePath = `spurt/${path}`;
                const file = bucket.file(filePath);
                yield file.save(data, {
                    contentType: type,
                });
                return {
                    path: filePath,
                    success: true,
                };
                // `https://${env.gcpFilePath}/${filePath}`
            }
            catch (err) {
                throw new Error('Unable to upload');
            }
        });
    }
    upload(path, image, type) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const filePath = `spurt/${path}`;
                const file = bucket.file(filePath);
                yield file.save(image, {
                    contentType: `image/${type}`,
                });
                return {
                    path: filePath,
                    success: true,
                };
                // `https://${env.gcpFilePath}/${filePath}`
            }
            catch (err) {
                throw new Error('Unable to upload');
            }
        });
    }
    // image download
    folderDownload(containerName, filename) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const defaultPath = 'spurt/';
            const prefix = `${defaultPath}${containerName}${filename}`;
            const datas = yield storage.bucket(env_1.gcp.GCP_CDN_BUCKET).file(prefix).download();
            // var string = new TextDecoder().decode(datas[0])
            return datas[0];
        });
    }
    copyFile(srcFileName, destFileName) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const filePath = `spurt/${srcFileName}`;
            const destFilePath = `spurt/${destFileName}`;
            yield bucket.file(filePath).copy(bucket.file(destFilePath));
        });
    }
    listBlobs(limit = 0, marker = '', folderName = '') {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const defaultPath = 'spurt/';
            const prefix = `${defaultPath}${folderName}`;
            const [files] = yield bucket.getFiles({
                prefix,
                maxResults: limit,
            });
            const contents = files
                .filter(t => !(t.name.replace(prefix, '').split('/').length - 1))
                .map(t => {
                return {
                    Key: t.name.split(defaultPath)[1],
                };
            });
            const commonPrefix = files.filter(t => t.name.replace(prefix, '').split('/').length - 1).reduce((acc, val) => {
                const Prefix = `${val.name.replace(prefix, '').split('/')[0]}/`;
                if (!acc.some(t => (t === null || t === void 0 ? void 0 : t.Prefix) === Prefix)) {
                    acc = acc.concat({ Prefix });
                }
                return acc;
            }, []).map(t => (Object.assign(Object.assign({}, t), { Prefix: `${folderName}${t.Prefix}` })));
            return new Promise((resolve, reject) => {
                // passsing directoryPath and callback function
                const outputResponse = {};
                outputResponse.Name = 'spurt';
                outputResponse.Prefix = folderName;
                outputResponse.Delimiter = limit;
                outputResponse.Marker = marker;
                outputResponse.NextMarker = '';
                outputResponse.IsTruncated = false;
                outputResponse.Contents = contents;
                outputResponse.CommonPrefixes = commonPrefix;
                resolve(outputResponse);
            });
        });
    }
    deleteFile(fileName = '') {
        return bucket.file(`spurt/${fileName}`).delete();
    }
    deleteFiles(prefix = '') {
        return new Promise((resolve, reject) => {
            return bucket.deleteFiles({ prefix: `spurt/${prefix}` }, err => {
                if (err) {
                    return reject(err);
                }
                return resolve();
            });
        });
    }
    uploadMyOferImageFromUrl(url, galleryId, fileName, extension) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const buffer = yield this.getImageBuffer(url);
            const destination = `_media/media/${galleryId}/${fileName}`;
            const file = bucket.file(destination);
            yield file.save(buffer, {
                contentType: `image/webp`,
            });
        });
    }
    deleteMyOferImages(galleryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const prefix = `_media/media/${galleryId}`;
            yield bucket.deleteFiles({ prefix });
        });
    }
    getImageBuffer(image) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield axios_1.default.get(image, { responseType: 'arraybuffer' });
            return Buffer.from(res.data, 'binary');
        });
    }
};
GCPService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], GCPService);
exports.GCPService = GCPService;
//# sourceMappingURL=GCPService.js.map