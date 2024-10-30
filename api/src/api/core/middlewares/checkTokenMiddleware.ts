import { env } from '../../../env';
import { Customer } from '../models/Customer';
import { AccessToken } from '../models/AccessTokenModel';
import { getManager } from 'typeorm';
export function CheckTokenMiddleware(request: any, response: any, next: any): any {
    const customerRepository = getManager().getRepository(Customer);
    const accessTokenRepository = getManager().getRepository(AccessToken);
    const jwt = require('jsonwebtoken');
    const authorization = request.header('authorization');
    if (authorization) {
        const encryptString = authorization.split(' ')[1];
        const Crypto = require('crypto-js');
        const bytes = Crypto.AES.decrypt(encryptString, env.cryptoSecret);
        const originalEncryptedString = bytes.toString(Crypto.enc.Utf8);
        jwt.verify(originalEncryptedString, env.jwtSecret, async (err: any, decoded: any) => {
            if (err) {
                request.id = '';
                next();
            } else {
                const checkTokenRevoke: any = await accessTokenRepository.findOne({
                    where: {
                        token: originalEncryptedString,
                    },
                });
                if (checkTokenRevoke) {
                    const customerDetails = await customerRepository.findOne({ where: { id: decoded.id, deleteFlag: 0, isActive: 1 } });
                    if (customerDetails) {
                        request.id = customerDetails.id;
                        next();
                    } else {
                        return response.status(401).send({ status: 0, message: 'UnAuthorized user' });
                    }
                } else {
                    request.id = '';
                    next();
                }
            }
        });
    } else {
        request.id = '';
        next();
    }
}
export function CheckCustomerMiddleware(request: any, response: any, next?: (err?: any) => any): any {
    const jwt = require('jsonwebtoken');
    const authorization = request.header('authorization');
    const customerRepository = getManager().getRepository(Customer);
    const accessTokenRepository = getManager().getRepository(AccessToken);
    if (authorization) {
        const encryptString = authorization.split(' ')[1];
        const Crypto = require('crypto-js');
        const bytes = Crypto.AES.decrypt(encryptString, env.cryptoSecret);
        const originalEncryptedString = bytes.toString(Crypto.enc.Utf8);
        jwt.verify(originalEncryptedString, env.jwtSecret, async (err: any, decoded: any) => {
            if (err) {
                return response.status(401).send({ status: 0, message: 'Please send a valid token' });
            } else {
                const checkTokenRevoke: any = await accessTokenRepository.findOne({
                    where: {
                        token: originalEncryptedString,
                    },
                });
                if (checkTokenRevoke) {
                    const customerDetails = await customerRepository.findOne({ where: { id: decoded.id, deleteFlag: 0, isActive: 1 } });
                    if (customerDetails) {
                        request.user = customerDetails;
                        next();
                    } else {
                        return response.status(401).send({ status: 0, message: 'UnAuthorized user' });
                    }
                } else {
                    return response.status(401).send({ status: 0, message: 'UnAuthorized user' });
                }
            }
        });
    } else {
        return response.status(401).send({ status: 0, message: 'UnAuthorized user' });
    }
}
