import * as crypto from 'crypto';

export function WebHookAuthChecker(request: any, response: any, next: any): any {
    const serverToken = process.env.WEBHOOK_TOKEN;

    if (!serverToken || serverToken.trim() === '') {
        console.error('[WebHookAuthChecker] WEBHOOK_TOKEN environment variable is missing or empty.');
        return response.status(401).send('INVALID TOKEN');
    }

    const authHeader = request.headers ? (request.headers.authorization || request.headers.Authorization) : undefined;

    if (!authHeader || typeof authHeader !== 'string') {
        return response.status(401).send('INVALID TOKEN');
    }

    let clientToken = authHeader.trim();
    if (clientToken.startsWith('Bearer ') || clientToken.startsWith('bearer ')) {
        clientToken = clientToken.slice(7).trim();
    } else if (clientToken.startsWith('Basic ') || clientToken.startsWith('basic ')) {
        clientToken = clientToken.slice(6).trim();
    }

    if (!clientToken) {
        return response.status(401).send('INVALID TOKEN');
    }

    const clientBuffer = Buffer.from(clientToken, 'utf8');
    const serverBuffer = Buffer.from(serverToken.trim(), 'utf8');

    if (clientBuffer.length !== serverBuffer.length) {
        return response.status(401).send('INVALID TOKEN');
    }

    if (!crypto.timingSafeEqual(clientBuffer, serverBuffer)) {
        return response.status(401).send('INVALID TOKEN');
    }

    return next();
}

