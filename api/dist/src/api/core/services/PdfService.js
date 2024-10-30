"use strict";
/*
 * SpurtCommerce API
 * version 5.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const path = tslib_1.__importStar(require("path"));
const ejs = require("ejs");
const moment_1 = tslib_1.__importDefault(require("moment"));
const fs_1 = tslib_1.__importDefault(require("fs"));
let PdfService = class PdfService {
    createPDFFile(htmlString, isDownload = false, reportGeneratedBy = '') {
        const pdf = require('html-pdf-node');
        const directoryPath = 'file://' + path.join(process.cwd(), 'uploads');
        const options = {
            format: 'A4',
            orientation: 'portrait',
            base: directoryPath,
            margin: { top: '0mm', left: '5mm', bottom: '0mm', right: '5mm' },
            timeout: 60000,
            zoomFactor: '0.5',
            quality: '100',
            phantomArgs: ['--web-security=no', '--local-url-access=false', '--ignore-ssl-errors=yes'],
            footer: {
                height: '28mm',
                contents: {
                    default: '<p style="margin-left: 10px;color: #000;;margin-top:0;font-size: 0.50rem;">This is a system generated invoice and needs no signature. Jurisdiction in case of disputes be limited to the state from which the product is shipped. Maximum liability is restricted to selling price collected from the customer</p>',
                },
            },
        };
        /**
         * It will create PDF of that HTML into given folder.
         */
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const file = { content: htmlString };
                const pdfBuffer = yield pdf.generatePdf(file, options);
                const pdfBase64 = yield pdfBuffer.toString('base64');
                if (isDownload) {
                    resolve('data:application/pdf;base64,' + pdfBase64);
                }
                return resolve(pdfBuffer);
            }
            catch (error) {
                reject(error.message);
            }
        }));
    }
    readHtmlToString(templateName, templateData) {
        return new Promise((resolve, reject) => {
            ejs.renderFile('./views/' + templateName + '.ejs', { data: templateData, moment: moment_1.default }, (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    }
    createPDFBuffer(htmlData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const puppeteer = require('puppeteer');
            const browser = yield puppeteer.launch({ headless: 'new' });
            const page = yield browser.newPage(); // Await the newPage() function
            yield page.setContent(htmlData);
            return new Promise((resolve, reject) => {
                // Add a small delay (e.g., 1 second) to wait for asynchronous rendering
                page.pdf({ format: 'Letter' }).then((data) => {
                    browser.close();
                    resolve(data);
                }).catch((err) => {
                    reject(err);
                });
            });
        });
    }
    htmlPdf(htmlData, pathName) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pdf = require('html-pdf');
            const pdfOptions = {
                format: 'Letter',
                border: '10mm',
                childProcessOptions: {
                    env: {
                        OPENSSL_CONF: '/dev/null',
                    },
                },
            };
            return new Promise((resolve, reject) => {
                pdf.create(htmlData, pdfOptions).toFile(pathName, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
            });
        });
    }
    decodeBase64AndSave(filePath, fileName, base64String) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Decode base64 to binary data
            const pdfBuffer = Buffer.from(base64String, 'base64');
            // Construct the full file path
            const fullFilePath = `${filePath}/${fileName}`;
            // Write buffer to a PDF file
            return fs_1.default.writeFile(fullFilePath, pdfBuffer, (err) => {
                if (err) {
                    console.error('Error saving the file:', err);
                }
                else {
                    console.log(`File saved successfully: ${fullFilePath}`);
                }
            });
        });
    }
};
PdfService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], PdfService);
exports.PdfService = PdfService;
//# sourceMappingURL=PdfService.js.map