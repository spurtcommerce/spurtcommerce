"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanitizeMiddleware = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
let SanitizeMiddleware = class SanitizeMiddleware {
    use(req, res, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let data = req.body;
            const isValid = (input) => {
                if (input.includes("'")) {
                    return false;
                }
                if (input.includes('"')) {
                    return false;
                }
                if (input.includes('<')) {
                    return false;
                }
                if (input.includes('>')) {
                    return false;
                }
                if (input.includes('#')) {
                    return false;
                }
                if (input.includes('$')) {
                    return false;
                }
                if (input.includes('%')) {
                    return false;
                }
                if (input.includes('^')) {
                    return false;
                }
                if (input.includes('&')) {
                    return false;
                }
                if (input.includes('*')) {
                    return false;
                }
                return true;
            };
            const isValid2 = (name) => {
                if (name.includes('<')) {
                    return false;
                }
                if (name.includes('>')) {
                    return false;
                }
                if (name.includes('@')) {
                    return false;
                }
                if (name.includes('$')) {
                    return false;
                }
                if (name.includes('*')) {
                    return false;
                }
                if (name.includes('^')) {
                    return false;
                }
                return true;
            };
            const isValid3 = (name) => {
                if (name.includes('<')) {
                    return false;
                }
                if (name.includes('>')) {
                    return false;
                }
                if (name.includes('*')) {
                    return false;
                }
                if (name.includes('^')) {
                    return false;
                }
                return true;
            };
            const isValidColourCode = (input) => {
                if (input.includes("'")) {
                    return false;
                }
                if (input.includes('"')) {
                    return false;
                }
                if (input.includes('<')) {
                    return false;
                }
                if (input.includes('>')) {
                    return false;
                }
                if (input.includes('$')) {
                    return false;
                }
                if (input.includes('%')) {
                    return false;
                }
                if (input.includes('^')) {
                    return false;
                }
                if (input.includes('&')) {
                    return false;
                }
                if (input.includes('*')) {
                    return false;
                }
                return true;
            };
            const isValidSymbol = (input) => {
                if (input.includes("'")) {
                    return false;
                }
                if (input.includes('"')) {
                    return false;
                }
                if (input.includes('<')) {
                    return false;
                }
                if (input.includes('>')) {
                    return false;
                }
                if (input.includes('%')) {
                    return false;
                }
                if (input.includes('^')) {
                    return false;
                }
                if (input.includes('*')) {
                    return false;
                }
                return true;
            };
            const isValidLink = (input) => {
                if (input.includes('http://') || input.includes('https://') || input.includes('.net') || input.includes('.in')) {
                    return false;
                }
                if (input.includes('ftp://')) {
                    return false;
                }
                if (input.includes('file://')) {
                    return false;
                }
                if (input.includes('data://')) {
                    return false;
                }
                return true;
            };
            if (data) {
                for (const [key, value] of Object.entries(data)) {
                    if (key !== 'password' && key !== 'confirmPassword' && key !== 'newPassword' && key !== 'oldPassword' && key !== 'productDescription' && key !== 'description'
                        && key !== 'metaTagDescription' && key !== 'metaTagTitle' && key !== 'categoryDescription' && key !== 'widgetDescription' && key !== 'companyDescription' &&
                        key !== 'content' && key !== 'metaTagContent' && key !== 'vendorDescription' && key !== 'companyName') {
                        if (key === 'productName' || key === 'permission') {
                            if (!isValid2(value.toString())) {
                                return res.status(400).send({ status: 0, message: `Invalid character in ${key}` });
                            }
                        }
                        else if (key === 'widgetLongTitle') {
                            if (!isValid3(value.toString())) {
                                return res.status(400).send({ status: 0, message: `Invalid character in ${key}` });
                            }
                        }
                        else if (key === 'colorcode' || key === 'colorCode') {
                            if (!isValidColourCode(value.toString())) {
                                return res.status(400).send({ status: 0, message: `Invalid character in ${key}` });
                            }
                        }
                        else if (key === 'symbolLeft' || key === 'symbolRight' || key === 'currencySymbol') {
                            if (value !== undefined && value !== null) {
                                if (!isValidSymbol(value)) {
                                    return res.status(400).send({ status: 0, message: `Invalid character in ${key}` });
                                }
                            }
                        }
                        else if (key === 'question' || key === 'answer') {
                            if (value !== undefined && value !== null) {
                                if (!isValidLink(value)) {
                                    return res.status(400).send({ status: 0, message: `Invalid character in ${key}` });
                                }
                            }
                        }
                        else {
                            if (value !== undefined && value !== null) {
                                if (!isValid(value.toString())) {
                                    return res.status(400).send({ status: 0, message: `Invalid character in ${key}` });
                                }
                                console.log(value.toString().length + 'length');
                            }
                        }
                    }
                }
            }
            data = req.params;
            if (data) {
                for (const [key, value] of Object.entries(data)) {
                    if (key !== 'password' && key !== 'confirmPassword' && key !== 'newPassword' && key !== 'oldPassword' && key !== 'productDescription' && key !== 'description'
                        && key !== 'metaTagDescription' && key !== 'metaTagTitle' && key !== 'categoryDescription' && key !== 'widgetDescription' && key !== 'companyDescription' && key !== 'content' && key !== 'metaTagContent') {
                        if (key === 'productName' || key === 'permission') {
                            if (!isValid2(value.toString())) {
                                return res.status(400).send({ status: 0, message: `Invalid character in ${key}` });
                            }
                        }
                        else if (key === 'widgetLongTitle') {
                            if (!isValid3(value.toString())) {
                                return res.status(400).send({ status: 0, message: `Invalid character in ${key}` });
                            }
                            return res.status(400).send({ status: 0, message: `Invalid character in ${key}` });
                        }
                        else if (key === 'colorcode' || key === 'colorCode') {
                            if (!isValidColourCode(value.toString())) {
                                return res.status(400).send({ status: 0, message: `Invalid character in ${key}` });
                            }
                        }
                        else if (key === 'symbolLeft' || key === 'symbolRight') {
                            if (value !== undefined && value !== null) {
                                if (!isValidSymbol(value)) {
                                    return res.status(400).send({ status: 0, message: `Invalid character in ${key}` });
                                }
                            }
                        }
                        else if (key === 'question' || key === 'answer') {
                            if (value !== undefined && value !== null) {
                                if (!isValidLink(value)) {
                                    return res.status(400).send({ status: 0, message: `Invalid character in ${key}` });
                                }
                            }
                        }
                        else {
                            if (value !== undefined && value !== null) {
                                if (!isValid(value.toString())) {
                                    return res.status(400).send({ status: 0, message: `Invalid character in ${key}` });
                                }
                            }
                        }
                    }
                }
            }
            data = req.query;
            if (data) {
                for (const [key, value] of Object.entries(data)) {
                    if (key !== 'password' && key !== 'confirmPassword' && key !== 'newPassword' && key !== 'oldPassword' && key !== 'productDescription' && key !== 'description' && key !== 'attribute'
                        && key !== 'metaTagDescription' && key !== 'metaTagTitle' && key !== 'categoryDescription' && key !== 'widgetDescription' && key !== 'companyDescription' && key !== 'content' && key !== 'metaTagContent') {
                        if (key === 'productName' || key === 'permission' || key === 'keyword') {
                            if (!isValid2(value.toString())) {
                                return res.status(400).send({ status: 0, message: `Invalid character in ${key}` });
                            }
                        }
                        else if (key === 'widgetLongTitle') {
                            if (!isValid3(value.toString())) {
                                return res.status(400).send({ status: 0, message: `Invalid character in ${key}` });
                            }
                            return res.status(400).send({ status: 0, message: `Invalid character in ${key}` });
                        }
                        else if (key === 'colorcode' || key === 'colorCode') {
                            if (!isValidColourCode(value.toString())) {
                                return res.status(400).send({ status: 0, message: `Invalid character in ${key}` });
                            }
                        }
                        else if (key === 'symbolLeft' || key === 'symbolRight') {
                            if (value !== undefined && value !== null) {
                                if (!isValidSymbol(value)) {
                                    return res.status(400).send({ status: 0, message: `Invalid character in ${key}` });
                                }
                            }
                        }
                        else if (key === 'question' || key === 'answer') {
                            if (value !== undefined && value !== null) {
                                if (!isValidLink(value)) {
                                    return res.status(400).send({ status: 0, message: `Invalid character in ${key}` });
                                }
                            }
                        }
                        else {
                            if (value !== undefined && value !== null) {
                                if (!isValid(value.toString())) {
                                    return res.status(400).send({ status: 0, message: `Invalid character in ${key}` });
                                }
                            }
                        }
                    }
                }
            }
            next();
        });
    }
};
SanitizeMiddleware = tslib_1.__decorate([
    (0, routing_controllers_1.Middleware)({ type: 'before' })
], SanitizeMiddleware);
exports.SanitizeMiddleware = SanitizeMiddleware;
//# sourceMappingURL=SanitizeMiddleware.js.map