"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckCustomerMiddleware = exports.CheckTokenMiddleware = void 0;
const tslib_1 = require("tslib");
const env_1 = require("../../../env");
const Customer_1 = require("../models/Customer");
const AccessTokenModel_1 = require("../models/AccessTokenModel");
const typeorm_1 = require("typeorm");
function CheckTokenMiddleware(request, response, next) {
    const customerRepository = (0, typeorm_1.getManager)().getRepository(Customer_1.Customer);
    const accessTokenRepository = (0, typeorm_1.getManager)().getRepository(AccessTokenModel_1.AccessToken);
    const jwt = require('jsonwebtoken');
    const authorization = request.header('authorization');
    if (authorization) {
        const encryptString = authorization.split(' ')[1];
        const Crypto = require('crypto-js');
        const bytes = Crypto.AES.decrypt(encryptString, env_1.env.cryptoSecret);
        const originalEncryptedString = bytes.toString(Crypto.enc.Utf8);
        jwt.verify(originalEncryptedString, env_1.env.jwtSecret, (err, decoded) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (err) {
                request.id = '';
                next();
            }
            else {
                const checkTokenRevoke = yield accessTokenRepository.findOne({
                    where: {
                        token: originalEncryptedString,
                    },
                });
                if (checkTokenRevoke) {
                    const customerDetails = yield customerRepository.findOne({ where: { id: decoded.id, deleteFlag: 0, isActive: 1 } });
                    if (customerDetails) {
                        request.id = customerDetails.id;
                        next();
                    }
                    else {
                        return response.status(401).send({ status: 0, message: 'UnAuthorized user' });
                    }
                }
                else {
                    request.id = '';
                    next();
                }
            }
        }));
    }
    else {
        request.id = '';
        next();
    }
}
exports.CheckTokenMiddleware = CheckTokenMiddleware;
function CheckCustomerMiddleware(request, response, next) {
    const jwt = require('jsonwebtoken');
    const authorization = request.header('authorization');
    const customerRepository = (0, typeorm_1.getManager)().getRepository(Customer_1.Customer);
    const accessTokenRepository = (0, typeorm_1.getManager)().getRepository(AccessTokenModel_1.AccessToken);
    if (authorization) {
        const encryptString = authorization.split(' ')[1];
        const Crypto = require('crypto-js');
        const bytes = Crypto.AES.decrypt(encryptString, env_1.env.cryptoSecret);
        const originalEncryptedString = bytes.toString(Crypto.enc.Utf8);
        jwt.verify(originalEncryptedString, env_1.env.jwtSecret, (err, decoded) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (err) {
                return response.status(401).send({ status: 0, message: 'Please send a valid token' });
            }
            else {
                const checkTokenRevoke = yield accessTokenRepository.findOne({
                    where: {
                        token: originalEncryptedString,
                    },
                });
                if (checkTokenRevoke) {
                    const customerDetails = yield customerRepository.findOne({ where: { id: decoded.id, deleteFlag: 0, isActive: 1 } });
                    if (customerDetails) {
                        request.user = customerDetails;
                        next();
                    }
                    else {
                        return response.status(401).send({ status: 0, message: 'UnAuthorized user' });
                    }
                }
                else {
                    return response.status(401).send({ status: 0, message: 'UnAuthorized user' });
                }
            }
        }));
    }
    else {
        return response.status(401).send({ status: 0, message: 'UnAuthorized user' });
    }
}
exports.CheckCustomerMiddleware = CheckCustomerMiddleware;
//# sourceMappingURL=checkTokenMiddleware.js.map