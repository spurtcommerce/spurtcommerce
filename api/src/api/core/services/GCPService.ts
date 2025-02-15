/*
 * SpurtCommerce API
 * version 4.8.1
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Storage } from '@google-cloud/storage';
import axios from 'axios';
import { Service } from 'typedi';
import { gcp } from '../../../env';

const storage = new Storage({
    keyFilename: gcp.GCP_CDN_FILEPATH,
    projectId: gcp.GCP_CDN_PROJECT_ID,
});

const bucket = gcp.GCP_CDN_BUCKET ? storage.bucket(gcp.GCP_CDN_BUCKET) : undefined;

@Service()
export class GCPService {
    public async uploadFile(path: string, data: Buffer, type: string): Promise<any> {
        try {
            const filePath = `spurt/${path}`;
            const file = bucket.file(filePath);
            await file.save(data, {
                contentType: type,
            });
            return {
                path: filePath,
                success: true,
            };
            // `https://${env.gcpFilePath}/${filePath}`
        } catch (err) {
            throw new Error('Unable to upload');
        }
    }

    public async upload(path: string, image: Buffer, type: string): Promise<any> {
        try {
            const filePath = `spurt/${path}`;
            const file = bucket.file(filePath);
            await file.save(image, {
                contentType: `image/${type}`,
            });
            return {
                path: filePath,
                success: true,
            };
            // `https://${env.gcpFilePath}/${filePath}`
        } catch (err) {
            throw new Error('Unable to upload');
        }
    }

    // image download
    public async folderDownload(containerName: any, filename: any): Promise<any> {
        const defaultPath = 'spurt/';
        const prefix = `${defaultPath}${containerName}${filename}`;
        const datas: any = await storage.bucket(gcp.GCP_CDN_BUCKET).file(prefix).download();
        // var string = new TextDecoder().decode(datas[0])
        return datas[0];
    }

    public async copyFile(srcFileName: string, destFileName: string): Promise<any> {
        const filePath = `spurt/${srcFileName}`;
        const destFilePath = `spurt/${destFileName}`;
        await bucket.file(filePath).copy(bucket.file(destFilePath));
    }

    public async listBlobs(limit: number = 0, marker: string = '', folderName: string = ''): Promise<any> {
        const defaultPath = 'spurt/';
        const prefix = `${defaultPath}${folderName}`;
        const [files] = await bucket.getFiles({
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
            if (!acc.some(t => t?.Prefix === Prefix)) {
                acc = acc.concat({ Prefix });
            }
            return acc;
        }, []).map(t => ({ ...t, Prefix: `${folderName}${t.Prefix}` }));

        return new Promise((resolve, reject) => {
            // passsing directoryPath and callback function
            const outputResponse: any = {};
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
    }

    public deleteFile(fileName: string = ''): Promise<any> {
        return bucket.file(`spurt/${fileName}`).delete();
    }

    public deleteFiles(prefix: string = ''): Promise<void> {
        return new Promise((resolve, reject) => {
            return bucket.deleteFiles({ prefix: `spurt/${prefix}` }, err => {
                if (err) {
                    return reject(err);
                }
                return resolve();
            });
        });
    }

    public async uploadMyOferImageFromUrl(url: string, galleryId: number, fileName: string, extension: string): Promise<any> {
        const buffer = await this.getImageBuffer(url);
        const destination = `_media/media/${galleryId}/${fileName}`;
        const file = bucket.file(destination);
        await file.save(buffer, {
            contentType: `image/webp`,
        });
    }

    public async deleteMyOferImages(galleryId: number): Promise<any> {
        const prefix = `_media/media/${galleryId}`;
        await bucket.deleteFiles({ prefix });
    }

    private async getImageBuffer(image: string): Promise<Buffer> {
        const res = await axios.get(image, { responseType: 'arraybuffer' });
        return Buffer.from(res.data, 'binary');
    }
}
