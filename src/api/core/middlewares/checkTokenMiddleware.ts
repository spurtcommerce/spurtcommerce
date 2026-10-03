import { env } from '../../../env';
import { CustomerUsers } from '../../core/models/CustomerUsers';
import { AccessToken } from '../models/AccessTokenModel';
import { getDataSource } from '../../../loaders/typeormLoader';

export function CheckTokenMiddleware(request: any, response: any, next: any): any {
    const customerUsersRepository = getDataSource().getRepository(CustomerUsers);

    const accessTokenRepository = getDataSource().getRepository(AccessToken);
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
                request.user = {};
                next();
            } else {
                const checkTokenRevoke: any = await accessTokenRepository.findOne({
                    where: {
                        token: originalEncryptedString,
                    },
                });
                if (checkTokenRevoke) {
                    // const customerDetails = await customerRepository.findOne({ where: { id: decoded.id, deleteFlag: 0, isActive: 1 } });
                    const customerUser = await customerUsersRepository.findOne({
                        where: {
                            id: decoded.id, isActive: 1, deleteFlag: 0,
                        },
                        relations: ['customer', 'customerUserGroups'],
                    });
                    if (customerUser) {
                        request.id = customerUser.customer.id;
                        request.user = customerUser;

                        next();
                    } else {
                        return response.status(401).send({ status: 0, message: 'UnAuthorized user' });
                    }
                } else {
                    request.id = '';
                    request.user = {};
                    next();
                }
            }
        });
    } else {
        request.id = '';
        request.user = {};
        next();
    }
}
export function CheckCustomerMiddleware(request: any, response: any, next?: (err?: any) => any): any {
    const jwt = require('jsonwebtoken');
    const authorization = request.header('authorization');
    const customerUsersRepository = getDataSource().getRepository(CustomerUsers);
    const accessTokenRepository = getDataSource().getRepository(AccessToken);
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
                    // const customerDetails = await customerRepository.findOne({ where: { id: decoded.id, deleteFlag: 0, isActive: 1 } });
                    const customerUser = await customerUsersRepository.findOne({
                        where: {
                            id: decoded.id, isActive: 1, deleteFlag: 0,
                        },
                        relations: ['customer', 'customerUserGroups'],
                    });
                    if (customerUser) {
                        request.user = customerUser;
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
